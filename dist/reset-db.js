import { prisma } from "./lib/prisma.js";
await prisma.flwExecutionSteps.deleteMany();
await prisma.flwExecutions.deleteMany();
await prisma.flwSteps.deleteMany();
await prisma.processedEvents.deleteMany();
await prisma.flw.deleteMany();
//# sourceMappingURL=reset-db.js.map