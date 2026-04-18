import express from "express";
import "dotenv/config"
import creatFlw from "./api.js"
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/flow", creatFlw);

app.listen(PORT,() => {
    console.log(`App is listening on port ${PORT}`)
})
