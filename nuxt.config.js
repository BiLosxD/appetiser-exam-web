export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'exam-web',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [{
				charset: 'utf-8'
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: ''
			},
			{
				name: 'format-detection',
				content: 'telephone=no'
			}
		],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}]
	},

	loading: {
		color: '#02afa0',
		throttle: 0,
		height: '2px'
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{
			src: '~/plugins/vee-validate',
			ssr: false
		},
		{
			src: '~/plugins/vue-ctk-date-time-picker',
			ssr: false
		},
		{
			src: '~/plugins/vue-line-clamp',
			ssr: false
		},
		{
			src: '~/plugins/vue-moment'
		},
		{
			src: '~/plugins/mixins'
		}
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: [
		'~components/global',
		'~components/templates'
	],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxtjs/google-fonts',
		'@nuxtjs/dotenv'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios'
	],

	googleFonts: {
		preconnect: true,
		prefetch: true,
		families: {
			'Ubuntu': [400, 500, 700]
		},
		display: 'swap',
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: ["vee-validate/dist/rules"],
		loaders: {
			cssModules: {
				modules: {
					localIdentName: "[hash:base64:12]",
				}
			}
		},
		/*
		 ** You can extend webpack config here
		 */
		extend(config, {
			isDev,
			isClient
		}) {
			config.module.rules.forEach(rule => {
				if (String(rule.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
					// add a second loader when loading images
					rule.use.push({
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [
									// use these settings for internet explorer for proper scalable SVGs
									// https://css-tricks.com/scale-svg/
									{
										removeViewBox: false
									},
									{
										removeDimensions: true
									}
								]
							}
						}
					})
				}
			})
		}
	},

	serverMiddleware: [
		(req, res, next) => {
			if (/\/{2,}/.test(req.url)) {
				const url = req.url.replace(/\/{2,}/g, '/')
				res.writeHead(301, {
					'Location': url
				})
				return res.end()
			}
			next()
		}
	]
}
