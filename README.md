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

## Releasing

Releases are manually created from the [Releases page](https://github.com/WATonomous/watcloud-emails/releases).
CI will automatically build the tarball and publish it to the release page.
Release notes can be auto-generated via the web interface.

Please follow [semantic versioning](https://semver.org/) when creating tags for releases.
Tags should be prefixed with `v` (e.g. `v1.0.0`).
Version numbers less than `1.0.0` should be considered unstable and may have breaking changes in minor versions.
