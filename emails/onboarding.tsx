import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text
} from "@react-email/components";
import dedent from "dedent-js";
import * as React from "react";
import { z } from "zod";

const WATcloudOnboardingEmailProps = z.object({
    name: z.string(),
    services: z.array(z.string()),
});

type WATcloudOnboardingEmailProps = z.infer<typeof WATcloudOnboardingEmailProps>;

export const WATcloudOnboardingEmail = (props: WATcloudOnboardingEmailProps) => {
    const { name, services } = WATcloudOnboardingEmailProps.parse(props);

    const previewText = `Welcome to WATcloud!`;
    const accessInstructions = (
        <ul className="text-black text-[14px] leading-[24px]">
            {services?.map((service) => (
                <li key={service}>{service}</li>
            ))}
        </ul>
    )

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]">
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[20px] mx-0">
                            Welcome to WATcloud!
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {name},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px] mt-[10px]">
                            Welcome to WATcloud, WATonomous's compute cluster and infrastructure. We are excited to have you on board!
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px] mt-[10px]">
                            This email confirms that your access to WATcloud has been successfully updated.
                        </Text>
                        <Section className="mt-[20px] mb-[20px]">
                            <Text className="text-black text-[14px] leading-[24px]">
                                Here's a list of services that you have access to:
                            </Text>
                            {accessInstructions}
                            <Text className="text-black text-[14px] leading-[24px] mt-[10px]">
                                Access instructions for each service can be found in the{" "}
                                <Link href="https://cloud.watonomous.ca/docs/services" className="text-blue-600 no-underline">
                                    Services
                                </Link>{" "}
                                documentation.
                            </Text>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px] mt-[10px]">
                            If you have any questions, please reach out to your{" "}
                            <Link href="https://cloud.watonomous.ca/docs/services#watcloud-contact" className="text-blue-600 no-underline">
                            WATcloud contact
                            </Link>
                            {" "}or the WATcloud team at{" "}
                            <Link href={`mailto:infra-outreach@watonomous.ca`} className="text-blue-600 no-underline">
                                infra-outreach@watonomous.ca
                            </Link>.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px] mt-[20px]">
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
                        <Text className="text-black text-[14px] leading-[24px] mt-[10px]">
                            WATcloud Onboarding Bot 🤖
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

WATcloudOnboardingEmail.PreviewProps = {
    name: "John Doe",
    services: ["Compute Cluster", "Discord", "Google Workspace"],
} as WATcloudOnboardingEmailProps;

export default WATcloudOnboardingEmail;
