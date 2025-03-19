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

const userConfigEmailProps = z.object({
    name: z.string(),
    editLink: z.string(),
});

type userConfigEmailProps = z.infer<typeof userConfigEmailProps>;

export function userConfigEmail(props: userConfigEmailProps) {
    const { 
        name, 
        editLink,
    } = userConfigEmailProps.parse(props);

    const previewText = `User Configuration for ${name}`;

    return (
        <WATcloudEmail previewText={previewText}>
            <Text>Hi {name},</Text>
            <Text>Greetings from WATcloud! Your WATcloud user config edit link is ready for you <Link href={editLink}>here.</Link></Text>
            <Text>If you have any questions or need assistance, don't hesitate to reach out to your WATcloud contact or the WATcloud team at <Link href="mailto:infra-outreach@watonomous.ca">infra-outreach@watonomous.ca</Link>.</Text>
            <Text>Vroom vroom, <br></br> WATcloud Team.</Text>
        </WATcloudEmail>
    );
};

userConfigEmail.PreviewProps = {
    name: "John Doe",
    editLink: "https://google.com",
} as userConfigEmailProps;

export default userConfigEmail;
