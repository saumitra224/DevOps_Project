const express = require("express");

const Employee = require("../models/Employee");

const { handleValidationError } = require("../utils/index");

const router = express.Router();

// Get Insert Employee Form
router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
    employee: {
      _id: "",
      fullName: "",
      email: "",
      mobile: "",
      city: ""
    }
  });
});

// Create or Update Employee
router.post("/", async (req, res) => {
  const { fullName, email, mobile, city } = req.body;

  try {
    if (req.body._id == "") {
      const employee = new Employee({ fullName, email, mobile, city });
      await employee.save();

      res.redirect("/employee/list");
    } else {
      await Employee.findOneAndUpdate({ _id: req.body._id }, req.body, {
        new: true
      });

      res.redirect("/employee/list");
    }
  } catch (err) {
    if (req.body._id == "") {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Insert Employee",
          employee: req.body
        });
      } else console.log("Error during record insertion : " + err);
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Update Employee",
          employee: req.body
        });
      } else console.log("Error during record update : " + err);
    }
  }
});

// List All Employees
router.get("/list", async (req, res) => {
  try {
    const employees = await Employee.find({});

    res.render("employee/list", {
      list: employees
    });
  } catch (err) {
    console.log("Error in retrieving employee list :" + err);
  }
});

// Get Employee By id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      console.log("404 - Employee not found!");
    }

    res.render("employee/addOrEdit", {
      viewTitle: "Update Employee",
      employee: employee
    });
  } catch (err) {
    console.log("Error in retrieving employee :" + err);
  }
});

// Delete Employee By id
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndRemove(id);

    if (!employee) {
      console.log("404 - Employee not found!");
    }

    res.redirect("/employee/list");
  } catch (err) {
    console.log("Error in employee delete :" + err);
  }
});

module.exports = router;
