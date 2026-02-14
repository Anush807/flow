import { Worker } from "bullmq"
import { prisma } from "../lib/prisma.js"
import type { FlwExecutionStatus } from "../generated/prisma/enums.js";

const gotJob = () =>  new Promise<void>((res, rej) => setTimeout( () => res(), 1000))

const worker = new Worker("step-execution-worker", async(job) => {
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
    //checking Idempotency 
    if(step?.status == "Success") return;

    const claimed = await prisma.flwExecutionSteps.updateMany({
        where:{
            id: stepExecution,
            status: "Pending",
        },data:{
            status: "Running",

        }
    })
    //Evey kob is claimed
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
    })

    const position = await prisma.flwSteps.findUnique({
        where:{
            id: step.flwStepId
        }
    })
    if(!position) return;

    const pos = position?.position + 1;

        const nextStepId = await prisma.flwSteps.update({
            where:{
                id: step.flwStepId
            }, data:{
                position: pos
            }
        })
        const nextStep = await prisma.flwExecutionSteps.create({
            data:{
                flwExecutionId: step.flwExecutionId,
                status: "Pending",
                retryCount: 0,
                flwStepId: step.flwStepId
            }
        })
    
}

async function failureHandler(step: { id: string; flwExecutionId: string; flwStepId: string; status: FlwExecutionStatus; retryCount: number }, err: any){
    console.log(`Execution failed of step ${step.id}`)
    await new Promise<void>( (res) => setTimeout( () => res(), 5000))
}
