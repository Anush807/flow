import { Worker } from "bullmq"
import {prisma} from "../lib/prisma.js"
import type { FlwExecutionStatus } from "../generated/prisma/client.js";
import { stepQueue } from "./redis-queue.js";

console.log("Worker process started");
const worker = new Worker("step-execution-worker", async(job) => {
    console.log("worker is running")
    const { stepExecutionId } = job.data;
    if(!stepExecutionId) return;
    await processStep(stepExecutionId);
}, {
    connection: {
        host: "127.0.0.1",
        port: 6379
    }
});

async function processStep(stepExecution: string) {
    const step = await prisma.flwExecutionSteps.findUnique({
        where: {
            id: stepExecution
        }
    })

    if (!step) return;
    if(step?.status == "Success") return;

    const claimed = await prisma.flwExecutionSteps.updateMany({
        where:{
            id: stepExecution,
            status: "Pending",
        },data:{
            status: "Running",

        }
    })
    if(claimed.count == 0){     
        return;
    }
try{
     await integrationFunction(step);

     await onSuccessFuction(step);
}
catch(err){
    await failureHandler(step, err);
    }
}

async function integrationFunction(step: { id: string; flwExecutionId: string; flwStepId: string; status: FlwExecutionStatus; retryCount: number;}){
    console.log(`Executing Integeration step ${step.id}`)
    await new Promise<void>( (res) => setTimeout( () => res(), 5000))
}

async function onSuccessFuction(step: { id: string; flwExecutionId: string; flwStepId: string; status: FlwExecutionStatus; retryCount: number }){
    const result = await prisma.$transaction( async(tx) => {
        await tx.flwExecutionSteps.update({
            where:{
                id: step.id
            },data:{
                status: "Success",
                finishedAt: new Date(),
            }   
        })
         const current = await tx.flwSteps.findUnique({
        where:{
            id: step.flwStepId
        }
    })
    if(!current) throw new Error("Definition step not found");

    const nextDefinition = await tx.flwSteps.findUnique({
        where:{
            flwId_position:{
                flwId: current.flwId,
                position: current.position + 1
            }
        }
    })
    
    if(nextDefinition){
        const nextStepExecution = await tx.flwExecutionSteps.create({
            data:{
                flwExecutionId: step.flwExecutionId,
                flwStepId: step.flwStepId,
                status: "Pending",
                retryCount: 0
            }
        })
       return { nextStepExecution };

    }
    await tx.flwExecutionSteps.update({
        where:{
            id: step.flwExecutionId
        },
        data:{
            status: "Success",
            finishedAt: new Date()
        }
    })
    return { nextStepExecution: null }
    })

    if(result.nextStepExecution){
        await stepQueue.add("execute-Queue", {
            stepExecutionId: result.nextStepExecution
        })
    }
}

async function failureHandler(step: { id: string; flwExecutionId: string; flwStepId: string; status: FlwExecutionStatus; retryCount: number }, err: any){
    console.log(`Execution failed of step ${step.id}`)
    await new Promise<void>( (res) => setTimeout( () => res(), 5000))
}
