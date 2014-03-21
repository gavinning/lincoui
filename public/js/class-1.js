/*
* Javascript Class library
* By Gavinning 2013.03.25
*
*/

;(function() {

var Class, Done,

	class2type = {},

	temp = {},

	emArray = [],

	support,

	is,

	hasjQuery = typeof jQuery === 'function',

	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_indexOf = emArray.indexOf;

Class = function( parent ) {

	var _class = function() {
		this.init.apply(this, arguments);
	};

	if (parent) {
		var subclass = function() {};
		subclass.prototype = parent.prototype;
		_class.prototype = new subclass;
	};

	// _class init
	_class.prototype.init = function() {};

	// Define alias
	_class.fn = _class.prototype;

	// Define proxy
	_class.proxy = function(fn) {
		var _this = this;
		return (function() {
			return fn.apply(_this, arguments);
		});
	};


	// Define prototype parent
	_class.fn.parent = _class;
	_class._super = _class.__proto__;

	_class.fn.proxy = _class.proxy;

	// Extend form jQuery 1.9.1
	_class.extend = _class.fn.extend = function() {
		var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !Class.jQuery.isFunction(target)) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if (length === i) {
			target = this;
			--i;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (Class.jQuery.isPlainObject(copy) || (copyIsArray = Class.jQuery.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Class.jQuery.isArray(src) ? src : [];

						} else {
							clone = src && Class.jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = Class.jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};


	// Extend some methods from jQuery
	_class.extend(Class.jQuery);
	_class.fn.extend(Class.jQuery);

	// Extend some tool methods
	_class.extend(Class.inc);
	_class.fn.extend(Class.inc);

	return _class;
};

// From jQuery 1.9.1
Class.isArraylike = function isArraylike(obj) {
	var length = obj.length,
		type = Class.jQuery.type(obj);

	if (Class.jQuery.isWindow(obj)) {
		return false;
	}

	if (obj.nodeType === 1 && length) {
		return true;
	}

	return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
};

// From jQuery 1.9.1
Class.jQuery = {

	// args is for internal usage only
	each: function(obj, callback, args) {
		var value,
		i = 0,
			length = obj.length,
			isArray = Class.isArraylike(obj);

		if (args) {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.apply(obj[i], args);

					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.apply(obj[i], args);

					if (value === false) {
						break;
					}
				}
			}

			// A special, fast, case for the most common use of each
		} else {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.call(obj[i], i, obj[i]);

					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.call(obj[i], i, obj[i]);

					if (value === false) {
						break;
					}
				}
			}
		}

		return obj;
	},

	type: function( obj ) {
		if ( obj == null) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ? class2type[core_toString.call( obj )] || "object" : typeof obj;
	},

	isFunction: function( obj ) {
		return Class.jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return Class.jQuery.type( obj ) === "array";
	},

	isNumber: function( obj ) {
		return Class.jQuery.type( obj ) === "number";
	},

	isString: function( obj ) {
		return Class.jQuery.type( obj ) === "string";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || Class.jQuery.type( obj ) !== "object" || obj.nodeType || Class.jQuery.isWindow( obj ) ) {
			return false;
		};

		try {
			// Not own constructor property must be Object
			if ( obj.constructor && !core_hasOwn.call( obj, "constructor" ) && !core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		};

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			};

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[i] === elem ) {
					return i;
				}
			}
		};

		return -1;
	}

};

// From jQuery 1.9.1
// Populate the class2type map
Class.jQuery.each( "Boolean Number String Function Array Date RegExp Object Error".split(" "), function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});


// Extend 
Class.inc = {

	now: function(){
		var date = new Date();
		return date.toJSON().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
	},

    XMLHttpRequest: function(){
        return new XMLHttpRequest() || new ActiveXObject( 'Microsoft.XMLHTTP' );
    },

	XHR: function(){
		return Class.inc.XMLHttpRequest();
	},

	minHeight: function( selector ){
		selector = selector || 'body';
		if( document.querySelector ){
			return window.innerHeight - document.body.offsetHeight + document.querySelector( selector ).offsetHeight
		}
	},

	top: function( time ){
		hasjQuery ?
			jQuery( 'html, body' ).animate({ scrollTop: 0 }, time || 300 ):
			window.scrollTo( 0, 0 );

		return this;
	},

	methods: function(){
		for( var i in Done ){
			console.log( i );
		}
	}

};

Class.inc.url = {

	args: (function() {
		var url, args, args_, argsArr, hash;

		if ( window.location.search.length === 0 ) return {};

		args_ = window.location.search.slice( 1 );
		args = args_.split( '&' );
		hash = {};

		for ( var i = 0, len = args.length; i < len; i++ ) {
			argsArr = args[ i ].split( '=' );

			argsArr.length === 1 ? hash[ argsArr[ 0 ] ] = true : hash[ argsArr[ 0 ] ] = argsArr[ 1 ];
		};

		return hash;
	})()
};

Class.inc.create = {

	// Create a new Class
	Class: function(){
		return new Class( parent );
	},

	el: function( el ){
		return document.createElement( el );
	},

	div: function(){
		return Class.inc.create.el( 'div' );
	}
}


Class.inc.page = {

	updateCss: function( time, selector ){
		var index, link = [], obj = [];

		Done.each( document.getElementsByTagName('link'), function(){
			if( this.rel === 'stylesheet' ){
				link.push( this );
			}
		});

		if( !selector ){
			obj[0] = link[0];
		}


		if( Done.isNumber( selector ) ){
			index = selector;
			obj[0] = link[ index ];
		}

		if( Done.isString( selector ) && selector === 'all' ){
			obj = link;
		}

		time === 0 ?
			clearInterval( temp.st ):
			temp.st = setInterval(function(){

				Done.each(obj, function(){
					this.href = this.href;
				})

			}, time || 300);

		console.log('Monitoring style update by ' + ( time || 300 ) + 'ms...');
	}
}




// Support
// support = function(){
// 	var input;

// 	input = Class.inc.create.el('input');

// 	//is.placeholder = 'placeholder' in input || false;
// 	console.log(is.placeholder = 'placeholder' in input || false)

// }();




// Dom extend. Test
Class.inc.elementExtend = function(){

	// Array extend
	Done.extend( Array.prototype, {

		get: emArray.get || function( i ) {
			return this[ i ];
		},

		index: emArray.indexOf || function( el ){
			return Class.jQuery.inArray( el, this );
		}
	});

	// Element extend
	Done.extend( window.HTMLElement.prototype, {

		addClass: function( className ){
			if( this.className.indexOf( className ) >= 0 ){
				return;
			}

			else{
				this.className = this.className + ' ' + className;
			}
		},

		removeClass: function( className ){
			if( this.className.indexOf( className ) >= 0 ){
				this.className = this.className.replace( className, '' ).replace( /\s+$/, '' );
			}

			else{
				return;
			}
		},

		toggleClass: function( className ) {
			className = className || 'on';
			
			this.className.indexOf( className ) >= 0 ?
				this.removeClass( className ):
				this.addClass( className );
		},

		css: function( obj ){
			var _this = this;
			Done.each(obj, function( key, value ){
				_this.style[ key ] = value;
			})
		},

		html: function( obj ){
			return obj === '' || obj ?
				this.innerHTML = obj:
				this.innerHTML;
		},

		width: function( obj ){
			return obj === '' || obj ?
				this.style.width = obj:
				this.offsetWidth;
		},

		height: function( obj ){
			return obj === '' || obj ?
				this.style.height = obj:
				this.offsetHeight;
		}
	});


	Done.extend(window.NodeList.prototype, {

		each: function( callback ){
			Done.each( this, callback );
			return this;
		}

	});


	Done.each( ('blur focus focusin focusout load resize scroll unload click dblclick ' +
		'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
		'change select submit keydown keypress keyup error contextmenu').split(' '), function( i, name ) {

		window.HTMLElement.prototype[ name ] = function( fn ){

			arguments.length === 0 ?
				this[ 'on' + name ]() :
				this[ 'on' + name ] = fn;
		}

	});






	return true;
};


// Init Done object
Done = new Class();

// Expose Done to the global object
window.Done = Done;

// Expose Done as an AMD module
typeof define === "function" && define.amd && define( "done", [], function () { return Done; } );
// Expose Done as an SEA module
typeof define === "function" && seajs && define(function(r,e,m){ m.exports = Done });
})();