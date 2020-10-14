// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: setting up the employee api
// ; including findEmployeeById, findAllTasks,
// ; creatTask, updateTask, and deleteTask
// ;===========================================
// */

// require statements
const express = require("express");
const { update } = require("../models/employee");
const Employee = require("../models/employee");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");

const router = express.Router();

/**
 * findEmployeeById
 */
router.get("/:empId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error!",
        });
      } else {
        /**
         * If the are no database level errors, return the employee object
         */
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

/**
 * API: findAllTasks
 */

router.get("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne(
      {
        empId: req.params.empId,
      },
      "empId todo done",
      function (err, employee) {
        if (err) {
          console.log(err);

          const mongoDbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res.status(500).send(mongoDbErrorResponse.toObject());
        } else {
          console.log(employee);

          const employeeTasksResponse = new BaseResponse(
            "200",
            "Query Successful",
            employee
          );

          res.json(employeeTasksResponse.toObject());
        }
      }
    );
  } catch (e) {
    const errorCatchResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );

    res.status(500).send(errorCatchResponse.toObject());
  }
});

/**
 * API: createTask
 */
router.post("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);

        const createTaskMongoDbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );

        res.status(500).send(createTaskMongoDbErrorResponse.toObject());
      } else {
        console.log(employee);

        // create a new item object
        const item = {
          text: req.body.text,
        };

        // push the new item to the todo array
        employee.todo.push(item);

        employee.save(function (err, updateEmployee) {
          if (err) {
            console.log(err);

            const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse(
              "500",
              "Internal server error",
              err
            );

            res
              .status(500)
              .send(createTaskOnSaveMongoDbErrorResponse.toObject());
          } else {
            console.log(updateEmployee);

            const createTaskOnSaveSuccessResponse = new BaseResponse(
              "200",
              "Successful entry",
              updateEmployee
            );

            res.json(createTaskOnSaveSuccessResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);

    const creatTaskCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );

    res.status(500).send(creatTaskCatchErrorResponse.toObject());
  }
});

/**
 * API: updateTask
 */
router.put("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);

        const updateTaskMongoDbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );

        res.status(500).send(updateTaskMongoDbErrorResponse.toObject());
      } else {
        console.log(employee);

        employee.set({
          todo: req.body.todo,
          done: req.body.done,
        });

        employee.save(function (err, updateEmployee) {
          if (err) {
            console.log(err);

            const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse(
              "500",
              "Internal server error",
              err
            );

            res
              .status(500)
              .send(updateTaskOnSaveMongoDbErrorResponse.toObject());
          } else {
            console.log(updateEmployee);

            const updateTaskOnSaveSuccessResponse = new BaseResponse(
              "200",
              "Update successful",
              updateEmployee
            );

            res.json(updateTaskOnSaveSuccessResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);

    const updateTaskCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );

    res.status(500).send(updateTaskCatchErrorResponse.toObject());
  }
});

/**
 * API: deleteTask
 */
router.delete("/:empId/tasks/:taskId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);

        const deleteTaskMongoDbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );

        res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());
      } else {
        console.log(employee);

        const todoItem = employee.todo.find(
          (item) => item._id.toString() === req.params.taskId
        );
        const doneItem = employee.done.find(
          (item) => item._id.toString() === req.params.taskId
        );

        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function (err, updatedTodoItemEmployee) {
            if (err) {
              console.log(err);

              const deleteToDoItemOnSaveMongoDbErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );

              res
                .status(500)
                .send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject());
            } else {
              console.log(updatedTodoItemEmployee);

              const deleteToDoItemSuccessResponse = new BaseResponse(
                "200",
                "Removed item from the todo list",
                updatedTodoItemEmployee
              );

              res.json(deleteToDoItemSuccessResponse.toObject());
            }
          });
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function (err, updatedDoneItemEmployee) {
            if (err) {

              console.log(err);

              const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );

              res
                .status(500)
                .send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());
            } else {

              console.log(updatedDoneItemEmployee);

              const deleteDoneItemSuccessResponse = new BaseResponse(
                "200",
                "Removed item from the todo list",
                updatedDoneItemEmployee
              );

              res.json(deleteDoneItemSuccessResponse.toObject());
            }
          });
        } else {
          console.log("Invalid task Id");

          const deleteTaskNotFoundResponse = new ErrorResponse(
            "200",
            "Unable to locate requested task",
            null
          );

          res.status(200).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);

    const deleteTaskCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );

    res.status(500).send(deleteTaskCatchErrorResponse.toObject());
  }
});

module.exports = router;
