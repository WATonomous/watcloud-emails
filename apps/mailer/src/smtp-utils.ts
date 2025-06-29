import { fissionGetConfig, fissionGetSecret } from "./utils";
import nodemailer from "nodemailer";
import SMTPPool from "nodemailer/lib/smtp-pool";

let transporterPromise: Promise<nodemailer.Transporter<SMTPPool.SentMessageInfo, SMTPPool.Options>> | null = null;

export function getTransporter(): Promise<nodemailer.Transporter<SMTPPool.SentMessageInfo, SMTPPool.Options>> {
    if (transporterPromise) {
        return transporterPromise;
    }

    transporterPromise = (async () => {
        const SMTP_SERVER = await fissionGetConfig("SMTP_SERVER");
        const SMTP_PORT = await fissionGetConfig("SMTP_PORT");
        const SMTP_USER = await fissionGetConfig("SMTP_USER");
        const SMTP_PASSWORD = await fissionGetSecret("SMTP_PASSWORD");

        if (!SMTP_SERVER || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
            throw new Error("SMTP_SERVER, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD are required");
        }

        /**
         * One shared transporter for your whole process.
         * The transporter will automatically open up to `maxConnections`
         * sockets and keep them warm.
         */
        const transporter = nodemailer.createTransport({
            host: SMTP_SERVER,
            port: Number(SMTP_PORT),
            secure: Number(SMTP_PORT) === 465,
            pool: true, // ♻️  enable connection pooling
            maxConnections: 5, // optional – defaults to 5
            maxMessages: 100, // optional – defaults to 100
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            },
        });

        return transporter;
    })();

    return transporterPromise;
}