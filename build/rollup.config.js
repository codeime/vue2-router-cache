import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import esbuild from 'rollup-plugin-esbuild'
export default {
    input: 'src/main.js', // Path relative to package.json
    output: {
        name: 'routerCache',
        exports: 'named',
    },
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        esbuild({
            // All options are optional
            include: /\.[jt]sx?$/, // default, inferred from `loaders` option
            exclude: /node_modules/, // default
            sourceMap: false, // default
            minify: process.env.NODE_ENV === 'production',
            target: 'es2015', // default, or 'es20XX', 'esnext'
            jsx: 'transform', // default, or 'preserve'
            //  jsxFactory: 'React.createElement',
            //jsxFragment: 'React.Fragment',
            // Like @rollup/plugin-replace
            define: {
                __VERSION__: '"x.y.z"',
            },
            //  tsconfig: 'tsconfig.json', // default
            // Add extra loaders
            loaders: {
                // Add .json files support
                // require @rollup/plugin-commonjs
                // '.json': 'json',
                // Enable JSX in .js files too
                // '.js': 'jsx',
            },
        })
    ],
};