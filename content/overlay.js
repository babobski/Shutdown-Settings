/**
 * Namespaces
 */
if (typeof (extensions) === 'undefined') extensions = {};
if (typeof (extensions.ShutdownSettings) === 'undefined') extensions.ShutdownSettings = {
	version: '1.0'
};

(function () {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService).getBranch("extensions.ShutdownSettings."),
		observerSvc = Components.classes["@mozilla.org/observer-service;1"].
	getService(Components.interfaces.nsIObserverService),
		self = this;

	this.shutdownSettings = {};
	this.shutdownSettings.observe = function (event) {
		var shutdownSetting = prefs.getCharPref('setting'),
			features = "chrome,titlebar,toolbar,centerscreen";

		switch (shutdownSetting) {
		case 'prompt':
			window.openDialog('chrome://ShutdownSettings/content/shutdownPromt.xul', "ShutdownSettings", features, self);
			event.data = true;
			break;
		case 'minimize':
			window.minimize();
			event.data = true;
			break;
		}

	};

	this.forceCloseKomodo = function () {
		Components.classes["@mozilla.org/toolkit/app-startup;1"]
			.getService(Components.interfaces.nsIAppStartup)
			.quit(Components.interfaces.nsIAppStartup.eAttemptQuit);
	}

	observerSvc.addObserver(this.shutdownSettings, "quit-application-requested", false);

}).apply(extensions.ShutdownSettings);
