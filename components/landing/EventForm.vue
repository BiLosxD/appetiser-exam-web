<template lang="html">
	<client-only>
		<ValidationObserver tag="div" ref="form">
			<form :id="attr.form" @submit.prevent>
				<ValidationProvider tag="div" :class="attr.group" name="event" :rules="{ required: true }" v-slot="{ errors }">
					<div :class="[ attr.input_wrapper, (errors && errors.length > 0) ? attr.alt : '' ]">
						<label for="title">Event</label>
						<input type="text" :class="attr.input" name="title" autocomplete="off" placeholder="Enter event" v-model="form_data.title" @input="checkValue($event)">
						<transition name="slide">
							<validation-template
								:payload="{
									errors: errors,
									model: form_data.title
								}"
							/>
						</transition>
					</div>
				</ValidationProvider>
				<div :class="attr.group_flex">
					<ValidationProvider tag="div" :class="attr.group" name="from date" :rules="{ required: true }" v-slot="{ errors }">
						<div :class="[ attr.input_wrapper, (errors && errors.length > 0) ? [ attr.alt, '__a' ] : '' ]">
							<label for="from">From</label>
							<v-ctk
								v-model="form_data.from"
								:only-date="true"
								:no-button="true"
								:auto-close="true"
								:format="'YYYY-MM-DD'"
								:formatted="'YYYY-MM-DD'"
								:no-label="true"
								:label="'Select a date'"
								:color="'#438EFF'"
								:id="'from'"
								@input="getDate($event, 'start')"
							></v-ctk>
							<validation-template
								:payload="{
									errors: errors,
									model: form_data.from
								}"
							/>
						</div>
					</ValidationProvider>
					<ValidationProvider tag="div" :class="attr.group" name="to date" :rules="{ required: true }" v-slot="{ errors }">
						<div :class="[ attr.input_wrapper, (errors && errors.length > 0) ? [ attr.alt, '__a' ] : '' ]">
							<label for="to">To</label>
							<v-ctk
								v-model="form_data.to"
								:only-date="true"
								:no-button="true"
								:auto-close="true"
								:format="'YYYY-MM-DD'"
								:formatted="'YYYY-MM-DD'"
								:no-label="true"
								:label="'Select a date'"
								:color="'#438EFF'"
								:id="'to'"
								:min-date="$moment(form_data.from).format('YYYY-MM-DD')"
								@input="getDate($event, 'end')"
							></v-ctk>
							<validation-template
								:payload="{
									errors: errors,
									model: form_data.to
								}"
							/>
						</div>
					</ValidationProvider>
				</div>

				<template v-if="form_data.from && form_data.to">
					<div :class="[ attr.group_flex, attr.four ]">
						<div :class="attr.group" v-for="(day, key) in days" :key="key">
							<div :class="attr.checkbox">
								<input type="checkbox" :class="attr.check" :name="`days_${key}`" :id="`days_${key}`" :key="key" @change="getDay(day)">
								<label :for="`days_${key}`" :class="attr.pointer">{{ day }}</label>
							</div>
						</div>
						<validation-template
							:payload="{
								errors: (validate.days) ? '' : ['The days field is required.'],
								model: form_data.days,
								adjusted: 'adjusted'
							}"
						/>
					</div>
				</template>

				<div :class="attr.action">
					<button-template
						:class="attr.custom"
						:label="'Add'"
						:full_width="true"
						:status="2"
						@click.native="submit(0)"
					/>
					<button-template
						:class="attr.custom"
						:label="'Override'"
						:template="'template_3'"
						:full_width="true"
						:status="2"
						@click.native="submit(1)"
					/>
				</div>
			</form>
		</ValidationObserver>
	</client-only>
</template>

<script>
	export default {
		props: {
			payload: {
				type: Object/Array,
				default: null
			}
		},
		data: ({ payload, $moment }) => ({
			validate: {
				days: true
			},
			form_data: {
				title: '',
				from: $moment(payload.date).format('YYYY-MM-DD'),
				to: '',
				days: []
			},
			days: []
		}),
		methods: {
			getDate (event, type) {
				if (type == 'start') {
					this.form_data.to = ''
				} else {
					this.days = []
					this.form_data.days = []
					setTimeout(() => {
						let from = parseInt(this.$moment(this.form_data.from).format('E')),
							diff = this.$moment(this.form_data.to, 'YYYY-MM-DD').diff(this.$moment(this.form_data.from, 'YYYY-MM-DD'), 'days'),
							days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

						if (diff != 0) {
							this.days.push(days[from - 1])
							for (let i = from; i < diff + from; i++) {
								let ctr = (i >= 7) ? i - 7 : i
								if (this.days.length < 7) {
									this.days.push(days[ctr])
								}
							}
						} else {
							this.days.push(days[from - 1])
						}
					}, 10)
				}
			},
			getDay (data = null) {
				if (data) {
					if (this.form_data.days.includes(data)) {
						for (let i = 0, len = this.form_data.days.length; i < len; i++) {
							if (data == this.form_data.days[i]) {
								this.form_data.days.splice(i, 1)
							}
						}
						if (this.form_data.days.length <= 0) {
							this.validate.days = false
						}
					} else {
						this.validate.days = true
						this.form_data.days.push(data)
					}
				} else {
					this.validate.days = (this.form_data.days.length > 0) ? true : false
				}
			},
			submit (override = 0) {
				this.getDay()
				this.$refs.form.validate().then(success => {
					if (!success || !this.validate.days) {
						this.toggleModalStatus({ type: 'toast', status: true, item: { text: 'Please fill out the fields.', type: 'error' } })
					} else {
						this.toggleModalStatus({ type: 'loader', status: true })
						this.form_data.override = override

						this.$axios.$post('events', this.form_data).then(({ record }) => {
							this.toggleModalStatus({ type: 'toast', status: true, item: { text: 'Event added!', type: 'success' } })
							this.$parent.initial()
						}).catch(err => {
							this.toggleModalStatus({ type: 'toast', status: true, item: { text: 'Oops! something went wrong', type: 'error' } })
						}).then(() => {
							setTimeout( () => {
								this.toggleModalStatus({ type: 'loader', status: false })
							}, 500)
						})
						this.$nextTick(() => {
							this.$refs.form.reset()
						})
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
	.__a
		#from-wrapper,
		#to-wrapper
			.field-input
				border: 1px solid var(--theme_error)
	#from-wrapper,
	#to-wrapper
		.has-value
			.field-input
				border: 1px solid var(--theme_info)
		.field-input
			height: 40px
			min-height: 40px
			border: 1px solid var(--theme_gray_v2)
			font-size: 16px
			color: var(--theme_black)
			transition: .3s ease-in-out
</style>

<style lang="stylus" module="attr">
	.pointer
		cursor: pointer
	#form
		.group_flex
			display: flex
			flex-flow: row wrap
			justify-content: space-between
			&.four
				position: relative
				justify-content: flex-start
				.group
					flex: 0 0 calc((100% / 4) - 10px)
					margin-bottom: 15px
			.group
				flex: 0 0 calc((100% / 2) - 10px)
		.input_wrapper
			position: relative
			margin-bottom: 15px
			transition: .3s ease-in-out
			&.alt
				margin-bottom: 30px
				.input
					border: 1px solid var(--theme_error)
		.group
			position: relative
			&.disabled
				pointer-events: none
				.input
					background-color: #DFDFDF
			label
				display: inline-block
				position: relative
				font-weight: var(--med)
				font-size: 14px
				color: var(--theme_black)
				margin-bottom: 10px
		.checkbox
			position: relative
			display: flex
			flex-flow: row wrap
			align-items: center
			justify-content: flex-start
			label
				position: relative
				font-weight: var(--med)
				font-size: 14px
				color: var(--theme_black)
				padding-left: 10px
				margin-bottom: 0
				transition: .3s ease-in-out
			.check
				-webkit-appearance: none
				outline: none
				width: 20px
				height: 20px
				padding-left: 20px
				background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDE5IDE5Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZmO30uYiwuY3tzdHJva2U6bm9uZTt9LmN7ZmlsbDojYmZiZmJmO308L3N0eWxlPjwvZGVmcz48ZyBjbGFzcz0iYSI+PHBhdGggY2xhc3M9ImIiIGQ9Ik0gMTUgMTguNSBMIDQgMTguNSBDIDIuMDcwMDkwMDU1NDY1Njk4IDE4LjUgMC41IDE2LjkyOTkxMDY1OTc5MDA0IDAuNSAxNSBMIDAuNSA0IEMgMC41IDIuMDcwMDkwMDU1NDY1Njk4IDIuMDcwMDkwMDU1NDY1Njk4IDAuNSA0IDAuNSBMIDE1IDAuNSBDIDE2LjkyOTkxMDY1OTc5MDA0IDAuNSAxOC41IDIuMDcwMDkwMDU1NDY1Njk4IDE4LjUgNCBMIDE4LjUgMTUgQyAxOC41IDE2LjkyOTkxMDY1OTc5MDA0IDE2LjkyOTkxMDY1OTc5MDA0IDE4LjUgMTUgMTguNSBaIi8+PHBhdGggY2xhc3M9ImMiIGQ9Ik0gNCAxIEMgMi4zNDU3OTA4NjMwMzcxMDkgMSAxIDIuMzQ1NzkwODYzMDM3MTA5IDEgNCBMIDEgMTUgQyAxIDE2LjY1NDIwOTEzNjk2Mjg5IDIuMzQ1NzkwODYzMDM3MTA5IDE4IDQgMTggTCAxNSAxOCBDIDE2LjY1NDIwOTEzNjk2Mjg5IDE4IDE4IDE2LjY1NDIwOTEzNjk2Mjg5IDE4IDE1IEwgMTggNCBDIDE4IDIuMzQ1NzkwODYzMDM3MTA5IDE2LjY1NDIwOTEzNjk2Mjg5IDEgMTUgMSBMIDQgMSBNIDQgMCBMIDE1IDAgQyAxNy4yMDkxNDA3Nzc1ODc4OSAwIDE5IDEuNzkwODU5MjIyNDEyMTA5IDE5IDQgTCAxOSAxNSBDIDE5IDE3LjIwOTE0MDc3NzU4Nzg5IDE3LjIwOTE0MDc3NzU4Nzg5IDE5IDE1IDE5IEwgNCAxOSBDIDEuNzkwODU5MjIyNDEyMTA5IDE5IDAgMTcuMjA5MTQwNzc3NTg3ODkgMCAxNSBMIDAgNCBDIDAgMS43OTA4NTkyMjI0MTIxMDkgMS43OTA4NTkyMjI0MTIxMDkgMCA0IDAgWiIvPjwvZz48L3N2Zz4K')
				background-position: center
				background-repeat: no-repeat
				background-size: contain
				transition: .3s ease-in-out
				&:checked
					background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDE5IDE5Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojNDM4RUZGO30uYntmaWxsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUzMyAtMTIzOSkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxIDk3NSkiPjxwYXRoIGNsYXNzPSJhIiBkPSJNNCwwSDE1YTQsNCwwLDAsMSw0LDRWMTVhNCw0LDAsMCwxLTQsNEg0YTQsNCwwLDAsMS00LTRWNEE0LDQsMCwwLDEsNCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTEyIDI2NCkiLz48cGF0aCBjbGFzcz0iYiIgZD0iTS0xMjE5NC45MDgtNTA2Mi41NTRsMy4xNTksMy4xNTksNy43NS03Ljc1MSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI3MTEgNTMzNS43MDMpIi8+PC9nPjwvZz48L3N2Zz4K')
		.input
			display: block
			width: 100%
			border: 1px solid var(--theme_gray_v2)
			border-radius: 4px
			padding: 10px 15px
			font-size: 16px
			color: var(--theme_black)
			transition: .3s ease-in-out
			&:hover,
			&.filled
				border: 1px solid var(--theme_info)
		.action
			position: absolute
			left: 0
			right: 0
			width: 100%
			max-width: calc(100% - 40px)
			margin: 0 auto
			bottom: 20px
			display: flex
			flex-flow: row wrap
			align-items: center
			justify-content: space-between
			.custom
				flex: 0 0 48.66%
	/**
	 * 1366px - 1025px */
	@media (max-width: 1366px) and (min-width: 1025px)
		#form
			.group_flex
				&.four
					.group
						flex: 0 0 calc((100% / 3) - 10px)
						margin-bottom: 30px
				.group
					flex: 0 0 100%
	/**
	 * 1024px - 280px */
	@media (max-width: 1024px) and (min-width: 280px)
		#form
			.group_flex
				&.four
					.group
						flex: 0 0 calc((100% / 3) - 10px)
						margin-bottom: 30px
				.group
					flex: 0 0 100%
			.action
				max-width: 100%
				position: static
				.custom
					flex: 0 0 calc(50% - 10px)
		/**
		 * 767px - 280px */
		@media (max-width: 767px) and (min-width: 280px)
			#form
				.group_flex
					&.four
						.group
							flex: 0 0 calc((100% / 2) - 10px)
							margin-bottom: 30px
					.group
						flex: 0 0 100%
</style>
