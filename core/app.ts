import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import userRoutes from "../routes/userRoutes";
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import responseWrapper from "../utils/responseWrapper";
import cors from "cors";

dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'User CRUD API',
          description: 'User CRUD API Information',
          contact: {
              name: 'Jonathan Wijaya'
          },
          version: "0.1"
      },
      servers: [
          {
              url: "http://localhost:3000/api"
          }
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", // Optional: Indicates token format
          },
        },
      },
  },
  apis: ['./routes/userRoutes*.ts','./swagger.yaml']
}

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(responseWrapper);

//Swagger
const swaggerDocs = swaggerjsdoc(swaggerOptions)

// Routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});