"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const animes_router_1 = require("./routes/animes.router");
const studios_router_1 = require("./routes/studios.router");
const genres_router_1 = require("./routes/genres.router");
const users_router_1 = require("./routes/users.router");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const auth_router_1 = require("./routes/auth.router");
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT;
(0, swagger_1.setupSwagger)(app);
app.use("/api/animes", animes_router_1.animeRouter);
app.use("/api/studios", studios_router_1.studiosRouter);
app.use("/api/genres", genres_router_1.genresRouter);
app.use("/api/users", auth_middleware_1.authMiddleware, users_router_1.usersRouter);
app.use("/api/auth", auth_router_1.authRouter);
app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});
