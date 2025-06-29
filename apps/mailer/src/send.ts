import nodemailer from "nodemailer";
import { FissionContext, FissionCallback } from "./utils";

module.exports = async function ({request, response}: FissionContext, cb: FissionCallback) {
    response.status(200).json({});
}