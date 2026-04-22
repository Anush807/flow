// seed-test.ts
import { prisma } from "../lib/prisma.js";

async function seed() {
  // Clean up previous test data
  await prisma.flwExecutionSteps.deleteMany();
  await prisma.flwExecutions.deleteMany();
  await prisma.flwSteps.deleteMany();
  await prisma.processedEvents.deleteMany();
  await prisma.flw.deleteMany();

  // Workflow 1: HTTP request step
  const httpWorkflow = await prisma.flw.create({
    data: {
      name: "Test HTTP Workflow",
      webhookKey: "test-webhook-http",
      status: "Active",
      FlwSteps: {
        create: [
          {
            position: 1,
            type: "Action",
            integrationKey: "http",
            operationKey: "request",
            inputMapping: {
              url: "https://jsonplaceholder.typicode.com/posts",
              method: "POST",
              body: {
                title: "{{ trigger.body.title }}",
                userId: 1,
              },
            },
          },
        ],
      },
    },
  });

  console.log("Created HTTP workflow:", httpWorkflow.id, "| webhookKey: test-webhook-http");

  // Workflow 2: HTTP then Email (two step chain)
  const chainedWorkflow = await prisma.flw.create({
    data: {
      name: "Test Chained Workflow",
      webhookKey: "test-webhook-chain",
      status: "Active",
      FlwSteps: {
        create: [
          {
            position: 1,
            type: "Action",
            integrationKey: "http",
            operationKey: "request",
            inputMapping: {
              url: "https://jsonplaceholder.typicode.com/todos/1",
              method: "GET",
            },
          },
          {
            position: 2,
            type: "Action",
            integrationKey: "email",
            operationKey: "send",
            inputMapping: {
              to: "{{ trigger.body.email }}",
              subject: "Workflow result",
              text: "The request completed successfully",
            },
          },
        ],
      },
    },
  });

  console.log("Created chained workflow:", chainedWorkflow.id, "| webhookKey: test-webhook-chain");

  // Workflow 3: Event triggered
  const eventWorkflow = await prisma.flw.create({
    data: {
      name: "Test Event Workflow",
      eventKey: "user.signup",
      status: "Active",
      FlwSteps: {
        create: [
          {
            position: 1,
            type: "Action",
            integrationKey: "email",
            operationKey: "send",
            inputMapping: {
              to: "{{ trigger.payload.email }}",
              subject: "Welcome!",
              text: "Thanks for signing up",
            },
          },
        ],
      },
    },
  });

  console.log("Created event workflow:", eventWorkflow.id, "| eventKey: user.signup");

  await prisma.$disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});