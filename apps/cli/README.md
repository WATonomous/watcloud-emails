# @watonomous/watcloud-email-cli

Command line interface for working with WATcloud email templates.

## Development

### Getting Started

1. From the root of the monorepo, install dependencies:
   ```sh
   npm ci
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

### Building

To build the CLI:

```sh
# From the root of the monorepo
npm run build
```

## Usage

After installation (see below) you can run:

```sh
watcloud-emails --help
```

This shows all available commands and options.

### Running Locally During Development

After building the CLI you can run it directly:

```sh
node dist/index.js --help
```

## Installation

### Using a Specific Version

1. Find a version from the [releases](https://github.com/WATonomous/watcloud-emails/releases) page (e.g. `0.0.2`).
2. Run the following command:
   ```sh
   VERSION=<version>
   npx https://github.com/WATonomous/watcloud-emails/releases/download/v${VERSION}/watonomous-watcloud-email-cli-${VERSION}.tgz --help
   ```

### Installing from a CI artifact

You can also download the latest artifacts from the CI builds and install them manually in the same way.

## Contributing

1. Make your changes in the source files
2. Run tests to ensure everything works
3. Submit a pull request
