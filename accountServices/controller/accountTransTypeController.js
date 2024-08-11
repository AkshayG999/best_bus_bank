const accountTransTypeServices = require("../services/accountTransTypeServices");

exports.getAll = async (req, res, next) => {
  try {
    const result = await accountTransTypeServices.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching TransType:", error);
    return next(error, req, res);
  }
};
