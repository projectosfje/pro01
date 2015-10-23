/*
 * NOTE: Update URL (Custom Build) + Feature List once you touch this
 *
 * Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csscolumns-input-touch-shiv-teststyles-testprop-testallprops-prefixes-domprefixes
 * Custom Build:
 * - html5shiv 3.6
 * - Detect css Columns
 * - Detect Input Attributes (e.g. placeholder)
 * - Touch Device detection
 */
;window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}function F(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)r[c[d]]=c[d]in j;return r.list&&(r.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),r}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j=b.createElement("input"),k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},p.csscolumns=function(){return E("columnCount")};for(var G in p)x(p,G)&&(u=G.toLowerCase(),e[u]=p[G](),s.push((e[u]?"":"no-")+u));return e.input||F(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e}(this,this.document);

/*
	This Placeholder polyfill adresses keybord / mouse usage & form submit checks to match 
	the placeholder polyfill uses jQuery in some parts for more convenience
	This Placeholder- Fix is a good example for doing safe namespacing (todo) - all the functions and parts
	
	@requires Modernizer with HTML5 Input Attribute check
*/
function activatePlaceholders(modernizr) {
	// dependency missing or Placeholders supported - early fail...
	if (!modernizr || modernizr.input.placeholder) return false;

    var inputs = $("input"),
   		removePlaceholder = function(obj) {
   			// apply polyfill if browser doesnt support functionality
   			if ($(obj).val() == $(obj).attr("placeholder")) {
                   $(obj).val("");
   				// remove class
   				$(obj).removeClass("placeholder");
   			}
   		},
   		restorePlaceholder = function(obj) {
   			if ($(obj).val().length < 1) {
                   $(obj).val($(obj).attr("placeholder"));
   				// add class
   				$(obj).addClass("placeholder");
   			}
   		},
   		preventSubmitPlaceholdertext = function(obj) {
   			// capture the onsubmit event and clear all placeholder fields that where not filled with genuine input
               $(obj).parents("form").bind("submit", function(){
   				//filter to parent form
   				$(this).find("input[placeholder]").each(function(i){
   					var elem = $(this);
   					elem.val(elem.val() == elem.attr("placeholder") ? "" : elem.val());
   				});
   			});
   		};

    inputs.each(function(){
        var inputElem = $(this);

        if (inputElem.attr("type") == "text") {

            if (inputElem.attr("placeholder") && inputElem.attr("placeholder").length > 0) {

                restorePlaceholder(this);

                inputElem.bind("focus.placeholderFix", function(event){
                   removePlaceholder(this);
                   return false;
                });

                inputElem.bind("blur.placeholderFix", function(event){
                   restorePlaceholder(this);
                });

                preventSubmitPlaceholdertext(this);
            }
        }

    });
}

/*
*  Css Columns Fallback for Navigation
*  - if csscolumns feature is not detected to be working - enable fallback
*  - add indicator class "no-csscolumns" to main element to enable fallback style
* */

function reorderBrandsListinTopNavigation(modernizr) {
    "use strict";
    // dependency missing or Placeholders supported - early fail...
    if (!modernizr || modernizr.csscolumns) return false;

    $('.multicolumn').addClass("no-csscolumns");

    var counter = 0,
        listPositions = [],
        nCols = $('.multicolumn').data('column'),
        _listClone = $(".multicolumn > li").clone(true),
        size = _listClone.length,
        nRows = Math.ceil(size/nCols);

    for (var i=0; i<nRows; i++){
        for (var j=0;j<nCols && counter<size;j++){
            var pos = j*nRows+i;
            if(pos <size) {
                listPositions.push(pos);
                counter++;
            }
        }
    }

    /*
    *   Write the Sorted List back to the dom
    * */
     $('.multicolumn > li').remove();
    $.each(listPositions, function (index, id) {
        // if the Item is not existing in the Cloned ItemList or a "filler"-Item add empty li to keep float
        var item = (id || id == 0) ? _listClone.eq(id) : "<li></li>";
        $('.multicolumn').append(item);
    });
}

/*
* Touch Device compliancy
* @requires modernizr touch detection
* Touch Devices should handle major :hover states (e.g. in main Navigation) differently
* */
function enableHeaderNavigationTabHoverForTouchDevices(modernizr) {
    "use strict";
    var p = navigator.platform || null,
        is_iOS = ( p && ( p === 'iPad' || p === 'iPhone' || p === 'iPod' ));

    // ios handles hover on its own no need to intercept all othe Touch devices are treated the same
    if (Modernizr.touch && !is_iOS ){
        // toggle .flyout_active class on Navigation tabs
        // so on a touch device a "Tap" is opening a Flyout first and than only on a second "Tap" executing the link
        $(".nav-element").bind("click.touchEvent", function(event){
            var activeClass = "flyout_active";
            // in case the tab is already active - execute the click
            if ($(this).hasClass(activeClass)) {
                return true;
            } else {
                // if not active
                // deactivate all others
                $(this).siblings().removeClass(activeClass);
                $(this).addClass(activeClass);

                // ... without executing the click
                event.preventDefault();
                return false;
            }
        });
		
		// to allow iOS devices to understand links inside hover-revealed content (flyout), give them an explicit onclick handler
		// Apple dev Resource: http://goo.gl/I8xUX
		//$(".nav-tab a").bind("click.touchEvent", function(){void(0)});
    }
}