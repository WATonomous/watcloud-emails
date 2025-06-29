import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
    entry: ['src'],
    format: ['cjs'],
    // Don't need QoL features when building the final bundle
    dts: Boolean(options.watch),
    sourcemap: Boolean(options.watch),
    minify: !options.watch,
    // Include all dependencies
    noExternal: [ /.*/ ],
    // Clean the output directory before building when building the final bundle
    clean: !options.watch,
}));
