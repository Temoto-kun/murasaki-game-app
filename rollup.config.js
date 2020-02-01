import dotenv from 'dotenv'

import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import devServer from 'rollup-plugin-dev-server'
import livereload from 'rollup-plugin-livereload'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeGlobals from 'rollup-plugin-node-globals'
import nodeBuiltins from 'rollup-plugin-node-builtins'
import replace from '@rollup/plugin-replace'
import { terser, } from 'rollup-plugin-terser'

import pkg from './package.json'

const REACT_APP_VARIABLE_PREFIX = 'REACT_APP_'

const prepareEnvVariablesForReplace = variables => (
	Object
		.entries(variables)
		.filter(([key, ]) => key.startsWith(REACT_APP_VARIABLE_PREFIX))
		.reduce(
			(theVariables, [key, value, ]) => ({
				...theVariables,
				[`process.env.${key}`]: JSON.stringify(value),
			}),
			{}
		)
)

const { parsed: DOTENV_CONFIG } = dotenv.config()

const REPLACE_ENV_VARIABLES = prepareEnvVariablesForReplace(DOTENV_CONFIG)

const reactExports = [
	'createElement',
	'cloneElement',
	'createContext',
	'Children',
	'Component',
	'PureComponent',
	'Fragment',
	'useContext',
	'useReducer',
	'useEffect',
	'useRef',
	'useState',
	'useCallback',
	'useMemo',
	'useLayoutEffect',
	'forwardRef',
	'isValidElement',
	'Suspense',
	'lazy',
	'useDebugValue',
]

const propTypeExports = [
	'array',
	'bool',
	'func',
	'number',
	'object',
	'string',
	'symbol',
	'any',
	'arrayOf',
	'element',
	'elementType',
	'instanceOf',
	'node',
	'objectOf',
	'oneOf',
	'oneOfType',
	'shape',
	'exact',
]

let config

switch (process.env.CONTEXT) {
	case 'browser-dev':
		config = {
			input: './src/index.mjs',
			output: {
				dir: pkg.browser,
				type: 'iife',
			},
			plugins: [
				replace({
					...REPLACE_ENV_VARIABLES,
					'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
					'process.env.CONTEXT': JSON.stringify(process.env.CONTEXT),
				}),
				babel({
					exclude: 'node_modules/**',
					runtimeHelpers: true,
				}),
				nodeResolve(),
				commonjs({
					include: /node_modules/,
					namedExports: {
						'react': reactExports,
						'../../node_modules/react-dom/index.js': [
							'unstable_batchedUpdates',
						],
						'../../node_modules/react-is/index.js': [
							'isElement',
							'isValidElementType',
							'isContextConsumer',
							'ForwardRef',
						],
						'../../node_modules/react/index.js': reactExports,
						'../../node_modules/prop-types/index.js': propTypeExports,
					},
				}),
				nodeBuiltins(),
				nodeGlobals(),
				devServer({
					contentBase: ['.cache', 'public'],
					allowCrossOrigin: true,
					port: process.env.PORT || 3000,
					historyApiFallback: true,
				}),
				livereload({
					watch: ['.cache', 'public', 'src'],
				}),
			],
		}
		break
	default:
	case 'external':
		config = []
		config.push({
			input: './src/index.mjs',
			output: {
				dir: pkg.module,
				type: 'esm',
			},
			plugins: [
				replace({
					...REPLACE_ENV_VARIABLES,
					'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
					'process.env.CONTEXT': JSON.stringify(process.env.CONTEXT),
				}),
				peerDepsExternal({
					includeDependencies: true,
				}),
				babel({
					ignore: ['node_modules/**'],
					runtimeHelpers: true,
				}),
				commonjs(),
				terser(),
			],
		})

		config.push({
			input: './src/index.mjs',
			output: {
				dir: pkg.main,
				type: 'cjs',
			},
			plugins: [
				replace({
					...REPLACE_ENV_VARIABLES,
					'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
					'process.env.CONTEXT': JSON.stringify(process.env.CONTEXT),
				}),
				peerDepsExternal({
					includeDependencies: true,
				}),
				babel({
					ignore: ['node_modules/**'],
					runtimeHelpers: true,
				}),
				commonjs(),
				terser(),
			],
		})
		break
}

export default config
