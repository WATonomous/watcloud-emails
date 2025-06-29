import { FissionContext, FissionCallback } from "./utils";
import { getTransporter } from "./smtp-utils";

module.exports = async function ({request, response}: FissionContext, cb: FissionCallback) {
    if (request.method !== "POST") {
        response.status(405).json({
            error: "Only POST is supported",
        });
        return;
    }

    if (!request.body?.data) {
        response.status(400).json({
            error: "Missing request.body.data",
        });
        return;
    }

    const transporter = await getTransporter();

    try {
        const result = await transporter.sendMail({
            from: request.body.data.from,
            to: request.body.data.to,
            replyTo: request.body.data.reply_to,
            subject: request.body.data.subject,
            text: request.body.data.text,
            html: request.body.data.html,
        })

        response.status(200).json({
            "transporter.isIdle": transporter.isIdle(),
            "result": result,
        });
    } catch (e) {
        console.error(e);
        response.status(500).json({
            error: "Failed to send email: " + e,
        });
        return;
    }
}