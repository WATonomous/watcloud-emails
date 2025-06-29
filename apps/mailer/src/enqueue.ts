import express from "express";
import { Emails } from "@watonomous/watcloud-email-templates";

module.exports = async function (context: { request: express.Request, response: express.Response }, cb: unknown) {
    context.response.status(200).json({
        templates: Object.keys(Emails),
    });
}