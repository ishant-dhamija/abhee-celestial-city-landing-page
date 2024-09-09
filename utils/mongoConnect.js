import { MongoClient } from "mongodb";

let client = null;

export default async () => {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
  }
  return client.db(process.env.MONGO_DB_NAME);
};

// export default async () => {
//   const client = await MongoClient.connect(MONGO_URI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//   });

//   cachedDb = client.db(MONGO_DB_NAME);

//   return cachedDb;
// };
