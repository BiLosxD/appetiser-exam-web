<template lang="html">
	<div :id="attr.toast">
		<div :class="[ attr.wrapper, attr[getItem.type] ]">
			<p :class="attr.p">{{ getItem.text }}</p>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		computed: {
			...mapGetters({
				getItem: 'global/modal/getItem'
			})
		},
		mounted () {
			setTimeout(() => {
				this.toggleModalStatus({ type: 'toast', status: false })
			}, 2000)
		}
	}
</script>

<style lang="stylus" module="attr">
	#toast
		position: fixed
		top: 20px
		left: 0
		right: 0
		margin: 0 auto
		text-align: center
		z-index: 9001
		.wrapper
			display: inline-block
			padding: 10px 20px
			border-radius: 5px
			background-color: var(--theme_white)
			transition: all .3s cubic-bezier(.17,.67,.17,1)
			&.error
				background-color: var(--theme_error)
			&.success
				background-color: var(--theme_secondary)
			.p
				font-weight: var(--med)
				font-size: 14px
				color: var(--theme_white)
</style>
