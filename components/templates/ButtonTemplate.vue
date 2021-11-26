<template lang="html">
	<nuxt-link
		:to="link"
		custom
		v-slot="{ href, navigate, isActive, isExactActive }"
		v-if="status == 0
	">
		<a
			:class="[
				(isExactActive) ? attr.exact : '',
				attr.button,
				attr[template],
				attr.pointer,
				(disabled) ? attr.disabled : '',
				(minimal) ? attr.minimal : '',
				(full_width) ? attr.full : ''
			]"
			:href="href"
			@click="navigate"
		>
			<span>{{ label }}</span>
		</a>
	</nuxt-link>

	<a
		:href="link"
		target="_blank"
		:class="[
			attr.button,
			attr[template],
			attr.pointer,
			(disabled) ? attr.disabled : '',
			(minimal) ? attr.minimal : '',
			(full_width) ? attr.full : ''
		]"
		v-else-if="status == 1"
	>
		<span>{{ label }}</span>
	</a>

	<button
		:type="button_type"
		:class="[
			attr.button,
			attr[template],
			attr.pointer,
			(disabled) ? attr.disabled : '',
			(minimal) ? attr.minimal : '',
			(full_width) ? attr.full : ''
		]"
		v-else-if="status == 2"
	>
		<span>{{ label }}</span>
	</button>
</template>

<script>
	export default {
		props: {
			button_type: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			link: {
				type: String,
				default: '#'
			},
			status: {
				type: Number,
				default: 0
			},
			disabled: {
				type: Boolean,
				default: false
			},
			minimal: {
				type: Boolean,
				default: false
			},
			full_width: {
				type: Boolean,
				default: false
			},
			template: {
				type: String,
				default: 'template_1'
			}
		}
	}
</script>

<style lang="stylus" module="attr">
	.pointer
		cursor: pointer
	.ml
		margin-left: 20px
	.button
		display: inline-block
		position: relative
		text-align: center
		padding: 10px 20px
		font-style: normal !important
		text-decoration: none !important
		transition: .3s cubic-bezier(.17,.67,.77,1)
		&.minimal
			padding: 5px 10px
			span
				font-size: 14px
		&.disabled
			pointer-events: none
			&.template_1,
			&.template_2
				background-color: rgba(255, 255, 255, 0.5)
				&::before
					opacity: 0
		&.full
			display: block
			width: 100%
		&.template_1
			border: 2px solid var(--theme_info)
			background-color: var(--theme_info)
			&:hover
				background-color: var(--theme_white)
				span
					color: var(--theme_info)
		&.template_2
			border: 2px solid var(--theme_white)
			background-color: transparent
			span
				color: var(--theme_white)
			&:hover
				background-color: var(--theme_white)
				span
					color: var(--theme_primary)
		span
			display: block
			position: inherit
			font-weight: var(--med)
			color: var(--theme_white)
			text-transform: uppercase
			vertical-align: top
			font-style: normal
			z-index: 1
			transform: scale(1)
			transition: .3s cubic-bezier(.17,.67,.77,1)
	@media (max-width: 1024px) and (min-width: 280px)
		.button
			padding: 10px 20px
			span
				font-size: 14px
		@media (max-width: 310px) and (min-width: 280px)
			.button
				display: block
				width: 100%
</style>
