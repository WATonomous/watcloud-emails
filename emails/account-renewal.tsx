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
    expiryLink: z.string(),
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
        expiryLink,
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
                You may receive additional reminders as the expiry date approaches.
                If you would like to revoke your access earlier, please submit <Link href={expiryLink}>this prepopulated form</Link>.
            </Text>

            <Text>
                On expiry, your services will be affected as follows:
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
    renewalLink: "https://example.com/renew",
    expiryLink: "https://example.com/expire",
    expiryDetails: `
**Azure (WATonomous)**

Your access to the Azure organization will be removed.


**Compute Cluster**

Your access to the compute cluster will be disabled and the following data will be deleted:
- Home directory (shared between all machines): \`/home/johndoe\`
- Container directory (on each login node): \`/var/lib/cluster/users/1234\`

Data stored in shared directories such as \`/scratch\` and \`/mnt/wato-drive*\` under your account may be deleted in the future when we perform routine maintenance on the cluster.


**Discord (WATonomous)**

The following roles will be removed from your Discord account on the WATonomous server:
- Core Member
- WATcloud
- Admin

The following roles will be added:
- Alumni


**GitHub (WATonomous)**

Your access to the GitHub organization will be removed.


**Google Workspace (WATonomous)**

No changes will be made to your Google Workspace account. You will still have access to your email, calendar, and other Google Workspace services.


**Grafana (WATonomous)**

Your access to the Grafana instance will be removed.


**WATcloud Internal Tools**

Your access to WATcloud internal tools will be disabled.


**Sentry (WATonomous)**

Your access to the Sentry organization will be removed.


**WATcloud Public Profile**

No changes will be made to your WATcloud public profile.
    `,
    targetEmails: ["john.doe@example.com", "john.doe2@example2.com"],
} as EmailProps;

export default Email;
