import {
    Heading,
    Hr,
    Img,
    Link,
    Markdown,
    Text
} from "@react-email/components";
import { z } from "zod";
import { getAsset, registerAsset, WATcloudURI } from "../utils/watcloud-uri";
import { WATcloudEmail } from "./_common/watcloud-email";

const WATcloudBlogUpdateEmailProps = z.object({
    path: z.string(),
    title: z.string(),
    author: z.string(),
    date: z.string(),
    abstract: z.string(),
    image: z.string(),
});

type WATcloudBlogUpdateEmailProps = z.infer<typeof WATcloudBlogUpdateEmailProps>;

export function init({ image }: WATcloudBlogUpdateEmailProps) {
    registerAsset(image, new WATcloudURI(image));
}

export function WATcloudBlogUpdateEmail(props: WATcloudBlogUpdateEmailProps) {
    const { path, title, author, date, abstract, image } = WATcloudBlogUpdateEmailProps.parse(props);

    if (process.env.NODE_ENV === "development") {
        init(props);
    }

    const previewText = `New WATcloud Blog Post: ${title}`;

    const link = `https://cloud.watonomous.ca/blog/${path}`;

    const imageSrc = getAsset(image).resolveFromCache();

    return (
        <WATcloudEmail previewText={previewText}>
            <Text>Hello! WATcloud has published a new blog post.</Text>
            <Hr style={{ marginTop: "20px", marginBottom: "20px" }} />
            <Img src={imageSrc} alt={title} height="200" />
            <Link href={link}>
                <Heading as="h2" style={{ marginBottom: 0 }}>{title}</Heading>
            </Link>
            <Text style={{ marginTop: 0 }}>
                By {author} on {date}
            </Text>
            <Markdown markdownContainerStyles={{ color: "#333", fontSize: "14px", lineHeight: "24px" }}>{abstract}</Markdown>
            <Link href={link}>Read more →</Link>
            <Hr style={{ marginTop: "20px", marginBottom: "20px" }} />
            <Text style={{ color: "#666", fontSize: "12px" }}>You are receiving this email because you are subscribed to the WATcloud blog.</Text>
        </WATcloudEmail>
    );
};

WATcloudBlogUpdateEmail.PreviewProps = {
    path: "what-is-watcloud",
    title: "Under the Hood: What is WATcloud?",
    author: "Ben Zhang",
    date: "Sunday, September 22, 2024",
    abstract: "Curious about how WATcloud makes computing resources easily and fairly accessible to everyone? Join us as we kick off a blog series exploring our four-year journey of refining our compute cluster's hardware and software—from servers and networking to user provisioning and observability systems.",
    image: "watcloud://v1/sha256:5cc9868176110e693921b642ef69b43ea1d6728c822d824bb405e1fc1631b345?name=under-the-hood-wide.png",
} as WATcloudBlogUpdateEmailProps;

export default WATcloudBlogUpdateEmail;
