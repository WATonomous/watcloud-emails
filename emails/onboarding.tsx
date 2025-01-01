import {
    Heading,
    Hr,
    Link,
    Section,
    Text
} from "@react-email/components";
import dedent from "dedent-js";
import { z } from "zod";
import { WATcloudEmail } from "./_common/watcloud-email";

const WATcloudOnboardingEmailProps = z.object({
    name: z.string(),
    services: z.array(z.string()),
    activeTerms: z.array(z.string()),
});

type WATcloudOnboardingEmailProps = z.infer<typeof WATcloudOnboardingEmailProps>;

export const WATcloudOnboardingEmail = (props: WATcloudOnboardingEmailProps) => {
    const { name, services } = WATcloudOnboardingEmailProps.parse(props);

    const previewText = `Your WATcloud access has been granted/updated!`;
    const accessInstructions = (
        <ul style={{ fontSize: "14px", lineHeight: "24px" }}>
            {services?.map((service) => (
                <li key={service}>{service}</li>
            ))}
        </ul>
    )

    return (
        <WATcloudEmail previewText={previewText}>
            <Text>Hi {name},</Text>
            <Text>
                Welcome to WATcloud, WATonomous's compute cluster and infrastructure!
            </Text>
            <Text>
                You are receiving this email because you have been granted access to WATcloud, or your existing access has been updated.
            </Text>
            <Section>
                <Heading as="h3">Your Access Details</Heading>
                <Text>
                    Our records indicate that you are, or have been, active during the following term(s):
                </Text>
                <ul style={{ fontSize: "14px", lineHeight: "24px" }}>
                    {props.activeTerms?.map((term) => (
                        <li key={term}>{term}</li>
                    ))}
                </ul>
            </Section>
            <Section>
                <Heading as="h3">Services You Have Access To</Heading>
                <Text>
                    You now have access to the following services:
                </Text>
                {accessInstructions}
                <Text>
                    If you are an alumnus, you may retain access to some services beyond the active terms.
                </Text>
            </Section>
            <Section>
                <Heading as="h3">Getting Started</Heading>
                <Text>
                    Access instructions for each service are available in the <Link href="https://cloud.watonomous.ca/docs/services" style={{ color: "#1e90ff", textDecoration: "none" }}>Services Documentation</Link>.
                </Text>
            </Section>
            <Section>
                <Heading as="h3">Questions or Assistance?</Heading>
                <Text>
                    If you have any questions or need assistance, feel free to reach out to your <Link href="https://cloud.watonomous.ca/docs/services#watcloud-contact" style={{ color: "#1e90ff", textDecoration: "none" }}>WATcloud contact</Link> or email the WATcloud team at <Link href={`mailto:infra-outreach@watonomous.ca`} style={{ color: "#1e90ff", textDecoration: "none" }}>infra-outreach@watonomous.ca</Link>.
                </Text>
            </Section>
            <Text>
                Vroom vroom!
            </Text>
            <pre style={{ fontFamily: "Courier New, monospace" }}>
                {dedent(String.raw`
                        _∩_
                      __|_|_
                     /|__|__\____
                    |            |
                    ${"`"}.(o)-----(o).'
                `)}
            </pre>
            <Text>WATcloud Onboarding Bot 🤖</Text>
        </WATcloudEmail>
    );
};

WATcloudOnboardingEmail.PreviewProps = {
    name: "John Doe",
    services: ["Compute Cluster", "Discord", "Google Workspace"],
    activeTerms: [
        "2024 Fall (2024-09-01 to 2024-12-31)",
        "2025 Winter (2025-01-01 to 2025-04-30)"
    ],
} as WATcloudOnboardingEmailProps;

export default WATcloudOnboardingEmail;