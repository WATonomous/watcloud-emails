import express from "express";

module.exports = async function (context: { req: express.Request, res: express.Response }) {
    return {
        status: 200,
        body: "Enqueue: To be implemented 789\n"
    };
}