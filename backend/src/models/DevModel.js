import mongoose from "mongoose";

const devSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Dev", devSchema);
