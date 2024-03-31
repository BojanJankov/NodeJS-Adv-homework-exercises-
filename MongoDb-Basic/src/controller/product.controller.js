import { ProductModel } from "../model/product.model.js";

export class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductModel.getAllProducts();

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const newProduct = await ProductModel.createProduct(req.body);

      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const foundProduct = await ProductModel.getProductById(req.params.id);

      return res.status(201).json(foundProduct);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      await ProductModel.updateProduct(req.params.id, req.body);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductModel.deleteProduct(req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
}
