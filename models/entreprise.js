var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var validateEmail = function (email) {
  var re = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return re.test(email);
};

var formatDate = function () {
  return DateTime.fromJSDate(this.dateOfCreation).toISODate();
};

var entrepriseSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  companyName: { type: String, required: true },
  companySiret: { type: Number, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  dateOfCreation: {
    type: Date,
    required: true,

    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },

  salarie: { type: Number, required: true, ref: "salaries"},
});

entrepriseSchema.set("toJSON", {

  virtuals: true,
  versionKey: false,

  transform: function (doc, ret) {
    delete ret._id;
  },
});


entrepriseSchema.virtual("id").get(function () {
  return this._id;
});


module.exports = mongoose.model("entreprises", entrepriseSchema);