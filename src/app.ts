import express from "express";
import cors from "cors";
import formRoute from "./routes/formRoute";

const app = express();

app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home Page Route
app.get("/", (req, res) => {
  res.send("Welcome to the API! 🚀");
});

app.use("/api/v1", formRoute);

export default app;
