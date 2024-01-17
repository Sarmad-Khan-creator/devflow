import mongoose from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing MongoDB URL");
  }

  if (isConnected) {
    console.log("Already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    isConnected = true;
    console.log("Connected");
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};

export default connectToDatabase;
