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
            <Head>
            <style>
                {`
                /*
                    CSS style block for dark mode
                    Dark mode requires the !important tag to override the default styles

                    This has not been tested in email clients, so it may break.

                    This works on Microsoft Edge but not Google Chrome, so may need to look for alternate methods?
                */
                    @media (prefers-color-scheme: dark) {
                        body, div {
                            background-color: #333 !important;
                            color: #ffffff !important;
                        }
                        code {
                            background-color: #c9c5c5 !important;
                        }

                        .email-container {
                            border: 1px solid #696969 !important;
                            border-radius: 5px;
                            margin: 40px auto;
                            padding: 20px; 
                            maxWidth: 600px;
                        }
                    }
                    
                    body, div {
                        background-color: #ffffff;
                        color: #333;
                        margin: auto;
                        font-family: sans-serif;
                    }

                    code {
                        background-color: #808080
                    }

                    .email-container {
                            border: 1px solid #eaeaea;
                            border-radius: 5px;
                            margin: 40px auto;
                            padding: 20px; 
                            max-width: 600px;
                    }
                    
                    /*
                        There probably is a way to integrate this into where the this button is actually used
                    */
                    .confirmation-button {
                        background-color: #007BFF;
                        color: #ffffff !important;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 18px;
                    }
                        
                    .confirmation-button:hover {
                        background-color: #0056b3;
                    }
                `}
            </style>
            </Head>
            <Preview>{previewText}</Preview>
            <Body>
                <Container className="email-container">
                    <Img src={getAsset('watcloud-logo').resolveFromCache()} alt="WATcloud Logo" style={{ display: "block", margin: "0 auto" }} height="100" />
                    {children}
                </Container>
            </Body>
        </Html>
    )
}
