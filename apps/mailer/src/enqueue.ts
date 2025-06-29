import { Emails } from "@watonomous/watcloud-email-templates";
import { FissionContext, FissionCallback } from "./utils";

module.exports = async function ({request, response}: FissionContext, cb: FissionCallback) {
    response.status(200).json({
        templates: Object.keys(Emails),
    });
}