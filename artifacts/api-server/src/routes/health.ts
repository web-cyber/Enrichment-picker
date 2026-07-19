import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";


import { Router, type Request, type Response } from "express";

router.get("/healthz", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export default router;
