/**
 * Notification controller and routes
 */

const express = require("express");
const router = express.Router();

// model and functions
const notificationModel = require("../model/notificationModel");
const { assignmentModel } = require("../model/assignmentModel");

// error handler modules
const { MongoError } = require("mongodb");
const { Error } = require("mongoose");

// Testing notifications
router.post("/testing", async (req, res) => {
    try {
        console.time("TESTING noti by asgId");
        const { asgId } = req.query;
        await notificationModel.createAssignmentMarkingNotification(
            asgId,
            true
        );
        await notificationModel.createAssignmentMarkingNotification(
            asgId,
            false
        );
        await notificationModel.createAssignmentReminderNotification(
            asgId,
            "You have uncompleted homework! Your deadline is in 3 days left, start doing them here now!"
        );
        await notificationModel.createLeaderboardChangesNotification(
            asgId
        );
        await notificationModel.createNewAssignmentNotification(
            asgId,
            "You have been assigned new homework! Start doing them here now!"
        );
        res.status(200).send({});
    } catch (err) {
        console.log(err);
        if (err instanceof Error || err instanceof MongoError)
            res.status(500).send({
                error: err.message,
                code: "DATABASE_ERROR",
            });
        else
            res.status(500).send({
                error: "Error testing notification by asg id",
                code: "UNEXPECTED_ERROR",
            });
    } finally {
        console.timeEnd("GET noti by userid");
    }
});

/**
 * GET /notification/user?userId=
 */
router.get("/user", async (req, res) => {
    const { userId } = req.query;
    try {
        console.time("GET noti by userid");
        const result = await notificationModel.getNotificationByUser(userId);
        res.status(200).send(result);
    } catch (err) {
        if (err instanceof Error || err instanceof MongoError)
            res.status(500).send({
                error: err.message,
                code: "DATABASE_ERROR",
            });
        else
            res.status(500).send({
                error: "Error getting notification by user id",
                code: "UNEXPECTED_ERROR",
            });
    } finally {
        console.timeEnd("GET noti by userid");
    }
});

/**
 * PUT /notification/dismiss dismiss notification by id
 */
router.put("/dismiss", async (req, res) => {
    const { notificationId } = req.query;
    try {
        console.time("PUT dismiss noti by userid");
        await notificationModel.dismissNotificationById(notificationId);
        res.status(200).send({ message: "Notification Dismissed" });
    } catch (err) {
        console.log(err);
        if (err instanceof Error || err instanceof MongoError)
            res.status(500).send({
                error: err.message,
                code: "DATABASE_ERROR",
            });
        else
            res.status(500).send({
                error: "Error dismissing noti",
                code: "UNEXPECTED_ERROR",
            });
    } finally {
        console.timeEnd("PUT dismiss noti by userid");
    }
});

module.exports = router;
