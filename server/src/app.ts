import express from "express";
import cors from "cors";
import helmet from "helmet";
import ideaRoutes from "./routes/ideaRoutes";
import voteRoutes from "./routes/voteRoutes";
import { getClientIp } from "./middleware/ipMiddleware";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(getClientIp);

app.use("/api", ideaRoutes);
app.use("/api", voteRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    yourIp: req.clientIp,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
