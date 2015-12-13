"use strict";

const Rx = require('rx')
const wx = require('./node_modules/webrx/dist/web.rx')

// var ipc = require('ipc')
const remote = require('electron').remote

const fontManager = require('font-manager')
const fontkit = require('fontkit')


wx.app.component('font-selector', {
	viewModel: function(params) {
		this.fonts = wx.list(fontManager.findFontsSync({}))
		this.font = wx.property(this.fonts.get(0).postscriptName)

		this.sizes = wx.list(['10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px'])
		this.size = wx.property('16px')
		this.weights = wx.list([100, 200, 300, 400, 500, 600, 700, 800, 900])
		this.weight = wx.property(400)
		this.styles = wx.list(['normal', 'italic', 'oblique'])
		this.style = wx.property('normal')
	},
	template: `
	<div>
		<select data-bind="foreach: fonts, selectedValue: @font">
			<option data-bind="value: postscriptName, text: postscriptName"></option>
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
	<div data-bind="style: {fontFamily: font, fontStyle: style, fontWeight: weight, fontSize: size}">
		<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
		<div>0123456789</div>
		<div>「ではみなさんは、そういうふうに川だと云われたり、乳の流れたあとだと云われたりしていたこのぼんやりと白いものがほんとうは何かご承知ですか。」先生は、黒板に吊した大きな黒い星座の図の、上から下へ白くけぶった銀河帯のようなところを指しながら、みんなに問をかけました。</div>
	</div>
</div>
	`
})

wx.applyBindings()

remote.getCurrentWindow().toggleDevTools()

