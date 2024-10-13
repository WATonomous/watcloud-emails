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

// TODO: resolve this using the SDK
// watcloud://v1/sha256:393767e36d5387815c15d11c506c3c820de5db41723ffc062751673621dedb15?name=1024x512%20black%401x.png
const HEADER_IMAGE_URL = "https://rgw.watonomous.ca/asset-temp/393767e36d5387815c15d11c506c3c820de5db41723ffc062751673621dedb15"

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
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={{ backgroundColor: "#ffffff", margin: "auto", fontFamily: "sans-serif" }}>
                <Container style={{ border: "1px solid #eaeaea", borderRadius: "5px", margin: "40px auto", padding: "20px", maxWidth: "600px" }}>
                    <Img src={HEADER_IMAGE_URL} alt="WATcloud Logo" style={{ display: "block", margin: "0 auto" }} height="100" />
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
                    <Text style={{ color: "#000", fontSize: "14px", lineHeight: "24px", marginTop: "10px" }}>
                        WATcloud Onboarding Bot 🤖
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

WATcloudOnboardingEmail.PreviewProps = {
    name: "John Doe",
    services: ["Compute Cluster", "Discord", "Google Workspace"],
} as WATcloudOnboardingEmailProps;

export default WATcloudOnboardingEmail;