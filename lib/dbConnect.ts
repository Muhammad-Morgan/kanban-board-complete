import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Connection string doesn't exist...");

// we need to cache the connection across reloads to prevent creating multiple connections

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// This tells TS: I am extending the global scope and adding a new property...
declare global {
  var mongooseCache: MongooseCache | undefined; // here we used "var" because we need this property attached to the global object..
}

let cached = global.mongooseCache; // we check if a cached connection exists to use it. Else, we set to undefined...
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached!.conn) return cached!.conn; // if connection exists return it...

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => m);
  } // if no cached connection establish a new one
  cached!.conn = await cached!.promise; // await for it here...
  return cached!.conn;
}
