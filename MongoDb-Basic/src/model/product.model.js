import { getDb } from "../db/database-connection.js";
import { ObjectId } from "mongodb";

export class ProductModel {
  // Get all products from database collection
  static getAllProducts() {
    return getDb().collection("products").find({}).toArray();
  }
  // Create a product to a database collection
  static createProduct(productData) {
    return getDb().collection("products").insertOne(productData);
  }
  // Get product by id from database collection
  static getProductById(productId) {
    return getDb()
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });
  }
  // Update product in database collection
  static updateProduct(productId, productData) {
    return getDb()
      .collection("products")
      .updateOne({ _id: new ObjectId(productId) }, { $set: productData });
  }
  // Delete a product from database collection
  static deleteProduct(productId) {
    return getDb()
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) });
  }
}
