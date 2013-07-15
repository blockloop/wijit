doApp.factory('storageService', function() {

	var brain = localStorage.brain;
	var cache = sessionStorage.brain;

	return {
		getBrain:function (property) {
			brain = brain || "{}";
			return JSON.parse(brain);
		},
		getCache:function () {
			cache = cache || "{}";
			return JSON.parse(cache);
		},
		saveBrain:function (newBrain) {
			newBrain = $.extend({}, this.getBrain(), newBrain);
			localStorage.brain = JSON.stringify(newBrain);
		},
		saveCache:function (newCache) {
			newCache = $.extend({}, this.getCache(), newCache);
			sessionStorage.brain = JSON.stringify(newCache);
		}
	};
});

