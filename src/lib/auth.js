import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.MONGO_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "seeker", // ডিফল্ট ভ্যালু হিসেবে 'seeker' থাকবে
        input: true             // ফ্রন্টএন্ড থেকে ইনপুট নেওয়ার অনুমতি দেয়
      } 
    }
  }
});