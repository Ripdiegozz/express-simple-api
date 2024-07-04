import express, { Express } from "express";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(express.json());
app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);
app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} :PPP`);
});
