var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
//var doIt = true;
var style = "  display: none;"
var preferences = require("sdk/simple-prefs").prefs;
var ss = require("sdk/simple-storage");
var mod;
var button = buttons.ActionButton({
	id: "kill-newsfeed",
	label: "Kill Your News Feed",
	icon: {
		"16": "./killnewsOFF-16.png",
		"32": "./killnewsOFF-32.png",
		"64": "./killnewsOFF-64.png"
	},
	onClick: handleClick
});

startup();

function startup() {
	ss.storage.kill = ss.storage.kill || false;
	preferences.isOn = ss.storage.kill;
	assertIcon();
	onPrefChange("isOn");
}

function onPrefChange(prefName) {
	ss.storage.kill = preferences.isOn;
	if (preferences[prefName]) {
		style = "  display: none;";
		mod = pageMod.PageMod({
			include: "*.facebook.com",
			contentStyle: "div[id*=\"topnews\"], div[id*=\"pagelet_trending\"], div[id*=pagelet_ego]{" +
			                "  display: none; "+
			                "}"
		})
		activeTab = require("sdk/tabs").activeTab;
		if (activeTab.url.toLowerCase().indexOf("facebook") != -1)
			{activeTab.url = activeTab.url;}
	}
	else {
		if (mod) {
			mod.destroy();
		}
		style = "";
	}
}

function handleClick(state) {
	//tabs.open("http://www.mozilla.org/");
	preferences.isOn = !preferences.isOn;
	assertIcon();
	ss.storage.kill = preferences.isOn;
}

function assertIcon() {
	if (!preferences.isOn) {
		button.icon = {
			"16": "./killnewsOFF-16.png",
			"32": "./killnewsOFF-32.png",
			"64": "./killnewsOFF-64.png"
		}
	}
	else {
		button.icon = {
				"16": "./killnews-16.png",
				"32": "./killnews-32.png",
				"64": "./killnews-64.png"
		}
	}
}

require("sdk/simple-prefs").on("isOn", onPrefChange);
