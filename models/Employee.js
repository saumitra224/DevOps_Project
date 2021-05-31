const mongoose = require("mongoose");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const mobileRegex = /^[6-9][0-9]{9}$/;

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Required."],
      minlength: [3, " Must be atleast 3 characters long."],
      trim: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Required."],
      trim: true
    },
    mobile: {
      type: Number,
      required: [true, "Required."],
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

employeeSchema.path("mobile").validate((val) => {
  return mobileRegex.test(val);
}, "Invalid Mobile Number.");

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
