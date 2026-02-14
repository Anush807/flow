import { z } from "zod";

export const combinedSchema = z.object({
    name: z.string(),
    nodeType: z.enum(["Trigger", "Action"]),
    configPayload: z.any()
})
