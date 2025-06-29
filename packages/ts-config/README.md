# @repo/ts-config

Shared TypeScript configuration for the WATcloud emails monorepo.

## Usage

In any package that needs TypeScript configuration, extend the appropriate config in your `tsconfig.json`:

```json
{
  "extends": "@repo/ts-config/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```
