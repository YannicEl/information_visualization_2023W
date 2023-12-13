import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Vue(),
		UnoCSS(),
		Components({ dts: 'src/components.d.ts', dirs: ['src/composables/*', 'src/utils/*'] }),
		AutoImport({
			imports: ['vue', '@vueuse/core'],
			dts: 'src/auto-imports.d.ts',
			vueTemplate: true,
		}),
	],
});
