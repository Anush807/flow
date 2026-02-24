import express from "express";
import "dotenv/config"
import creatFlw from "./api.js"

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/flow", creatFlw);

app.listen(PORT,() => {
    console.log(`App is listening on port ${PORT}`)
})
