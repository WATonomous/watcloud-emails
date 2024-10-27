import {
    Hr,
    Link,
    Section,
    Text
} from "@react-email/components";
import { z } from "zod";
import { WATcloudEmail } from "./_common/watcloud-email";

const WATcloudOnboardingEmailProps = z.object({
    name: z.string(),
    machines: z.array(z.string()),
    paths: z.array(z.array(z.string())),
    daysForExpiry: z.string(),
    deletionDate: z.string()
});

type WATcloudOnboardingEmailProps = z.infer<typeof WATcloudOnboardingEmailProps>;

export const WATcloudOnboardingEmail = (props: WATcloudOnboardingEmailProps) => {
    const { name,  machines, paths, daysForExpiry, deletionDate} = WATcloudOnboardingEmailProps.parse(props);

    const previewText = `Welcome to WATcloud! Your access has been updated.`;
    const expiredPaths = (
        <div>
            {machines.map((machine, index) => (
                <ul key={machine} style={{ fontSize: "14px", lineHeight: "24px" }}>
                    <li>{machine}</li>
                    <ul>
                        {paths[index]?.map((path, pathIndex) => (
                            <li key={pathIndex}>{path}</li>
                        ))}
                    </ul>
                </ul>
            ))}
        </div>
    )

    return (
        <WATcloudEmail previewText={previewText}>
            <Text>Hi {name},</Text>
            <Text>
                As per efforts to clean up WATO's file drives, we're looking to delete directories that haven't been used in {daysForExpiry} days.
            </Text>
            <Hr />
            <Section>
                <Text>The following paths on each respective machine are expired:</Text>
                {expiredPaths}
            </Section>
            <Hr />
            <Text style={{ fontWeight: 'bold' }}>
                If you do not use or access any of these directories, then they will be automatically deleted on {deletionDate}.
            </Text>
            <Text>
                If you have any questions, please reach out to your <Link href="https://cloud.watonomous.ca/docs/services#watcloud-contact" style={{ color: "#1e90ff", textDecoration: "none" }}>WATcloud contact</Link> or the WATcloud team at <Link href={`mailto:infra-outreach@watonomous.ca`} style={{ color: "#1e90ff", textDecoration: "none" }}>infra-outreach@watonomous.ca</Link>.
            </Text>
        </WATcloudEmail>
    );
};

WATcloudOnboardingEmail.PreviewProps = {
    name: "John Doe",
    services: ["Compute Cluster", "Discord", "Google Workspace"],
    machines: ["delta-ubuntu2", "tr-ubuntu3"],
    paths: [["home/john/watcloud-emails", "home/john/temp"], ["home/john/temp2"]],
    daysForExpiry: "70", 
    deletionDate: "2025-01-01"
} as WATcloudOnboardingEmailProps;

export default WATcloudOnboardingEmail;