import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("Cannot connect to MongoDB !!!", error);
    throw new Error("Cannot connect to MongoDB !!!");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log("Cannot disconnect from MongoDB !!!", error);
    throw new Error("Cannot disconnect from MongoDB !!!");
  }
}

export { connectToDatabase, disconnectFromDatabase };
