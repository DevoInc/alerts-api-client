import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import ts from 'typescript';

const entryPoint = './src/index.ts';

const dependencies = Object.keys(pkg.dependencies || {});
const peerDependencies = Object.keys(pkg.peerDependencies || {});

const esOutputDir = `./dist/${pkg.module}`;
const cjsOutputDir = `./dist/${pkg.main}`;

export default {
    input: entryPoint,
    external: [...dependencies, ...peerDependencies],
    output: [
        {
            file: esOutputDir,
            format: 'es',
            sourcemap: true,
        },
        {
            file: cjsOutputDir,
            format: 'cjs',
            sourcemap: true,
        },
    ],
    plugins: [
        json(),
        resolve({
            browser: true,
        }),
        commonjs(),
        typescript({
            typescript: ts,
            tsconfig: 'tsconfig.json',
            tsconfigDefaults: {
                exclude: [
                    '**/*.spec.ts',
                    '**/*.test.ts',
                    'node_modules',
                    'dist',
                ],
                compilerOptions: {
                    sourceMap: true,
                    declaration: true,
                },
            },
        }),
        copy({
            targets: [
                { src: 'README.md', dest: 'dist' },
                {
                    src: 'package.json',
                    dest: 'dist',
                    transform: (content) => {
                        const { scripts, devDependencies, engines, ...keep } = JSON.parse(
                            content.toString()
                        );
                        return JSON.stringify(keep, null, 2);
                    },
                },
            ],
        }),
    ],
};
