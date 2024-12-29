// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Cosmo',
			social: {
				github: 'https://github.com/bycosmo/cosmo',
			},
			sidebar: [
				{
					label: 'Components',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Base', slug: 'guides/base' },
						{ label: 'Helmet', slug: 'guides/helmet' },
						{ label: 'Router', slug: 'guides/router' }
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
