import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

export default {
	input: 'src/index.ts',
	plugins: [
		json(),
		typescript({
			tsconfig: './tsconfig.json'
		})
	],
	output: [
		{
			format: 'umd',
			name: 'BlobDownloader',
			file: 'build/BlobDownloader.js',
			sourceMap: true,
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/BlobDownloader.module.js',
			sourceMap: true,
			indent: '\t'
		}
	]
};
