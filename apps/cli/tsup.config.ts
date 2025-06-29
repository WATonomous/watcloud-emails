import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
    entry: ['src/index.ts'],
    format: ['cjs'],
    // Don't need QoL features when building the final bundle
    dts: Boolean(options.watch),
    sourcemap: Boolean(options.watch),
    minify: !options.watch,
    // Include all dependencies in the final bundle
    noExternal: options.watch ? [] : [ /.*/ ],
    // Clean the output directory before building when building the final bundle
    clean: !options.watch,
}));
