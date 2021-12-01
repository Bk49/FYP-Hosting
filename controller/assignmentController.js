/**
 * Assignment controller and routes
 */

const express = require("express");
const router = express.Router();


// model and functions
const { assignmentModel } = require("../model/assignmentModel");
const notificationModel = require("../model/notificationModel");

// error handler modules
const { MongoError } = require("mongodb");
const { Error } = require("mongoose");

/**
 * GET /assignment/group?groupId= &userId=
 */
router.get(
    "/group",
    //validate("userId"),
    async (req, res) => {
        const { groupId, userId } = req.query;
        try {
            console.time("GET all assignments by grpid");
            const result = await assignmentModel.getAsgByGrpId(groupId, userId);
            res.status(200).send(result);
        } catch (err) {
            // if (err == "NOT_FOUND")
            //     res.status(404).send({ error: "Group ID not found", code: err });
            // else
            if (err instanceof Error || err instanceof MongoError)
                res.status(500).send({
                    error: err.message,
                    code: "DATABASE_ERROR",
                });
            else
                res.status(500).send({
                    error: "Error getting assignments by grpid",
                    code: "UNEXPECTED_ERROR",
                });
        } finally {
            console.timeEnd("GET all assignments by grpid");
        }
    }
);

/**
 * GET /assignment/progress?userId=..
 */
router.get(
    "/progress",
    //validate("userId"),
    async (req, res) => {
        const { userId } = req.query;
        try {
            console.time("GET progress by userid");
            const result = await assignmentModel.getUndoneAssignmentByUserId(
                userId
            );
            res.status(200).send(result);
        } catch (err) {
            // if (err == "NOT_FOUND")
            //     res.status(404).send({ error: "Group ID not found", code: err });
            // else
            if (err instanceof Error || err instanceof MongoError)
                res.status(500).send({
                    error: err.message,
                    code: "DATABASE_ERROR",
                });
            else
                res.status(500).send({
                    error: "Error getting assignment by userid",
                    code: "UNEXPECTED_ERROR",
                });
        } finally {
            console.timeEnd("GET progress by userid");
        }
    }
);

/**
 * GET /assignment/user?userId  get asg by user id
 */
router.get(
    "/user",
    //validate("userId"),
    async (req, res) => {
        const { userId } = req.query;
        try {
            console.time("GET assignments by userid");
            const result = await assignmentModel.getAsgByUserId(userId);
            res.status(200).send(result);
        } catch (err) {
            // if (err == "NOT_FOUND")
            //     res.status(404).send({ error: "Group ID not found", code: err });
            // else
            if (err instanceof Error || err instanceof MongoError)
                res.status(500).send({
                    error: err.message,
                    code: "DATABASE_ERROR",
                });
            else
                res.status(500).send({
                    error: "Error getting assignments by userid",
                    code: "UNEXPECTED_ERROR",
                });
        } finally {
            console.timeEnd("GET assignments by userid");
        }
    }
);

/**
 * GET /assignment/outstanding?groupId=
 */
router.get("/outstanding", async (req, res) => {
    const { groupId } = req.query;
    try {
        console.time("GET assignment progress by grpid");
        const result = await assignmentModel.getAllAsgProgressByGrpId(groupId);
        res.status(200).send(result);
    } catch (err) {
        if (err instanceof Error || err instanceof MongoError)
            res.status(500).send({
                error: err.message,
                code: "DATABASE_ERROR",
            });
        else
            res.status(500).send({
                error: "Error getting members by grpid",
                code: "UNEXPECTED_ERROR",
            });
    } finally {
        console.timeEnd("GET assignment progress by grpid");
    }
});

/**
 * GET /assignment/:assignmentId  get asg by id
 */
router.get(
    "/:assignmentId",
    //validate("quizId"),
    async (req, res) => {
        const { assignmentId } = req.params;
        try {
            console.time("GET assignment by id");
            const result = await assignmentModel.getAsgById(assignmentId);

            res.status(200).send(result);
        } catch (err) {
            // if (err == "NOT_FOUND")
            //     res.status(404).send({ error: "Group ID not found", code: err });
            // else
            if (err instanceof Error || err instanceof MongoError)
                res.status(500).send({
                    error: err.message,
                    code: "DATABASE_ERROR",
                });
            else
                res.status(500).send({
                    error: "Error getting grp by id",
                    code: "UNEXPECTED_ERROR",
                });
        } finally {
            console.timeEnd("GET assignment by id");
        }
    }
);

/**
 * POST /assignment
 */
router.post(
    "/",
    //validate("createTopic"),
    async (req, res) => {
        const {
            title,
            level_id,
            topic_id,
            skill_id,
            assigned_by,
            group_id,
            deadline,
        } = req.body;
        try {
            console.time("POST assignment");
            const result = await assignmentModel.createAsgbyGrpId(
                title,
                level_id,
                topic_id,
                skill_id,
                assigned_by,
                group_id,
                deadline
            );

            // Handling for notifications
            const { _id } = result;
            if(_id){
                console.time("POST notification by asgId");
                // Create notification when there is a new homework
                await notificationModel.createNewAssignmentNotification(
                    _id,
                    "You have been assigned new homework! Start doing them here now!"
                );
                // Schedule notification for homework going to expire
                const assignment = await assignmentModel.getAsgById(_id);
                const deadline = new Date(assignment.deadline);
        
                // Schedule notification to be sent to urge students to complete their almost due assignments
                if (deadline - 259200000 >= 0)
                    schedule.scheduleJob(deadline - 259200000, async () => {
                        await notificationModel.createAssignmentReminderNotification(
                            assignment,
                            "You have uncompleted homework! Your deadline is in 3 days left, start doing them here now!"
                        );
                    });
        
                if (deadline - 172800000 >= 0)
                    schedule.scheduleJob(deadline - 172800000, async () => {
                        await notificationModel.createAssignmentReminderNotification(
                            assignment,
                            "You have uncompleted homework! Your deadline is in 2 days left, start doing them here now!"
                        );
                    });
        
                if (deadline - 86400000 >= 0)
                    schedule.scheduleJob(deadline - 86400000, async () => {
                        await notificationModel.createAssignmentReminderNotification(
                            assignment,
                            "You have uncompleted homework! Your deadline is in 1 day left, start doing them here now!"
                        );
                    });
                else {
                    await notificationModel.createAssignmentReminderNotification(
                        assignment,
                        "You have uncompleted homework! Your deadline is in 1 day left, start doing them here now!"
                    );
                }
        
                // Schedule for assignment requires marking if pass deadline
                schedule.scheduleJob(deadline - 259200000, async () => {
                    await notificationModel.createAssignmentMarkingNotification(
                        _id,
                        false
                    ); // Specify false to mention that it is checking for past deadline
                });
            }

            res.status(200).send({ new_id: result._id });
        } catch (err) {
            if (err instanceof Error || err instanceof MongoError)
                res.status(500).send({
                    error: err.message,
                    code: "DATABASE_ERROR",
                });
            else
                res.status(500).send({
                    error: "Error adding assignment and its notifications by grp id",
                    code: "UNEXPECTED_ERROR",
                });
        } finally {
            console.timeEnd("POST assignment");
        }
    }
);

module.exports = router;
