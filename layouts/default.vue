<template>
	<div id="__aptsr">
		<transition name="zoom">
			<template v-if="getShowStatus('toast')">
				<toast />
			</template>
		</transition>

		<Nuxt />

		<transition name="fade">
			<template v-if="getShowStatus('loader')">
				<loader />
			</template>
		</transition>
	</div>
</template>

<script>
	export default {
		head () {
			return {
				title: 'Appetiser Exam | BiLos'
			}
		}
	}
</script>

<style lang="stylus">
	:root
		--theme_white: #FFF
		--theme_white_v2: #f9f7f4
		--theme_black: #000
		--theme_gray: #ebebeb
		--theme_gray_v2: #bfbfbf
		--theme_primary: #02afa0
		--theme_secondary: #1E9188
		--theme_tertiary: #3cbbb1
		--theme_success: #48F3A9
		--theme_warning: #ffc800
		--theme_error: #F76C6C
		--theme_info: #438EFF
		--theme_extra: #775DD0
		--dm_sans: 'Ubuntu'
		--reg: 400
		--med: 500
		--bold: 700

	#__aptsr
		transition: .3s cubic-bezier(.17,.67,.17,1)

	html
		background-color: var(--theme_white_v2)
		-webkit-text-size-adjust: none
		-webkit-font-smoothing: subpixel-antialiased
		backface-visibility: hidden
		font-family: 'Ubuntu', sans-serif

	*,
	*:before,
	*:after
		user-select: none
		box-sizing: border-box
		margin: 0
		word-break: break-word !important
		-webkit-user-drag: none

	body
		position: relative
		overflow-x: hidden
		font-size: 16px
		&.no_click
			pointer-events: none
		&.no_scroll
			overflow-y: hidden
		&::-webkit-scrollbar
			width: 3px
			background-color: var(--theme_white)
		&::-webkit-scrollbar-track
			box-shadow: none
			background-color: var(--theme_white)
		&::-webkit-scrollbar-thumb
			background-repeat: no-repeat
			background-clip: padding-box
			background-color: var(--theme_primary)

	::-webkit-scrollbar-track
		background-color: rgba(0, 0, 0, 0.25)
	::-webkit-scrollbar
		width: 4px
		height: 5px
		background-color: rgba(0, 0, 0, 0.25)
	::-webkit-scrollbar-thumb
		background-color: var(--theme_primary)

	::selection
		color: var(--theme_white)
		background-color: var(--theme_primary)

	textarea
		resize: vertical
		vertical-align: middle

	input,
	input:before,
	input:after,
	textarea,
	textarea:before,
	textarea:after,
	select,
	select:before,
	select:after
		-webkit-appearance: none
		border: none
		outline: none
		box-shadow: none
		user-select: initial
		background-color: transparent

	::-webkit-input-placeholder
		color: rgba(0, 0, 0, 0.5)
		font-weight: var(--reg)
		font-size: 14px
		text-transform: none

	:-ms-input-placeholder
		color: rgba(0, 0, 0, 0.5)
		font-weight: var(--reg)
		font-size: 14px
		text-transform: none

	::placeholder
		color: rgba(0, 0, 0, 0.5)
		font-weight: var(--reg)
		font-size: 14px
		text-transform: none

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button
		-webkit-appearance: none
		margin: 0

	input[type=number]
		-moz-appearance: textfield

	h1,
	h2,
	h3,
	h4,
	h5
		font-weight: normal

	table
		width: 100%
		border-collapse: collapse

	svg,
	span
		vertical-align: middle

	img
		width: 100%
		height: auto
		vertical-align: middle

	a
		text-decoration: none

	p
		&:empty
			&::before
				content: ' '
				white-space: pre

	/*
	*** Animations
	*/
	.fade-enter-active,
	.fade-leave-active
		transition: all .3s cubic-bezier(.17,.67,.17,1)

	.fade-enter,
	.fade-leave-to
		opacity: 0

	.zoom-enter-active,
	.zoom-leave-active
		transition: all .5s cubic-bezier(.17,.67,.17,1)

	.zoom-enter,
	.zoom-leave-to
		opacity: 0
		transform: scale(0)

	.slideX-enter-active,
	.slideX-leave-active
		transition: all .3s cubic-bezier(.17,.67,.17,1)

	.slideX-enter,
	.slideX-leave-to
		opacity: 0
		transform: translateX(-100px)

	.slideY-enter-active,
	.slideY-leave-active
		transition: all .3s cubic-bezier(.17,.67,.17,1)

	.slideY-enter,
	.slideY-leave-to
		opacity: 0
		transform: translateY(-20px)

	.page-enter-active,
	.page-leave-active
		transition: all .3s cubic-bezier(.17,.67,.17,1)

	.page-enter,
	.page-leave-to
		opacity: 0
</style>
