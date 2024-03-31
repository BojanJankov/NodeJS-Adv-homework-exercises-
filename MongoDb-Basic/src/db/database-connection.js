import { MongoClient, Db } from "mongodb";

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(MONGO_URI);

/**
 * @type {Db}
 */
let database = null;

export const connectToDatabase = async () => {
  try {
    await client.db().command({ ping: 1 });

    console.log("Connected to MongoDB");

    database = client.db();
  } catch (error) {
    console.log(error);
  }
};

export const getDb = () => database;
