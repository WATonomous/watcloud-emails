import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text
} from "@react-email/components";
import dedent from "dedent-js";
import { z } from "zod";
import { WATcloudEmail } from "./_common/watcloud-email";

const WATcloudOnboardingEmailProps = z.object({
    name: z.string(),
    services: z.array(z.string()),
});

type WATcloudOnboardingEmailProps = z.infer<typeof WATcloudOnboardingEmailProps>;

export const WATcloudOnboardingEmail = (props: WATcloudOnboardingEmailProps) => {
    const { name, services } = WATcloudOnboardingEmailProps.parse(props);

    const previewText = `Welcome to WATcloud! Your access has been updated.`;
    const accessInstructions = (
        <ul style={{ color: "#000", fontSize: "14px", lineHeight: "24px" }}>
            {services?.map((service) => (
                <li key={service}>{service}</li>
            ))}
        </ul>
    )

    return (
        <WATcloudEmail previewText={previewText}>
            <Text style={{ color: "#000", fontSize: "14px", lineHeight: "24px" }}>
                Hi {name},
            </Text>
            <Text style={{ color: "#000", fontSize: "14px", lineHeight: "24px", marginTop: "10px" }}>
                Welcome to WATcloud, WATonomous's compute cluster and infrastructure. We are excited to have you on board!
            </Text>
            <Text style={{ color: "#000", fontSize: "14px", lineHeight: "24px", marginTop: "10px" }}>
                This email confirms that your access to WATcloud has been successfully updated.
            </Text>
            <Section style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Text style={{ color: "#000", fontSize: "14px", lineHeight: "24px" }}>
                    Here's a list of services that you have access to:
                </Text>
                {accessInstructions}
                <Text style={{ color: "#000", fontSize: "14px", lineHeight: "24px", marginTop: "10px" }}>
                    Access instructions for each service can be found in the <Link href="https://cloud.watonomous.ca/docs/services" style={{ color: "#1e90ff", textDecoration: "none" }}>Services</Link> documentation.
                </Text>
            </Section>
            <Text style={{ color: "#000", fontSize: "14px", lineHeight: "24px", marginTop: "10px" }}>
                If you have any questions, please reach out to your <Link href="https://cloud.watonomous.ca/docs/services#watcloud-contact" style={{ color: "#1e90ff", textDecoration: "none" }}>WATcloud contact</Link> or the WATcloud team at <Link href={`mailto:infra-outreach@watonomous.ca`} style={{ color: "#1e90ff", textDecoration: "none" }}>infra-outreach@watonomous.ca</Link>.
            </Text>
            <Text style={{ color: "#000", fontSize: "14px", lineHeight: "24px", marginTop: "20px" }}>
                Vroom vroom,
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
} as WATcloudOnboardingEmailProps;

export default WATcloudOnboardingEmail;