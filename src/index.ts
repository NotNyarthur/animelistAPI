import express from "express";
import cors from "cors";
import { animeRouter } from "./routes/animes.router";
import { studiosRouter } from "./routes/studios.router";
import { genresRouter } from "./routes/genres.router";
import { usersRouter } from "./routes/users.router";
import { authMiddleware } from "./middlewares/auth.middleware";
import { authRouter } from "./routes/auth.router";
import { setupSwagger } from "./swagger";

const app = express();
app.use(cors());
app.use(express.json());

const host = process.env.HOST_URL;
const port = process.env.PORT;

setupSwagger(app);

app.use("/api/animes", animeRouter);
app.use("/api/studios", studiosRouter);
app.use("/api/genres", genresRouter);
app.use("/api/users", authMiddleware, usersRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running at: ${host}:${port}`);
});
