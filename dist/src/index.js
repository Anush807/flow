import express from "express";
import "dotenv/config";
import dns from "dns";
import creatFlw from "./api.js";
import { webhookTriggerHandler } from "./triggers/webhook.js";
dns.setDefaultResultOrder("ipv4first");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/flow", creatFlw);
app.post("/webhooks/:webhookKey", (req, res) => {
    void webhookTriggerHandler(req, res).catch((error) => {
        console.error("Webhook trigger failed:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to process webhook trigger" });
        }
    });
});
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map