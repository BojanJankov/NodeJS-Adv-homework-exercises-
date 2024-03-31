import { Router } from "express";
import { productRouter } from "../routes/products.route.js";

export const globalRouter = Router();

globalRouter.use("/products", productRouter);
