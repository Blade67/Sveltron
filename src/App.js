import App from './App.svelte';
import { VERSION } from 'svelte/compiler';

const app = new App({
    target: document.body,
    props: {
        version: VERSION,
    },
});

export default app;
