"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const port = process.env.PORT;
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Animelist API documentation",
            version: "1.0.0",
            description: "Animelist API documentation with Swagger",
            contact: {
                name: "Luis Vivar",
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
        tags: [
            { name: 'Anime', description: 'Anime operations' },
            { name: 'Genres', description: 'Genres operations' },
            { name: 'Studios', description: 'Studios operations' },
            { name: 'Users', description: 'Users operations' },
            { name: 'Auth', description: 'Auth operations' },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/schemas/*.ts"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setupSwagger = (app) => {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
};
exports.setupSwagger = setupSwagger;
