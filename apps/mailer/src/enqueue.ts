import { Emails } from "@watonomous/watcloud-email-templates";
import { FissionContext, FissionCallback } from "./utils";
import { render } from "@react-email/components";
import { waitForAssets } from "@repo/utils/watcloud-uri";

// Returns the email template with the given name and performs any necessary initialization.
async function getTemplate(template_name: string, props_array: any[] = []) {
    const mod = Emails[template_name];
    if (!mod) {
        throw new Error(`Template ${template_name} not found`);
    }
    if (mod.init) {
        await Promise.all(props_array.map(mod.init));
    }
    await waitForAssets();

    return mod.default;
}

module.exports = async function ({ request, response }: FissionContext, cb: FissionCallback) {
    if (request.method !== "POST") {
        response.status(405).json({
            error: "Only POST is supported",
        });
        return;
    }

    const template_name = request.body?.template;
    if (!template_name) {
        response.status(400).json({
            error: "Missing template! Supported templates: " + Object.keys(Emails).join(", "),
        });
        return;
    }

    const props = request.body?.props;
    if (!props) {
        response.status(400).json({
            error: "Missing props",
        });
        return;
    }

    if (!Emails[template_name]) {
        response.status(400).json({
            error: `Template "${template_name}" not found! Supported templates: ${Object.keys(Emails).join(",")}`,
        });
        return;
    }

    const template = await getTemplate(template_name, [props]);

    const htmlPromise = render(template(props));
    const textPromise = render(template(props), { plainText: true });

    try {
        const payload = {
            html: await htmlPromise,
            text: await textPromise,
        };
    
        response.status(200).json(payload);
    } catch (e) {
        console.error(e);
        response.status(500).json({
            error: "Failed to render email: " + e,
        });
        return;
    }
}