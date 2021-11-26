<template lang="html">
	<div :id="attr.calendar">
		<div :class="attr.container">
			<div :class="attr.left">
				<div :class="attr.top">
					<div :class="[ attr.prev, attr.pointer ]" @click="generatePrevCalendar()">
						<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 28 28">
							<g transform="translate(-248 -187)">
								<g :class="attr.arrow_1" transform="translate(248 187)">
									<circle :class="attr.arrow_3" cx="14" cy="14" r="14" /> <circle :class="attr.arrow_4" cx="14" cy="14" r="13.5" />
								</g>
								<path :class="attr.arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" />
							</g>
						</svg>
					</div>
					<h2 :class="attr.title">{{ full_date }}</h2>
					<div :class="[ attr.next, attr.pointer ]" @click="generateNextCalendar()">
						<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 28 28">
							<g transform="translate(-248 -187)">
								<g :class="attr.arrow_1" transform="translate(248 187)">
									<circle :class="attr.arrow_3" cx="14" cy="14" r="14" /> <circle :class="attr.arrow_4" cx="14" cy="14" r="13.5" />
								</g>
								<path :class="attr.arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" />
							</g>
						</svg>
					</div>
				</div>
				<div :class="attr.bottom">
					<button-template
						:label="'Save Event'"
						:link_status="2"
						@click.native.prevent
					/>
				</div>
			</div>
			<div :class="attr.right">
				<button-template
					:class="attr.mb"
					:label="'This Month'"
					:link_status="2"
					:full_width="true"
					:template="'template_2'"
					@click.native="generateCalendar(date.year = $moment().year(), date.month = $moment().month() + 1)"
				/>
				<table :class="attr.table">
					<thead>
						<tr>
							<th :class="attr.header" v-for="(dayLabel, key) in dayLabels" :key="key">{{ dayLabel }}</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: ({ $moment }) => ({
			date: {
				year: $moment().year(),
				month: $moment().month() + 1
			},
			full_date: '',
			yearName: '',
			dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		}),
		methods: {
			generateCalendar (year, month) {
				this.clearTableRows()
				this.full_date = `${this.$moment(`${year}-${month}`, 'YYYY-MM').format('MMMM')} ${this.$moment(`${year}-${month}`, 'YYYY-MM').format('YYYY')}`
				let start_date = 1,
					next_date = 1,
					prev_date = this.$moment(`${year}-${(month - 1 == 0) ? 12 : month - 1}`, 'YYYY-MM').daysInMonth(),
					end_date = this.$moment(`${year}-${month}`, 'YYYY-MM').daysInMonth(),
					calendar = document.querySelector(`.${this.attr.table} tbody`),
					current = this.$moment(`${year}-${month}-${start_date}`, 'YYYY-MM-D').format('d')

				for (let i = 0; i < 6; i++) {
					let table_row = document.createElement('tr')
					for (let j = 0; j < 7; j++) {
						if (start_date <= end_date) {
							if (this.$moment(`${year}-${month}-${start_date}`, 'YYYY-MM-D').format('d') == j) {
								table_row.innerHTML += `
									<td id="__c${i}" class='${this.attr.day}'>
										<div class='header_wrapper alt'>
											<div id="day_${start_date}" class="header_day_wrapper">
												<div class='header_day'>${start_date}</div>
											</div>
										</div>
									</td>`
								start_date++
							} else {
								prev_date = this.$moment(`${year}-${(month - 1 == 0) ? 12 : month - 1}`, 'YYYY-MM').daysInMonth()
								current--
								if (current <= 0) {
									prev_date = this.$moment(`${year}-${(month - 1 == 0) ? 12 : month - 1}`, 'YYYY-MM').daysInMonth()
								} else {
									prev_date = prev_date - current
								}
								table_row.innerHTML += `
									<td class='${this.attr.day} ${this.attr.disable}'>
										<div class='header_wrapper'>
											<div class='header_day'>${prev_date}</div>
										</div>
									</td>`
							}
						} else {
							if (this.$moment(`${year}-${month}-${1}`, 'YYYY-MM-D').format('d') == 0) {
								if (i == 4) {
									table_row.innerHTML += `
										<td id="__c${i}" class='${this.attr.day} ${this.attr.disable}'>
											<div class='header_wrapper'>
												<div class='header_day'>${next_date}</div>
											</div>
										</td>`
									next_date++
								}
							} else {
								table_row.innerHTML += `
									<td id="__c${i}" class='${this.attr.day} ${this.attr.disable}'>
										<div class='header_wrapper'>
											<div class='header_day'>${next_date}</div>
										</div>
									</td>`
								next_date++
							}
						}
					}
					calendar.appendChild(table_row)
				}
			},
			generatePrevCalendar () {
				this.date.month = this.date.month - 1
				if (this.date.month == 0) {
					this.date.month = 12
					this.date.year = this.date.year - 1
				}
				this.generateCalendar(this.date.year, this.date.month, 0, 0)
			},
			generateNextCalendar () {
				this.date.month = this.date.month + 1
				if (this.date.month == 13) {
					this.date.month = 1
					this.date.year = this.date.year + 1
				}
				this.generateCalendar(this.date.year, this.date.month, 0, 0)
			},
			clearTableRows () {
				document.querySelectorAll(`.${this.attr.table} tbody tr`).forEach((e) => {
					e.remove()
				})
			}
		},
		mounted () {
			this.generateCalendar(this.date.year, this.date.month)
		}
	}
</script>

<style lang="stylus" module="attr">
	.pointer
		cursor: pointer
	.mb
		margin-bottom: 20px
	.day
		color: var(--theme_white)
		font-size: 18px
		font-weight: var(--med)
		padding: 10px
		text-align: center
		animation: fade 1s
		&.disable
			color: rgba(255, 255, 255, 0.65)
			background-color: var(--theme_tertiary)
	#calendar
		height: inherit
		position: relative
		display: flex
		flex-flow: column wrap
		justify-content: center
		.container
			display: flex
			flex-flow: row wrap
			width: 100%
			max-width: 1280px
			margin: 0 auto
			border-radius: 12px
			border: 2px solid var(--theme_secondary)
			background-color: var(--theme_white)
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)
			.left
				flex: 0 0 40%
				border-right: 2px solid var(--theme_secondary)
				.top
					display: flex
					flex-flow: row wrap
					align-items: center
					justify-content: space-between
					background-color: var(--theme_primary)
					padding: 20px
					border-radius: 10px 0 0 0
					.title
						font-size: 20px
						font-weight: var(--med)
						color: var(--theme_white)
						margin: 0 20px
					.prev
						transform: rotate(180deg)
					.next,
					.prev
						width: 35px
						height: 35px
						svg
							.arrow_1
								fill: var(--theme_white)
								stroke: var(--theme_secondary)
								transition: .3s ease-in-out
							.arrow_2,
							.arrow_4
								fill: none
							.arrow_2
								stroke: var(--theme_primary)
								stroke-width: 1.5px
								transition: .3s ease-in-out
							.arrow_3
								stroke: none
							&:hover
								.arrow_1
									fill: var(--theme_secondary)
								.arrow_2
									stroke: var(--theme_white)
				.bottom
					padding: 20px
			.right
				flex: 1 0 5%
				padding: 20px
				border-radius: 0 10px 10px 0
				background-color: var(--theme_primary)
				.table
					.header
						font-size: 18px
						font-weight: var(--bold)
						color: var(--theme_white)
						text-transform: uppercase
						padding: 5px
	@keyframes fade
		from
			opacity: 0
		to
			opacity: 1
</style>
