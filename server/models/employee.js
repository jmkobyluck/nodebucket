// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: setting up the employee schema
// ;===========================================
// */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./item");

/**
 * employee schema, sprint 1
 */
let employeeSchema = new Schema(
  {
    empId: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [Item],
    done: [Item],
  },
  { collection: "employees" }
);

// exporting employee schema
module.exports = mongoose.model("Employee", employeeSchema);
