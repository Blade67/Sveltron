import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sass from 'node-sass';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/App.js',
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css');
			},
			preprocess: {
				style: async ({ content, attributes }) => {
					if (attributes.type !== 'text/scss' && attributes.lang !== 'scss') return;

					return new Promise((resolve, reject) => {
						sass.render({
							data: content,
							includePaths: ['src'],
							sourceMap: false,
							outFile: 'x' // this is necessary, but is ignored
						}, (err, result) => {
							if (err) return reject(err);

							resolve({
								code: result.css.toString(),
								map: result.map ? result.map.toString() : ""
							});
						});
					});
				}
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
