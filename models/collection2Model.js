import mongoose from "mongoose";

const collection2Schema = new mongoose.Schema({
    message: String,
    timestamp: Date
  });
  export default mongoose.model('Collection2', collection2Schema);