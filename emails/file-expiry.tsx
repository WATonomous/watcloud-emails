import {
    Hr,
    Link,
    Section,
    Text
} from "@react-email/components";
import { z } from "zod";
import { Email } from "./_common/watcloud-email";

const EmailProps = z.object({
    name: z.string(),
    paths: z.array(z.string()),
    daysForExpiry: z.string(),
    deletionDate: z.string()
});

type EmailProps = z.infer<typeof EmailProps>;

export const FileExpiryEmail = (props: EmailProps) => {
    const { name, paths, daysForExpiry, deletionDate} = EmailProps.parse(props);

    const previewText = `You have expired files in the WATO drives`;
    const mapPathToMachine = (): Record<string, string[]> => {
        const pathMap: Record<string, string[]> = {};  

        paths.forEach((path: string) => {
            const index = path.indexOf(":");
            let machine = "";
            let filepath = "";

            if (index < 0) {
                machine = "Shared storage across machines - Access on any machine";
                filepath = path;
            } else {
                [machine, filepath] = path.split(":", 2);
            }

            // Initialize array for machine if it doesn't exist, then push the filepath
            if (!pathMap[machine]) {
                pathMap[machine] = [];
            }
            pathMap[machine].push(filepath);
        });

        return pathMap;  // Return the pathMap object
    };

    const pathMap = mapPathToMachine();
    
    const expiredPaths = (
        <div>
            {Object.keys(pathMap).map((machine) => (
                <div key={machine}>
                    <ul key={machine} style={{ fontSize: "14px", lineHeight: "24px" }}>
                        <li>{machine}</li>
                        <ul>
                            {pathMap[machine]?.map((path, pathIndex) => (
                                <li key={pathIndex}>{path}</li>
                            ))}
                        </ul>
                    </ul>
                </div>
            ))}
        </div>
    );

    return (
        <Email previewText={previewText}>
            <Text>Hi {name},</Text>
            <Text>
                In an ongoing effort to keep WATcloud's file storage efficient and maintain optimal performance, we routinely clean up specific directories that haven't been accessed in the past {daysForExpiry} days.            </Text>
            <Hr />
            <Section>
                <Text>The following paths on each respective machine are expired:</Text>
                {expiredPaths}
            </Section>
            <Hr />
            <Text style={{ fontWeight: 'bold' }}>
                If you do not access files in any of these directories, then they will be automatically deleted on {deletionDate}.            </Text>
            <Text>
                If you have any questions, please reach out to your <Link href="https://cloud.watonomous.ca/docs/services#watcloud-contact" style={{ color: "#1e90ff", textDecoration: "none" }}>WATcloud contact</Link> or the WATcloud team at <Link href={`mailto:infra-outreach@watonomous.ca`} style={{ color: "#1e90ff", textDecoration: "none" }}>infra-outreach@watonomous.ca</Link>.
            </Text>
        </Email>
    );
};

FileExpiryEmail.PreviewProps = {
    name: "John Doe",
    paths: ["delta-ubuntu2:/var/lib/cluster/users/1234/docker", "tr-ubuntu3:/var/lib/cluster/users/1234/containers", "delta-ubuntu2:/var/lib/cluster/users/1234/containers", "/mnt/wato-drive2/someuser", "/mnt/wato-drive2/other"],
    daysForExpiry: "70", 
    deletionDate: "2025-01-01"
} as EmailProps;

export default FileExpiryEmail;