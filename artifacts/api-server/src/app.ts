import { createRequire } from "node:module";
import type { IncomingMessage, ServerResponse } from "node:http";
import express, { type Express, type RequestHandler } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";

const require = createRequire(import.meta.url);
const pinoHttp = require("pino-http") as (opts?: unknown) => RequestHandler;

type SerializedReq = IncomingMessage & { id?: string };
type SerializedRes = ServerResponse & { statusCode: number };

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: SerializedReq) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: SerializedRes) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
