import { createRequire } from "node:module";
import type { IncomingMessage, ServerResponse } from "node:http";
import express, { type Express, type RequestHandler } from "express";
import cors from "cors";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

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

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#111827"/><text x="32" y="42" text-anchor="middle" font-size="32">🖼️</text></svg>`;

app.get(["/favicon.ico", "/favicon.png"], (_req, res) => {
  res.type("image/svg+xml").send(faviconSvg);
});

app.get("/", (_req, res) => {
  res.redirect(302, "https://image-picker-inky.vercel.app");
});

app.use("/api", router);

export default app;
