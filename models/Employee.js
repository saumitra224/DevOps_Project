const mongoose = require("mongoose");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true
    },
    mobile: {
      type: Number,
      unique: true
    },
    city: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

employeeSchema.path("email").validate((val) => {
  return emailRegex.test(val);
}, "Invalid Email Address.");

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
