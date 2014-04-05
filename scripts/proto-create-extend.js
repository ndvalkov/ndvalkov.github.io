(function() {
	if (!Object.create) {
	  Object.create = function(obj) {
		function f() {};
		f.prototype = obj;
		return new f();
	  }
	}
	if (!Object.prototype.extend) {
	  Object.prototype.extend = function(properties) {
		function f() {};
		f.prototype = Object.create(this);
		for (var prop in properties) {
		  f.prototype[prop] = properties[prop];
		}
		f.prototype._super = this;
		return new f();
	  }
	}
	
	
	// html escape---------
	
	if (!String.prototype.htmlEscape) {
		String.prototype.htmlEscape = function() {
		  var escapedString = this.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
			return escapedString;
		}

		String.prototype.someOtherMethod = function () {

		}
	}
	
	
})();
