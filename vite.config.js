/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
// Relative base on build emits relative asset URLs, so the published site works at
// any GitHub Pages subpath without hardcoding the repo name. Dev uses an absolute
// base so the root serves cleanly. HashRouter handles client routing either way.
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        base: command === 'build' ? './' : '/',
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/test/setup.ts',
            css: false,
        },
    });
});
