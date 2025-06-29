# @repo/utils

Shared utilities for working with email templates in the WATcloud ecosystem.

## Features

- Common validation functions
- Email template helpers
- Shared types and interfaces
- Utility functions for email rendering

## Usage

Add the project as a dependency in your `package.json`:

```json
{
    "dependencies": {
        "@repo/utils": "*"
    }
}
```

Import the utilities in your code:

```typescript
import { validateEmail } from '@repo/utils';

// Example usage
const isValid = validateEmail('user@example.com');
```

## Development

This package is built as part of the monorepo build process. To develop locally:

1. Make your changes in the source files
2. Run tests:
   ```sh
   npm test
   ```
3. The package will be built automatically when running `npm run build` from the root
