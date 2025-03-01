import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';

const entryPoints = [
    { entry: 'index', formats: ['cjs', 'es'] },
    { entry: 'process', formats: ['cjs', 'es'] },
    { entry: 's-image', formats: ['iife'],
        extraPlugins: [
            svelte({
                compilerOptions: {
                    customElement: true,
                },
            }),
            resolve(),
        ]
    }
];

export default [
    ...entryPoints.map((entryPoint) => ({
        input: `src/${entryPoint.entry}.ts`,
        output: entryPoint.formats.map((format) => ({
            file: `dist/${entryPoint.entry}.${format == 'es' ? 'es.js' : 'js'}`,
            format,
        })),
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [
            typescript({
                typescript: require('typescript'),
            }),
            ...(entryPoint.extraPlugins || [])
        ],
    }))
];