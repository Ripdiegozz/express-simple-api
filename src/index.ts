import express, { Express } from "express";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import router from "./routes";
import { corsMiddleware } from "./middlewares/cors";

dotenv.config();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);

    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("El tipo del archivo " + file.originalname + " no está permitido"));
    }

    cb(null, true);
  },
});

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
app.use(corsMiddleware())
app.use(router);

app.post("/upload", upload.array("file"), (req, res) => {
  return res.json({ message: "Upload success" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} :PPP`);
});
