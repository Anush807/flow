// test-email.ts
process.env["SMTP_HOST"] = "127.0.0.1";
process.env["SMTP_PORT"] = "1025";
process.env["SMTP_SECURE"] = "false";
process.env["SMTP_FROM"] = "test@example.com";

import { emailHandlers } from "../integrations/email.js";

const handler = emailHandlers["email:send"];
if (!handler) {
  throw new Error("email:send handler is not registered");
}

const result = await handler({
  to: "anushpoojary0101@gmail.com",
  subject: "Test email",
  text: "Hello from the automation engine",
});

console.log(result.outputPayload);
