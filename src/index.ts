import express from "express";
import "dotenv/config"
import creatFlw from "./routes/createFlw.js"

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/create", creatFlw);

app.listen(() => {
    console.log(`App is listening on port ${PORT}`)
})
