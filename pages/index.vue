<template lang="html">
	<div :id="attr.page" v-if="loaded">
		<calendar />
	</div>
</template>

<script>
	export default {
		components: {
			Calendar: () => import('~/components/landing/Calendar')
		},
		data: () => ({
			loaded: false
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		}
	}
</script>

<style lang="stylus" module="attr">
	#page
		position: relative
		height: 100vh
		background-color: var(--theme_white_v2)
	/**
	 * 1024px - 280px */
	@media (max-width: 1024px) and (min-width: 280px)
		#page
			height: 100%
</style>
