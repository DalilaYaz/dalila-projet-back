var Entreprise = require("../models/entreprise");

const { param, body, validationResult } = require("express-validator");
const entreprise = require("../models/entreprise");


exports.create = [

  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("companyName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Company name must be specified.")
    .isAlphanumeric()
    .withMessage("Company name has non-alphanumeric characters."),

  body("companySiret")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Company siret must be specified.")
    .isAlphanumeric()
    .withMessage("Company siret has non-alphanumeric characters."),


  body("email").isEmail().withMessage("Invalid email"),

  body("dateOfCreation", "Invalid date of creation")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {

    const errors = validationResult(req);

    var entreprise = new Entreprise({
      _id: req.body.id,
      companyName: req.body.companyName,
      companySiret: req.body.companySiret,
      email: req.body.email,
      dateOfCreation: req.body.dateOfCreation,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      entreprise.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Entreprise created successfully !");
      });
    }
  },
];

exports.getAll = function (req, res, next) {
  Entreprise.find().exec(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Entreprise.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
    }
  },
];


exports.delete = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Entreprise.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Entreprise deleted successfully !");
      });
    }
  },
];


exports.update = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("companyName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Company name must be specified.")
    .isAlphanumeric()
    .withMessage("Company name has non-alphanumeric characters."),

  body("companySiret")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Company siret must be specified.")
    .isAlphanumeric()
    .withMessage("Company siret has non-alphanumeric characters."),

  body("email").isEmail().withMessage("Invalid email"),

  body("dateOfCreation", "Invalid date of creation")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {

    const errors = validationResult(req);

    var entreprise = new Entreprise({
      _id: req.params.id,
      companyName: req.body.companyName,
      companySiret: req.body.companySiret,
      email: req.body.email,
      dateOfCreation: req.body.dateOfCreation,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Entreprise.findByIdAndUpdate(req.params.id, entreprise, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Entreprise updated successfully !");
      });
    }
  },
];