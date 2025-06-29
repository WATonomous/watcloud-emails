import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: true,
    sourcemap: true,
    minify: !options.watch,
    // Include internal dependencies in the bundle
    noExternal: [
        /@repo\/.*/,
        /@watonomous\/watcloud-email-.*/,
    ],
}));
