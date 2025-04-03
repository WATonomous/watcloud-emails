import {
    Hr,
    Link,
    Section,
    Text
} from "@react-email/components";
import { z } from "zod";
import { WATcloudEmail } from "./_common/watcloud-email";

const EmailProps = z.object({
    name: z.string(),
    paths: z.array(z.string()),
    daysForExpiry: z.string()
});

type EmailProps = z.infer<typeof EmailProps>;

const Email = (props: EmailProps) => {
    const { name, paths, daysForExpiry } = EmailProps.parse(props);

    const previewText = `Some of your files in the WATcloud compute cluster have expired.`;

    const deletedPaths = (
        <div>
            <ul style={{ fontSize: "14px", lineHeight: "24px" }}>
                {paths.map(path => (
                    <li key={path}>{path}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <WATcloudEmail previewText={previewText}>
            <Text>Hi {name},</Text>
            <Text>
                In an ongoing effort to keep WATcloud's file storage efficient and maintain optimal performance, we routinely clean up specific directories that haven't been accessed in the past {daysForExpiry} days. We previously sent an email that you had files which met this criteria. Since they were not accessed by the given deadline, those files will be deleted.
            </Text>
            <Hr />
            <Section>
                <Text>The following paths will be deleted:</Text>
                {deletedPaths}
            </Section>
            <Hr />
            <Text>
                If you have any questions, please reach out to your <Link href="https://cloud.watonomous.ca/docs/services#watcloud-contact" style={{ color: "#1e90ff", textDecoration: "none" }}>WATcloud contact</Link> or the WATcloud team at <Link href={`mailto:infra-outreach@watonomous.ca`} style={{ color: "#1e90ff", textDecoration: "none" }}>infra-outreach@watonomous.ca</Link>.
            </Text>
        </WATcloudEmail>
    );
};

Email.PreviewProps = {
    name: "John Doe",
    paths: ["delta-ubuntu2:/var/lib/cluster/users/1234/docker", "delta-ubuntu2:/var/lib/cluster/users/1234/containers", "tr-ubuntu3:/var/lib/cluster/users/1234/containers", "/mnt/wato-drive2/someuser"],
    daysForExpiry: "70"
} as EmailProps;

export default Email;
