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
					label: 'About Cosmo',
					items: [
						{ label: 'What is it?', slug: 'about/what-is-cosmo' },
						{ label: 'Compiler', slug: 'about/compiler' },
						{ label: "What about...", slug: 'about/what-about' }
					]
				},
				{
					label: 'Components',
					items: [
						{ label: 'Full List', slug: 'guides/components'},
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
			customCss: [
				'./src/styles/index.css'
			]
		}),
	],
});
