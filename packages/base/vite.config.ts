import { defineConfig } from 'vite';


export default defineConfig({
    build: {
        target: 'ES2020',
        lib: {
            entry: 'src/index.ts',
            name: 'wcf-base',
            fileName: 'index'
        }
    }
})