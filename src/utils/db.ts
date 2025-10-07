import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// cache the connection across HMR in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}
const globalCache = global._mongoose || { conn: null, promise: null };

export default async function dbConnect(): Promise<Mongoose> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  globalCache.conn = await globalCache.promise;
  global._mongoose = globalCache;
  return globalCache.conn;
}
