import express, { json } from "express";
import router from "./routes/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "API is running fine" }); 
});
app.use("/api/v1", router);

app.use(errorMiddleware);

export default app;