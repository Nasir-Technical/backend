const express = require("express");
const studentModel = require("../models/studentmodel")
const route = express.Router();
const { sendResponse } = require("../helper/helper")

route.get("/", async (req, res) => {
    try {
        const result = await studentModel.find()
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        }
        else {
            res.send(sendResponse(true, result)).status(200);
        };
    }
    catch (e) {
        res.send(sendResponse(false)).status(400);
    };
});
route.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        }
        else {
            res.send(sendResponse(true, result)).status(200);
        }
    }
    catch (e) {
        res.send(sendResponse(false)).status(400)
    }

});
route.get("/search", async (req, res) => {
    try {
        let { firstName } = req.body;
        if (firstName) {
            let result = await studentModel.find({ firstName: firstName });
            if (!result) {
                res.send(sendResponse(false, null, "No data found")).status(404);
            }
            else {
                res.send(sendResponse(true, result)).status(200);
            };
        };
    }
    catch(e) {
        res.send(sendResponse(false)).status(400);
    };
});
route.post("/", async (req, res) => {
    let { firstName, lastName, contact, course } = req.body;
    try {
        let errArr = []

        if (!firstName) {
            errArr.push('Required : First Name')
        }
        if (!contact) {
            errArr.push('Required : Contact')
        }
        if (!course) {
            errArr.push('Required : Course')
        }

        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, null, "Require All Fields")).status(400)
            return
        }
        else {
            let obj = { firstName, lastName, contact, course };
            let student = new studentModel(obj);
            await student.save()
            if (!student) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            }
            else {
                res.send(sendResponse(true, student, "Saved Successfully")).status(200)
            }
        }
    }
    catch (e) {
        res.send(sendResponse(false, null, "Internal Server Error")).status(400)
    }
});
route.put("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No data found")).status(400);
        }
        else {
            let { firstName, lastName, contact, course } = req.body;
            let obj = { firstName, lastName, contact, course };
            let updateResult = await studentModel.findByIdAndUpdate(id, obj, { new: true });
            if (!updateResult) {
                res.send(sendResponse(false, null, "Internal Error")).status(400);
            }
            else {
                res.send(sendResponse(true, updateResult, "Updated successfully")).status(200);
            };
        };
    }
    catch (e) {
        res.send(sendResponse(false)).status(400);
    };
});
route.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No data found on this ID")).status(400);
        }
        else {
            let delResult = await studentModel.findByIdAndDelete(id);
            if (!delResult) {
                res.send(sendResponse(false, null, "Internal Error")).status(400);
            }
            else {
                res.send(sendResponse(true, null, "Deleted successfully")).status(200);
            }
        }
    }
    catch (e) {
        res.send(sendResponse(false)).status(400);
    }
});

module.exports = route;