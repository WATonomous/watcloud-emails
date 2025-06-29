import express from "express";
import nodemailer from "nodemailer";

module.exports = async function (context: { request: express.Request, response: express.Response }, cb: unknown) {
    context.response.status(200).json({
    });
}