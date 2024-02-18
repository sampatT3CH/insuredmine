import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({
    accountName: String
  });
  
  export default mongoose.model('UserAccount', userAccountSchema);