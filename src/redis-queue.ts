import { Queue } from "bullmq"


const jobQueue = new Queue("jobQueue");

export async function stepQueue(){
    const response = await jobQueue.add("job", {
        job: "task 1" 
    })
    console.log("Job added to queue", response.id);
}


