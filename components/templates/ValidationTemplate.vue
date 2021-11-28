<template lang="html">
	<transition name="slideY">
		<span :class="[ '__v', attr.validate, attr[payload.adjusted] ]" v-if="payload.errors && payload.errors.length > 0">
			<span :class="attr.text">{{ payload.errors[0] }}</span>
		</span>
		<span :class="[ '__v', attr.validate, attr.success ]" v-else-if="(payload.success) && (payload.errors && !payload.errors.length) && (payload.model && payload.model.length > 0)">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 31 31">
				<g transform="translate(-593 -236)">
					<circle id="Ellipse_83" data-name="Ellipse 83" cx="15.5" cy="15.5" r="15.5" transform="translate(593 236)" fill="#428f1f"/>
					<path id="Path_9658" data-name="Path 9658" d="M342.553,314.386l5.292,5.292,10.294-10.294" transform="translate(258.197 -62.973)" fill="none" stroke="#fff" stroke-width="3"/>
				</g>
			</svg>
		</span>
	</transition>
</template>

<script>
	export default {
		props: {
			payload: {
				type: Object,
				default: {
					errors: null,
					model: null,
					success: false,
					adjusted: ''
				}
			}
		}
	}
</script>

<style lang="stylus" module="attr">
	.validate
		position: absolute
		left: 0
		right: 0
		bottom: -20px
		pointer-events: none
		&.adjusted
			bottom: -10px
		&.success
			bottom: 10px
			left: unset
			right: 10px
			text-align: right
		.text
			color: var(--theme_error)
			font-weight: var(--reg)
			font-size: 12px
			user-select: none
	/**
	 * 767px - 280px */
	@media (max-width: 767px) and (min-width: 280px)
		.validate
			&.adjusted
				bottom: 5px
			.text
				font-size: 10px
</style>
