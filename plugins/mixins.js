import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

Vue.mixin({
	computed: {
		...mapGetters({
			getShowStatus: 'global/modal/getShowStatus',
			getAuthenticated: 'global/settings/getAuthenticated'
		})
	},
	methods: {
		formatBytes(bytes, decimals) {
			if (bytes == 0) return '0 Bytes'
			let k = 1024,
				dm = decimals || 2,
				sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				i = Math.floor(Math.log(bytes) / Math.log(k))

			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
		},
		...mapMutations({
			toggleModalStatus: 'global/modal/toggleModalStatus'
		}),
		checkIfNumber (value) {
			const me = this
			value = value.toString()
			let key_codes = ['47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105']

			if (key_codes.includes(value)) {
				return true
			} else {
				return false
			}
		},
		animateElements (page, targets) {
			/**
			 * Observer (IntersectionObserver)
			 * @param {[array]} items [target elements] */
			let observer = new IntersectionObserver((items) => {
				items.forEach((item, key) => {
					if (item.isIntersecting) {
						item.target.classList.add(page.attr.viewport)
						observer.unobserve(item.target)
					}
				})
			})

			/**
			 * Listing all the elements in order to observe */
			targets.forEach((target, key) => {
				let elements = document.querySelectorAll(target)
				elements.forEach((element, k) => {
					observer.observe(element)
				})
			})
		},
		/**
		 * check if the input field has value
		 * which is the length is greater the 0
		 * @param  {[object]} event [input event]
		 */
		checkValue (event) {
			const me = this
			let target = event.target
			if (target.value.length > 0) {
				target.classList.add(me.attr.filled)
			} else {
				target.classList.remove(me.attr.filled)
			}
		},
		parseInputToDate (target) {
			const me = this
			let lastValue = ''
			let value = target.split('-').join('')
			if (value.length > 0) {
				value = value.match(new RegExp('.{1,4}', 'g')).join('-')
				let valueArrayChecker = value.split('-')
				if (valueArrayChecker[1]) {
					if (valueArrayChecker[1].length > 0) {
						value = value.split('-')
						lastValue = `${value[0]}-`
						lastValue += value[1].match(new RegExp('.{1,2}', 'g')).join('-')
					}
				} else {
					lastValue = value
				}
			}
			return lastValue
		},
		sharer (type, link = null) {
			if (link == null) {
				link = window.location.href
			}

			let isMobile = (window.innerWidth <= 768) ? true : false
			let shareLink = null

			switch (type) {
				case 'facebook':
					shareLink = `https://${(isMobile) ? 'm' : 'www'}.facebook.com/sharer/sharer.php?u=${link}`
					break
				case 'twitter':
					shareLink = `https://${(isMobile) ? 'm' : 'www'}.twitter.com/share?url=${link}`
					break
				case 'linkedn':
					shareLink = `http://www.linkedin.com/shareArticle?mini=true&url=${link}&title=I wanted to share this great website with you`
					break
				case 'whatsapp':
					shareLink = `https://api.whatsapp.com/send?text=I%20wanted%20to%20share%20this%20great%20website%20with%20you%20${link}`
					break
				case 'telegram':
					shareLink = `https://t.me/share/url?url=${link}&text=I wanted to share this great website with you`
					break
			}
			window.open(shareLink, "shareWindow", "status=1,width=600,height=450")
		},
		randomString () {
			return Math.random().toString(36).substring(2)
		},
		totalItems (value) {
			if (value != 0) {
				return parseFloat(value).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			} else {
				return 0
			}
		},
		totalCount (value) {
			let count = 0
			if (value) {
				count = parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			}
			return count
		},
		toJSON (data) {
			if (data) {
				return JSON.parse(JSON.stringify(Object.fromEntries(data)))
			}
		},
		parser (data) {
			if (data) {
				return JSON.parse(data)
			}
		},
		replacer (data) {
			if (data) {
				return data.replace(/\-/g, ' ')
			}
		},
		convertToSlug (data) {
			let slug = ''
			if (data.match(/[!@#$%^&*(){}:;"’'<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g)) {
				slug = data.toLowerCase().replace(/[!@#$%^&*(){}:;"'’<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g, '').replace(/\s/g, '-')
			} else {
				slug = data.toLowerCase().replace(/\s/g, '-')
			}
			return slug
		}
	}
})
