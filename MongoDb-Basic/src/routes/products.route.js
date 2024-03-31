import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";

export const productRouter = Router();

productRouter.get("/", ProductController.getAllProducts);
productRouter.post("/", ProductController.createProduct);
productRouter.get("/:id", ProductController.getProductById);
productRouter.patch("/:id", ProductController.updateProduct);
productRouter.delete("/:id", ProductController.deleteProduct);
