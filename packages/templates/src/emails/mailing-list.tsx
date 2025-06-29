import {
    Heading,
    Hr,
    Img,
    Link,
    Markdown,
    Text
} from "@react-email/components";
import { z } from "zod";
import { WATcloudEmail } from "./_common/watcloud-email";

const CODE_TTL_SEC = 60 * 60 * 24

const mailingListEmailProps = z.object({
    email: z.string(),
    confirmationURL: z.string(),
    mailingList: z.string(),
});

type mailingListEmailProps = z.infer<typeof mailingListEmailProps>;

export function mailingListEmail(props: mailingListEmailProps) {
    const { 
        email, 
        confirmationURL,
        mailingList,
    } = mailingListEmailProps.parse(props);

    const previewText = `Confirm your Subscription`;

    return (
        <WATcloudEmail previewText={previewText}>
            <Text>Thanks for signing up for updates from {mailingList}</Text>
            <Text>Please confirm your subscription by clicking the button below. This confirmation email will expire in {Math.floor(CODE_TTL_SEC / 60 / 60)} hours. </Text>
            <Link className="confirmation-button" href={confirmationURL}>Confirm Subscription</Link>
            <Text>If the button above does not work, please copy and paste the following URL into your browser</Text>
            <pre>{confirmationURL}</pre>
            <Text>This email was sent to {email}. If you did not request this subscription, no further action is required. You won't be subscribed if you don't click the confirmation link.</Text>
        </WATcloudEmail>
    );
};

mailingListEmail.PreviewProps = {
    email: "John Doe",
    confirmationURL: "https://google.com",
    mailingList: "WATcloud",
} as mailingListEmailProps;

export default mailingListEmail;
