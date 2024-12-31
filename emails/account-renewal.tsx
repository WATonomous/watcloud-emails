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

const EmailProps = z.object({
    name: z.string(),
    lastActiveTerm: z.string(),
    expiresOn: z.string(),
    daysUntilExpiry: z.number(),
    renewalLink: z.string(),
    expiryDetails: z.string(),
    targetEmails: z.array(z.string()),
});

type EmailProps = z.infer<typeof EmailProps>;

export function Email(props: EmailProps) {
    const {
        name,
        lastActiveTerm,
        expiresOn,
        daysUntilExpiry,
        renewalLink,
        expiryDetails,
        targetEmails
    } = EmailProps.parse(props);

    const previewText = `Reminder: ${name}, your WATcloud access expires on ${expiresOn} (in ${daysUntilExpiry} days)`;

    return (
        <WATcloudEmail previewText={previewText}>
            <Text>Hi {name},</Text>
            <Text>
                We wanted to remind you that your access to WATcloud will expire on
                <span style={{ fontWeight: "bold" }}> {expiresOn}</span> (in {daysUntilExpiry} days).
            </Text>
            <Text>
                Your last active term was <span style={{ fontWeight: "bold" }}> {lastActiveTerm}</span>. To renew your access, please update your selection for "Active Terms" at <Link href={renewalLink}>this link</Link>.
            </Text>

            <Text>
                On expiry, the following changes will be made:
            </Text>
            <Hr style={{ marginTop: "20px", marginBottom: "20px" }} />
            <Markdown markdownContainerStyles={{ color: "#333", fontSize: "14px", lineHeight: "24px" }}>{expiryDetails}</Markdown>
            <Hr style={{ marginTop: "20px", marginBottom: "20px" }} />

            <Text style={{ color: "#666", fontSize: "12px" }}>This email is intended for {targetEmails.join(" and ")}. If you have received this email in error, please contact us at <Link href="mailto:infra-outreach@watonomous.ca">infra-outreach@watonomous.ca</Link>.
            </Text>
        </WATcloudEmail>
    );
};

Email.PreviewProps = {
    name: "John Doe",
    lastActiveTerm: "2024 Fall (2024-09-01 to 2024-12-31)",
    expiresOn: "2025-01-31",
    daysUntilExpiry: 30,
    renewalLink: "https://example.com",
    expiryDetails: `
**WATcloud Compute Cluster**

Your access to the Compute Cluster will be disabled and the following data will be deleted:
- Home directory (shared between all machines): \`/home/johndoe\`
- Container directory (on each login node): \`/var/lib/cluster/users/1234\`

Data stored in shared directories such as \`/scratch\` and \`/mnt/wato-drive*\` under your account may be deleted in the future when we perform routine maintenance on the cluster.

**GitHub (WATonomous)**

Your role in the WATonomous GitHub organization will change from \`Owner\` to \`Member\`.

**Google Workspace (WATonomous)**

No changes will be made to your Google Workspace account. You will still have access to your email, calendar, and other Google Workspace services.

**Discord (WATonomous)**

The following roles will be removed from your Discord account on the WATonomous server:
- Core Member
- WATcloud Lead

The following roles will be added:
- Alumni
- Alumni Board Member

**Azure (WATonomous)**

Your Azure account will be deleted.
    `,
    targetEmails: ["john.doe@example.com", "john.doe2@example2.com"],
} as EmailProps;

export default Email;
