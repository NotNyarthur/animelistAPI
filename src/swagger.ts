import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const host = process.env.HOST_URL
const port = process.env.PORT
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
        url: `${host}}:${port}`,
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

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Application): void => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
