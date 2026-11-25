import {
    Hr,
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
    exampleTerms: z.array(z.string()),
    hasComputeAccess: z.boolean(),
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
        exampleTerms,
        hasComputeAccess,
        renewalLink,
        expiryLink,
        expiryDetails,
        targetEmails
    } = EmailProps.parse(props);

    const previewText = `${name}, confirm your WATcloud access by ${expiresOn}`;

    return (
        <WATcloudEmail previewText={previewText}>
            <Text>Hi {name},</Text>
            <Text>
                WATcloud ties access to the terms you're active with a WATcloud-supported team.
                Until now we haven't enforced this, so many accounts have stayed open long after their last active term.
                We're now cleaning these up.
            </Text>
            <Text>
                Our records show your last active term as <span style={{ fontWeight: "bold" }}>{lastActiveTerm}</span>.
                If we don't hear from you, your access will expire on <span style={{ fontWeight: "bold" }}>{expiresOn}</span>.
            </Text>
            <Text>
                <span style={{ fontWeight: "bold" }}>If you're still active:</span> submit <Link href={renewalLink}>this form</Link>, which is already filled in with your current details.
                Under "General" {">"} "Active Terms", add the terms you're active{exampleTerms.length > 0 ? `, for example ${exampleTerms.join(" and ")}` : ""}.
                That's all you need to do. You'll get a reminder before each future expiry.
            </Text>
            <Text>
                <span style={{ fontWeight: "bold" }}>If you've moved on:</span> you don't need to do anything.
                If you'd like to release your access now and stop getting these emails, submit <Link href={expiryLink}>this prefilled form</Link>.
            </Text>
            {hasComputeAccess && (
                <Text>
                    <span style={{ fontWeight: "bold" }}>Before {expiresOn}, copy anything you want to keep off the cluster.</span> On expiry your home directory is deleted and can't be recovered.
                </Text>
            )}
            <Text>Here is what will change for your account:</Text>
            <Hr style={{ marginTop: "20px", marginBottom: "20px" }} />
            <Markdown markdownContainerStyles={{ color: "#333", fontSize: "14px", lineHeight: "24px" }}>{expiryDetails}</Markdown>
            <Hr style={{ marginTop: "20px", marginBottom: "20px" }} />
            <Text>
                If you think this email is a mistake, or you have questions, reply to this email or contact us at <Link href="mailto:infra-outreach@watonomous.ca">infra-outreach@watonomous.ca</Link>.
            </Text>
            <Text>
                Thanks,<br />
                WATcloud Team
            </Text>

            <Text style={{ color: "#666", fontSize: "12px" }}>This email is intended for {targetEmails.join(" and ")}. If you have received this email in error, please contact us at <Link href="mailto:infra-outreach@watonomous.ca">infra-outreach@watonomous.ca</Link>.
            </Text>
        </WATcloudEmail>
    );
};

Email.PreviewProps = {
    name: "John Doe",
    lastActiveTerm: "2024 Fall (2024-09-01 to 2024-12-31)",
    expiresOn: "Tuesday, December 15, 2026",
    exampleTerms: ["2026 Fall", "2027 Winter"],
    hasComputeAccess: true,
    renewalLink: "https://example.com/renew",
    expiryLink: "https://example.com/expire",
    expiryDetails: `
**Compute Cluster**

Your access to the compute cluster will be disabled and the following data will be deleted:
- Home directory (shared between all machines): \`/home/johndoe\`
- Container directory (on each login node): \`/var/lib/cluster/users/1234\`

Data stored in shared directories such as \`/scratch\` and \`/mnt/wato-drive*\` under your account may be deleted in the future when we perform routine maintenance on the cluster.


**Discord (WATonomous)**

The following roles will be removed from your Discord account on the WATonomous server:
- Core Member

The following roles will be added:
- Alumni


**GitHub (WATonomous)**

Your access to the GitHub organization will be removed.


**Google Workspace (WATonomous)**

No changes will be made to your Google Workspace account. You will still have access to your email, calendar, and other Google Workspace services.
    `,
    targetEmails: ["john.doe@example.com"],
} as EmailProps;

export default Email;
