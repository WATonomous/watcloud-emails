# watcloud-emails

A collection of email templates used by [WATcloud](https://cloud.watonomous.ca/).

## Getting started

1. Find a version from the [releases](https://github.com/WATonomous/watcloud-emails/releases) page (e.g. `0.0.2`).
2. Run the following command
    ```sh
    VERSION=<version>
    npx https://github.com/WATonomous/watcloud-emails/releases/download/v${VERSION}/watonomous-watcloud-emails-${VERSION}.tgz --help
    ```

## Development

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000) with your browser to see email previews.

Run the following to use the CLI:

```sh
node ./dist/cli/index.js
```
