const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
  } catch (err) {
    console.log(err);
  }
});

userSchema.methods.comparePasswords = async function (
  formPassword, // password i sent with the request
  dbPassword // password saved in my database
) {
  return await bcrypt.compare(
    formPassword,
    dbPassword
  );
};

module.exports = mongoose.model("User", userSchema);
