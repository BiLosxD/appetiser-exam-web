<template lang="html">
	<div :id="attr.modal">
		<div :class="attr.backdrop" @click="close()"></div>
		<div :class="attr.content">
			<div :class="[ attr.close, attr.pointer ]" @click="close()">
				<svg xmlns="http://www.w3.org/2000/svg" width="22.468" height="22.468" viewBox="0 0 22.468 22.468">
					<path d="M29.968,9.763,27.705,7.5l-8.971,8.971L9.763,7.5,7.5,9.763l8.971,8.971L7.5,27.705l2.263,2.263L18.734,21l8.971,8.971,2.263-2.263L21,18.734Z" transform="translate(-7.5 -7.5)"/>
				</svg>
			</div>
			<div :class="attr.title">Events</div>
			<div :class="attr.desc">
				<ul>
					<li v-for="(list, key) in payload.list" :key="key">
						<span>{{ key + 1 }}.</span>
						<span>{{ list }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			payload: {
				type: Object/Array,
				default: null
			}
		},
		methods: {
			close () {
				this.$parent.toggle.event_list = false
				document.body.classList.remove('no_scroll')
			}
		},
		mounted () {
			document.addEventListener('keydown', (e) => {
				if (e.keyCode == 27){
					this.$parent.toggle.event_list = false
				}
			})
			document.body.classList.add('no_scroll')
		}
	}
</script>

<style lang="stylus" module="attr">
	.pointer
		cursor: pointer
	#modal
		position: fixed
		top: 0
		left: 0
		right: 0
		bottom: 0
		z-index: 9001
		.backdrop
			position: fixed
			top: 0
			left: 0
			z-index: 0
			width: 100vw
			height: 100vh
			background-color: rgba(0, 0, 0, 0.1)
		.close
			position: absolute
			top: 15px
			right: 15px
			z-index: 2
			svg
				fill: var(--theme_error)
				transform: scale(1)
				transition: .3s ease-in-out
			&:hover
				svg
					transform: scale(1.2)
		.content
			position: fixed
			top: 50%
			left: 0
			right: 0
			width: 100%
			max-width: 500px
			margin: 0 auto
			border-radius: 10px
			padding: 40px 20px 20px
			background-color: var(--theme_white)
			animation: slide_from_top 1.5s
			transform: translateY(-50%)
			.title
				font-weight: var(--extra)
				font-size: 24px
				color: var(--theme_black)
				margin-bottom: 30px
			.desc
				ul
					list-style: none
					padding: 0
					li
						background-color: rgba(0, 0, 0, 0.065)
						font-weight: var(--med)
						padding: 10px 15px
						&:nth-child(even)
							background-color: rgba(30, 145, 136, 0.2)
	@keyframes slide_from_top
		from
			opacity: 0
			transform: translateY(-75%)
		to
			opacity: 1
			transform: translateY(-50%)
	/**
	 * 1024px - 280px */
	@media (max-width: 1024px) and (min-width: 280px)
		#modal
			.content
				max-width: calc(100% - 40px)
				padding: 60px 30px 30px
				.title
					font-size: 20px
				.desc
					*
						font-size: 14px
</style>
