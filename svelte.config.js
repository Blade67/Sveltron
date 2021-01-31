const autoPreprocess = require('svelte-preprocess');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
    compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
    },
    // Setup the preproccess for svelte, and tell it to use postcss
    preprocess: autoPreprocess({
        postcss: require('./postcss.config.js'),
        defaults: { style: 'postcss' },
    }),
};
