import nodemailer from "nodemailer";
// ----------------------------------------------------------------
// Shared transporter – created lazily from environment variables.
// Required env vars:
//   SMTP_HOST
//   SMTP_PORT       (default 587)
//   SMTP_SECURE     "true" for port 465, otherwise false
//   SMTP_USER
//   SMTP_PASS
//   SMTP_FROM       default "from" address, e.g. no-reply@yourdomain.com
// ----------------------------------------------------------------
let _transporter = null;
function getTransporter() {
    if (_transporter)
        return _transporter;
    const host = process.env["SMTP_HOST"];
    if (!host)
        throw new Error("SMTP_HOST environment variable is not set");
    _transporter = nodemailer.createTransport({
        host,
        port: parseInt(process.env["SMTP_PORT"] ?? "587", 10),
        secure: process.env["SMTP_SECURE"] === "true",
        auth: {
            user: process.env["SMTP_USER"],
            pass: process.env["SMTP_PASS"],
        },
    });
    return _transporter;
}
// ----------------------------------------------------------------
// email:send
// input:
//   to       string | string[]   (required)
//   subject  string              (required)
//   html     string              (optional – at least one of html/text required)
//   text     string              (optional)
//   from     string              (optional, falls back to SMTP_FROM env var)
//   cc       string | string[]   (optional)
//   bcc      string | string[]   (optional)
//   replyTo  string              (optional)
// ----------------------------------------------------------------
const emailSend = async (input) => {
    const to = input["to"];
    if (!to || (typeof to !== "string" && !Array.isArray(to))) {
        throw new Error("email:send requires field 'to' as a string or array of strings");
    }
    const subject = input["subject"];
    if (typeof subject !== "string" || !subject) {
        throw new Error("email:send requires a non-empty string field 'subject'");
    }
    const html = typeof input["html"] === "string" ? input["html"] : undefined;
    const text = typeof input["text"] === "string" ? input["text"] : undefined;
    if (!html && !text) {
        throw new Error("email:send requires at least one of 'html' or 'text' fields");
    }
    const from = typeof input["from"] === "string"
        ? input["from"]
        : (process.env["SMTP_FROM"] ?? "no-reply@example.com");
    const transporter = getTransporter();
    const info = await transporter.sendMail({
        from,
        to,
        cc: input["cc"],
        bcc: input["bcc"],
        replyTo: input["replyTo"],
        subject,
        html,
        text,
    });
    return {
        outputPayload: {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response,
        },
    };
};
export const emailHandlers = {
    "email:send": emailSend,
};
//# sourceMappingURL=email.js.map