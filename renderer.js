"use strict";

var Rx = require('rx')
var wx = require('./node_modules/webrx/dist/web.rx')

// var ipc = require('ipc')
var remote = require('electron').remote

var fontManager = require('font-manager')

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
			this.fonts.push({family: family})
		}
	},
	template: `
	<div data-bind="foreach: fonts">
		<div data-bind="style: {fontFamily: family}">
			<span data-bind="text: family"></span>
		</div>
	</div>
	`
})

wx.applyBindings()

remote.getCurrentWindow().toggleDevTools()

