const MongoClient = require("mongodb").MongoClient;
import config from "../config";
const url = config.mongoUrl;

interface IPageResponse {
  count: number;
  data: any;
}

async function getCollection(action: string) {
  const dbName = "local";
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db(dbName);
  const collection = db.collection(action);
  return collection;
}
export async function getLast(action: string) {
  const collection = await getCollection(action);
  const res = await collection.findOne({}, {sort: {$natural: -1}});
  return res;
}

export async function getActionsList(action: string, offset: number, limit: number) {
  const collection = await getCollection(action);
  const count = await collection.countDocuments();
  console.log(await collection.find({}).toArray())
  const data = await collection.find({}).skip(offset).limit(limit).toArray();
  const response: IPageResponse = {count, data};
  return response;
}
