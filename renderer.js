"use strict";

const Rx = require('rx')
const wx = require('./node_modules/webrx/dist/web.rx')

// var ipc = require('ipc')
const remote = require('electron').remote

const fontManager = require('font-manager')

wx.app.component('font-selector', {
	viewModel: function(params) {
		this.fonts = wx.list()

		var m = new Map()
		fontManager.findFontsSync({}).forEach((font) => {
			if (!m[font.family]) {
				m[font.family] = new Map()
			}
			m[font.family][font.style] = font
		})

		for (var family in m) {
			var styles = wx.list()
			for (var style in m[family]) {
				styles.push(m[family][style])
			}
			// name = m[family][]
			let name = family
			this.fonts.push({family: name, styles: styles})
		}

		this.fontFamily = wx.property(this.fonts.get(0).family)
		this.fontFamily.changed.subscribe((family) => {
			console.dir(m[family])
		})

		this.sizes = wx.list(['10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px'])
		this.size = wx.property('16px')
		this.weights = wx.list([100, 200, 300, 400, 500, 600, 700, 800, 900])
		this.weight = wx.property(400)
		this.styles = wx.list(['normal', 'italic', 'oblique'])
		this.style = wx.property('normal')
	},
	template: `
	<div>
		<select data-bind="foreach: fonts, selectedValue: @fontFamily">
			<option data-bind="value: family, text: family"></option>
		</select>
		<select data-bind="foreach: sizes, selectedValue: @size">
			<option data-bind="value: $data, text: $data"></option>
		</select>
		<select data-bind="foreach: styles, selectedValue: @style">
			<option data-bind="value: $data, text: $data"></option>
		</select>
		<select data-bind="foreach: weights, selectedValue: @weight">
			<option data-bind="value: $data, text: $data"></option>
		</select>
	</div>
	<div data-bind="style: {fontFamily: fontFamily, fontStyle: style, fontWeight: weight, fontSize: size}">
		<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
		<div>0123456789</div>
		<div>「ではみなさんは、そういうふうに川だと云われたり、乳の流れたあとだと云われたりしていたこのぼんやりと白いものがほんとうは何かご承知ですか。」先生は、黒板に吊した大きな黒い星座の図の、上から下へ白くけぶった銀河帯のようなところを指しながら、みんなに問をかけました。</div>
	</div>
</div>
	`
})

wx.applyBindings()

remote.getCurrentWindow().toggleDevTools()

