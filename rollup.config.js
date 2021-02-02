import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/App.js',
    output: {
        sourcemap: false,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js',
    },
    plugins: [
        svelte(require('./svelte.config.js')),

        css({ output: 'bundle.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration —
        // consult the documentation for details:
        // https://www.npmjs.com/package/rollup-plugin-commonjs
        resolve(),
        commonjs(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};
