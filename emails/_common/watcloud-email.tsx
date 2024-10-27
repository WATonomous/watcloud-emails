import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Preview
} from "@react-email/components";
import { getAsset, registerAsset, WATcloudURI } from "../../utils/watcloud-uri";

registerAsset('watcloud-logo', new WATcloudURI("watcloud://v1/sha256:393767e36d5387815c15d11c506c3c820de5db41723ffc062751673621dedb15?name=1024x512%20black%401x.png"))

// Wrapper for WATcloud-themed emails
export function WATcloudEmail({
    previewText,
    children,
}: {
    previewText: string,
    children: React.ReactNode
}) {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={{ backgroundColor: "#ffffff", color: "#333", margin: "auto", fontFamily: "sans-serif" }}>
                <Container style={{ border: "1px solid #eaeaea", borderRadius: "5px", margin: "40px auto", padding: "20px", maxWidth: "600px" }}>
                    <Img src={getAsset('watcloud-logo').resolveFromCache()} alt="WATcloud Logo" style={{ display: "block", margin: "0 auto" }} height="100" />
                    {children}
                </Container>
            </Body>
        </Html>
    )
}
