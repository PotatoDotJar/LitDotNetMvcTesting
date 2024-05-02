import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        outDir: '../wwwroot/client-components',
        emptyOutDir: true,
        lib: {
            entry: 'src/main.ts',
            name: 'MyLib',
            fileName: 'my-lib'
        }
    }
});