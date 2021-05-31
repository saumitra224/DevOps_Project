const handleValidationError = (err, body) => {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      case "mobile":
        body["mobileError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
};

const handleMongoError = (err, body) => {
  const MongoErrors = Object.keys(err.keyPattern);

  MongoErrors.forEach((error) => {
    switch (error) {
      case "email":
        body["emailError"] = "Email is already used by another employee.";
        break;
      case "mobile":
        body["mobileError"] = "Mobile is already used by another employee.";
        break;
      default:
        break;
    }
  });
};

module.exports = { handleValidationError, handleMongoError };
