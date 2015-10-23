/*global
unescape, escape, 
window, document, navigator,
console
 */

/*
*  @require jQuery Library
* */

// Define global object to be available at any point
var globObj,
    JSON = JSON || {};
window.zooplus = {};
globObj = window.zooplus;

//TODO: REMOVE
globObj.isDebug = false;

// implement JSON.stringify serialization
// http://www.sitepoint.com/javascript-json-serialization/
// credits to Craig Buckler
JSON.stringify = JSON.stringify || function (obj) {
    "use strict";
    var t = typeof (obj);
    if (t !== "object" || obj === null) {
        // simple data type
        if (t === "string") {
            obj = '"'+obj+'"';
        }
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor === Array);
        for (n in obj) {
            if (obj.hasOwnProperty(n)) {
                v = obj[n]; t = typeof(v);
                if (t === "string") {
                    v = '"'+v+'"';
                }
                else if (t === "object" && v !== null) {
                    v = JSON.stringify(v);
                }
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

// implement JSON.parse de-serialization
JSON.parse = JSON.parse || function (str) {
    if (str === "") str = '""';
    eval("var p=" + str + ";");
    return p;
};

function parseJson(jsonObj){
    if (typeof jsonObj !== 'object'){
        if(typeof JSON === 'undefined'){
            return eval('(' + jsonObj + ')');
        }
        return JSON.parse(jsonObj);
    }else{
        return jsonObj;
    }
}

// debug functionality
function log(msg, type){
	var debugEnabled = globObj.isDebug || false;
	// enable for firebug / chrome / ... with user Agent
	if(((navigator.userAgent == "ZOOSP") || (navigator.userAgent == "ZOODEBUG")) && typeof console == 'object'){
		debugEnabled = true;
	}
	
	if(debugEnabled && typeof msg == "string"){
		switch(type){
			case "error":console.error(msg);break;
			case "info" :console.info(msg);break;
			case "warn" :console.warn(msg);break;
			case "log":console.log(msg);break;
			case "debug":console.debug(msg);break;
			default :console.log(msg);break;
		}
	}
}

//suppress ALERT-Window
function alert(message){
	log(message);
}

// shipping_costs popup ... (move to Tools.js)
function shipping_costs(){
	window.open("content/shippingcosts/index8124.html?blank=true","Shipping","height=580,width=710,menubar=no,location=no,resizable=false,scrollbars=yes,status=yes,toolbar=no,top=0");
}

// Cookie interaction
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' '){
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0){
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}
globObj.readCookie = readCookie; //attach to globalObj to namespace function

// old Naming in JSPs - remove here and in DB (empathy scripts use CID)
function getCookie(name){
	readCookie(name);
}

function newCustomer(){
	if (!readCookie('cid')){
		return 1;
	}
	return 0;
}

// generate parametrised AD-Server call
function getZoohippo(siteId, protocoll, host){
	log("getZoohippo", "info");
    siteId = siteId || 1;
    protocoll = protocoll || "https";
    host = host || "www"+window.location.hostname.split("www")[1];
	if (siteId && protocoll != ''){
		document.write(unescape("%3Cscript src='" + protocoll + "://pictures.zooplus.com/zoohippo?id=" + siteId + "&nc=" + newCustomer() + "&host=" + host + "' type='text/javascript'%3E%3C/script%3E"));
	}
}

// inject Maxymiser in the page
function getMaxymiser(){
    log("maxymiser include", "info");
    document.write(unescape("%3Cscript src='//maxymiser.hs.llnwd.net/o36/zooplus/js/mmcore.js' type='text/javascript'%3E%3C/script%3E"));
}

// big product image ... (Tools.js)
function productImage(a) {
	var anewwindow;
	anewwindow	= window.open(a,"Detailansicht","width=430,height=470,resizable=NO");
}

function rebrowse(){window.location.reload();}

// Function for deleting a default value in a text-field
function remove_defaultValue(target){
    target.value = "";
}

// multiple Items per page - change Active / change Values (eg hidden fields)
function changeDisplay(elemId, displayType){
	var elem;
	if(document.getElementById(elemId)){    
	   elem = document.getElementById(elemId);	
	}
	if(elem && displayType){
		elem.style.display = displayType;
	}
}
function changeValue(id, newValue){
	$("#"+id).val(newValue);
}

// change class - use carefully overrides classes... (use jQuery instead)
function classChange(styleChange, item) {
	item.className=styleChange;
}

// css selector modifier ... outdated (use jQuery instead)
function addClass(element, value) {
	$(element).addClass(value)
}
function hasClass(ele,cls) {
    $(ele).hasClass(cls);
}
function removeClass(ele,cls) {
    $(ele).removeClass(cls);
}

function splitStringAtNthTokenPos(str, token, tokenIndex){
	var i=0, before = "", splitStr = [];
	// go through *str until *tokenIndex (nth-position of *token in *str) is reached and return *str split-up in *before & rest_*str
	for(i; i < tokenIndex; i++){
		if(str.indexOf(token) >= 0){
		   var splitpos = str.indexOf(token)+token.length; // get next split pos
		   before = before + str.substr(0,splitpos);
		   str = str.substr(splitpos);
		}else{
			// not reached the token split index - do not split
            log("No Token in Str");
			return null;
		}
	}

	if (str !== "" && before){
		splitStr.push(before);
		splitStr.push(str);
	} else {
		log("splitStringAtNthPos no splitting was done");
		return null;
	}

	return splitStr;
}

// prepare for innerHtml: <tag tagAttributes >text</tag>
// e.g: text="Hallo Welt!" tag="span" tagAttributes="class=\"important\""
function wrapTextInTag(text, tag, tagAttributes){
	var html = "";
	tagAttributes = tagAttributes || "";
	html = "<"+ tag +" "+ tagAttributes +">"+ text +"</"+ tag +">"
	return html;
}

// flexible Eventhandler (addEvent, removeEvent) made by John Resig - http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn )
{
   $(obj).bind(type, fn);
}

function removeEvent( obj, type, fn )
{
   $(obj).unbind(type, fn);
}
/*
	Format given number according to given currency code and locale.
	For further reading, see http://en.wikipedia.org/wiki/Linguistic_issues_concerning_the_euro#Summary
	and http://id.wikipedia.org/wiki/ISO_4217
	@param currencyCode: ISO 4127 currency code
*/
function formatNumber(number, currencyCode, locale)
{
    number = Number(number).toFixed(2);

	var currency;
	switch(currencyCode)
	{
		case "CZK"	: currency = 'K&#269;';break;
		case "GBP"	: currency = '&pound;';break;
		case "PLN"	: currency = 'z&#322;';break;
		case "EUR"	: currency = '&euro;';break;
		default		: currency = currencyCode;break;
	}
	
	if(currencyCode == 'GBP'){
		return currency + number;
	}
	else if(currencyCode == 'EUR'){
		switch(locale){
			case 'de_DE': return  number + ' ' + currency;
			case 'en_GB': return currency + number;
			case 'sk_SK': return number + ' ' + currency;
			case 'ie_IE': return currency + number;
			case 'nl_NL': return currency + ' ' + number;
			default: return number + ' ' + currency;
		
		}
	}
	else {
		return number + ' ' + currency;
	}
	
}


/* include xbrowserfixes 
*
*/
// check for browser support
function hasPlaceholderSupport() {
    "use strict";

    var input = document.createElement('input');
  return ('placeholder' in input);
}

/*
	This Placeholder polyfill adresses keybord / mouse usage & form submit checks to match 
	the placeholder polyfill uses jQuery in some parts for more convenience
	
	This Placeholder- Fix is a good example for doing safe namespacing (todo) - all the functions and parts 
*/
// apply polyfill if browser doesnt support functionality
function removePlaceholder(obj){
    "use strict";

    if (obj.value == obj.getAttribute("placeholder")) {
		obj.value = "";
		// remove class
		$(obj).removeClass("placeholder");
	}
}

function restorePlaceholder(obj){
    "use strict";

    if (obj.value.length < 1) {
		obj.value = obj.getAttribute("placeholder");
		// add class
		$(obj).addClass("placeholder");
	}
}

function preventSubmitPlaceholdertext(obj){
    "use strict";

    // capture the onsubmit event and clear all placeholder fields that where not filled with genuine input
	$(obj).parents("form").bind("submit", function(){
		//filter to parent form
		$(this).find("input[placeholder]").each(function(i){
			var elem = $(this);        
			elem.val(elem.val() == elem.attr("placeholder") ? "" : elem.val());
		});
	});
}

function activatePlaceholders() {
    "use strict";

    if (!hasPlaceholderSupport()){
		var inputs = document.getElementsByTagName("input");
		for (var i=0;i<inputs.length;i++) {
			if (inputs[i].getAttribute("type") == "text") {
			
				if (inputs[i].getAttribute("placeholder") && inputs[i].getAttribute("placeholder").length > 0) {
					restorePlaceholder(inputs[i]);
					
					// attach events
					inputs[i].onfocus = function() {
						removePlaceholder(this);
						return false;
					};
					
					inputs[i].onblur = function() {
						restorePlaceholder(this);
					};
					
					preventSubmitPlaceholdertext(inputs[i]);
				}
			}
		}
	}
}

var eventDispatcher = function (){
    "use strict";

    /*
     *  Mapping all possible (known) TopLevel Category varieties (a.k.a "Gattung") to the singular Pattern
     *  see AnimalType.java for reference
     * */
    var topLevelMap = {
        DOG: "DOG",
        DOGS: "DOG",
        HUND: "DOG",

        CAT: "CAT",
        CATS: "CAT",
        KATZE: "CAT",

        RODENT: "SMALL_ANIMALS",
        RODENTS: "SMALL_ANIMALS",
        SMALLANIMALS: "SMALL_ANIMALS",
        SMALL_ANIMALS: "SMALL_ANIMALS",
        NAGER: "SMALL_ANIMALS",

        BIRD: "BIRDS",
        BIRDS: "BIRDS",
        VOGEL: "BIRDS",

        HORSE: "HORSE",
        HORSES: "HORSE",
        PFERDE: "HORSE",

        FISH: "FISH",
        FISCH: "FISH",

        REPTILES: "REPTILE",
        REPTILE: "REPTILE",
        REPTIL: "REPTILE",

        SPECIALOFFER : "SPECIALOFFER",
        OFFERS : "SPECIALOFFER",
        TOPBRAND : "TOPBRAND",
        BRANDS : "TOPBRAND"

    };

    /*
     * Try to match the given TopLevelCategory tlc to the normalized ones
     *
     * @param tlc (String) TopLevelCategory e.g. HORSES / horse / Pferde etc.
     * @return normalizedTLC (String) uppercased match e.g. HORSE or if no match or wrong datatype return null
     * */
    function normalizeCategory (tlc) {
        if (tlc && typeof tlc === "string") {
            tlc = topLevelMap[tlc.toUpperCase()] || null;
        } else {
            tlc = null;
        }

        return tlc;
    }

    /*
     * Get the Top level category (a.k.a theme) of a nav link
     *  - get it from link, next parent or returns fallback value
     *
     * @param jqLink (jquery) single jQuery link object
     * @return theme (String) Toplevelcategory of given link
     * */
    function topLevelCategory (jqLink) {
        var theme = jqLink.attr("data-toplevelcategory") || jqLink.parents("[data-toplevelcategory]").attr('data-toplevelcategory');

        // handle unmatched categories
        theme = normalizeCategory(theme) || "TopLevelCategory";

        return theme;
    }

    /*
     * Identify wheter the given Link is element of given Navigation Types
     *
     * @param jqLink (jQuery) single jQuery link object
     * @return navId (String) Identifier for the naviagtion e.g. Naviagtion_Top_New or ..._Left
     * */
    function navIdentifierForLink (jqLink) {
        var found = false,
            navId = "Navigation_Unknown";

        // link will have only one matching parent so no break in between
        if (!found && jqLink.parents("#topNavigation")[0]) { navId = "Navigation_Top_New"; }
        if (!found && jqLink.parents(".navigation-orange-middle")[0]) { navId = "Navigation_Left"; }
        if (!found && jqLink.parents(".navipiccontainer")[0]) { navId = "Navigation_Top_Old"; }

        return navId;
    }

    /*
     * Expose the Init Function to the Document rest stays private
     * */
    return {
        /*
         * Intitialize the eventTracking with eventDispatcher.init()
         * @return EventhandlerCount(String)
         * */
        init : function () {
            // using namespaced events + unbind/bind to avoid double binding while initializing twice
            return $("#topNavigation a, .navigation-orange-middle:not(#dyn_nav) a, .navipiccontainer a")
                        .unbind("click.eventdispatcher")
                        .bind("click.eventdispatcher",
                            function () {
                                // fire the async Call to Google Analytics
                                // _gaq.push['_trackEvent', 'category', 'action', 'opt_label', opt_value(Number), opt_noninteraction(Boolean)]
                                var $this = $(this),
                                    eventData = ['_trackEvent', navIdentifierForLink($this), 'Click ' + topLevelCategory($this), $this.attr("href")];

                                window._gaq.push(eventData);
                            }
                        ).length + " click handler attached";
        }
    };
}();


/*global window, document,
 AsyncHighlight*/

//set global interval var
var refreshInterval;
var isFirstReload = true;

function displaySpecialOfferLink(specialofferlinks){
    var innerHtml='';
    var specialOffer = '';
    if (specialofferlinks !== null) {
        specialOffer = specialofferlinks;

        innerHtml+='<div id="specialOfferLink_inner">';
        innerHtml+='<a class="follow3" href="'+specialOffer.path+'">';
        innerHtml+= specialOffer.title+'&nbsp;';
        innerHtml+='</a>';
        innerHtml+='</div>';
    }else if(document.getElementById("tabLeft").className == "active"){
        innerHtml+='<div id="specialOfferLink_inner">';
        innerHtml+='<a class="follow3" href="specialoffers/index.html">';
        innerHtml+= document.getElementById("tabLeft").getAttribute("title")+'&nbsp;';
        innerHtml+='</a>';
        innerHtml+='</div>';
    }
    document.getElementById('specialOfferLink').innerHTML = innerHtml;
}

function displayHighlights(highlights,gattung){
    for (var i=0; i<highlights.length; i++){
        var highlight = highlights[i];

        var innerHtml ='';
        if(highlight !== null){
            var link = highlight.path + '/' + highlight.shopIdentifier;
            innerHtml += '<table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">';
                innerHtml += '<tbody>';
                    innerHtml += '<tr>';
                        innerHtml += '<td align="center" valign="middle" style="height:85px;">';
                            innerHtml += '<a href="'+ link +'" title="' + highlight.title + '">';
                                innerHtml += '<img src="' + highlight.pictureUrl + '" class="special_offer" border="0" alt="">';
                            innerHtml += '</a>';
                        innerHtml += '</td>';
                    innerHtml += '</tr>';
                    innerHtml += '<tr>';
                        innerHtml += '<td height="20px" align="center" valign="top">';
                            innerHtml += '<a href="/feedback'+ link +'">';
                                if(highlight.rating > 0){
                                    innerHtml += '<img src="' + highlight.mediaUrl + '/image/bewertungen/' + highlight.rating + '_star.gif" alt="' + highlight.title + '" border="0">';
                                }
                            innerHtml += '</a>';
                        innerHtml += '</td>';
                    innerHtml += '</tr>';
                    innerHtml += '<tr>';
                        innerHtml += '<td align="center" class="text" style="height:45px;" valign="top">';
                            innerHtml += '<a href="' + link + '" title="">';
                                innerHtml += highlight.title;
                            innerHtml += '</a>';
                        innerHtml += '</td>';
                    innerHtml += '</tr>';
                    innerHtml += '<tr>';
                        innerHtml += '<td align="center" class="text" valign="top">';
                            innerHtml += '<a class="follow3" href="' + link + '" title="">';
                                if(highlight.lrReducedPrice !== null){
                                    innerHtml += '<span class="smalltextPrices">' + highlight.lrStandardPrice + ' <nobr>' + highlight.price + '</nobr></span>';
                                    innerHtml += '<br>';
                                    innerHtml += '<span class="specialPrices">';
                                        innerHtml += highlight.lrReducedPrice + ' ';
                                        innerHtml += '<span itemprop="price">'+ highlight.specialPrice +'</span>';
                                        if(highlight.unitPrice != null){
                                            innerHtml += '<span class="smalltextPrices">';
                                                innerHtml += '<br>';
                                                innerHtml += '(' + highlight.unitPrice + ' / ' + highlight.unit + ')';
                                            innerHtml += '</span>';
                                        }
                                    innerHtml += '</span>';
                                }else{
                                    innerHtml += '<span class="text" itemprop="price">' + highlight.price + '</span>';
                                    if(highlight.unitPrice != null){
                                        innerHtml += '<span class="smalltext">';
                                            innerHtml += '<br>';
                                            innerHtml += '<span style="white-space:nowrap;">';
                                                    innerHtml += '(' + highlight.unitPrice + ' / ' + highlight.unit + ')';
                                            innerHtml += '</span>';
                                        innerHtml += '</span>';
                                    }
                                }
                            innerHtml += '</a>';
                        innerHtml += '</td>';
                    innerHtml += '</tr>';
                innerHtml += '</tbody>';
            innerHtml += '</table>';
        }
        document.getElementById('specialOffer_'+i).innerHTML = innerHtml;

    }

    /*cleanup "wait"-images if not max results are retrieved*/
    var parentContainer = document.getElementById("specialOffersTabs"),
        elementsToCheck = parentContainer.getElementsByTagName('img');

    for(var i=0; i<elementsToCheck.length; i++){
        var str = elementsToCheck[i].id;
        if(str.match("wait")){
            var matchedElement = elementsToCheck[i];
            matchedElement.parentNode.removeChild(matchedElement);
        }
    }

    $.ajax({
            type: "GET",
            url: "/web/json/getSpecialOffer.htm?path="+"/shop"+"&key="+"SHOP.SPECIAL_OFFERS"+"&gattung="+gattung,
            dataType: "json",
            success:function(specialofferlinks){
                displaySpecialOfferLink(specialofferlinks);}}
    );

}



function getHighlights(key,gattung,id){
	// click on highlight category  reset the refreshes the AntisessionTimeout interval
	if(refreshInterval){
		window.clearInterval(refreshInterval);
	}

	//set the correct style for tab
	var tabArray = ["tabLeft", "tabdogs", "tabcats", "tabrodents","tabbirds","tabfish","tabhorses","tabreptiles","tabRight"];
	var j = 0;
	while(j<tabArray.length){
		if (document.getElementById(tabArray[j]) !== null) {
			document.getElementById(tabArray[j]).className = "";
			if (tabArray[j] == id){
				document.getElementById(tabArray[j]).className = "active";
			}
		}
		j++;
	}

	//set the waiting animation for all table cells

	var i = 0;
	while(i<4){
	var innerHtml ='';
		innerHtml+='<table width="100%" height="180px" cellspacing="0" cellpadding="0" border="0" align="center">';
		innerHtml+='<tbody><tr>';
		innerHtml+='<td valign="middle" align="center" style="height: 155px;">';
			innerHtml+='<img id="wait_'+i+'" src="/images/w-z/wait.gif" border="0">';

		innerHtml+='</td>';
		innerHtml+='</tr>';
		innerHtml+='</tbody></table>';
		document.getElementById('specialOffer_'+i).innerHTML = innerHtml;
		i++;
	}

	// workaround to get the 'null' string to real NULL - only if tabLeft (TopAngebote)
	if (id=='tabLeft'){
		gattung="";
		}
    $.ajax({
        type: "GET",
        url: "/web/json/getHighlightImage.htm?key="+key+"&gattung="+gattung,
        dataType: "json",
    success: function(highlights){
        displayHighlights(highlights, gattung);}
    });
    return false;
}


/* Calculate MD5Hash of a String*/
globObj.stringToMD5 = function (s) {
    /*get a MD5Hash out of a string provided*/
    var hexcase = 0,
        chrsz = 8,
        cmc5 = function (x, e) {
            x[e >> 5] |= 0x80 << ((e) % 32);
            x[(((e + 64) >>> 9) << 4) + 14] = e;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var f = a;
                var g = b;
                var h = c;
                var j = d;
                a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = safe_add(a, f);
                b = safe_add(b, g);
                c = safe_add(c, h);
                d = safe_add(d, j)
            }
            return Array(a, b, c, d)
        },
        md5_cmn = function (q, a, b, x, s, t) {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
        },
        md5_ff = function (a, b, c, d, x, s, t) {
            return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
        },
        md5_gg = function (a, b, c, d, x, s, t) {
            return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
        },
        md5_hh = function (a, b, c, d, x, s, t) {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t)
        },
        md5_ii = function (a, b, c, d, x, s, t) {
            return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
        },
        safe_add = function (x, y) {
            var a = (x & 0xFFFF) + (y & 0xFFFF);
            var b = (x >> 16) + (y >> 16) + (a >> 16);
            return (b << 16) | (a & 0xFFFF)
        },
        bit_rol = function (a, b) {
            return (a << b) | (a >>> (32 - b))
        },
        s2b = function (a) {
            var b = Array();
            var c = (1 << chrsz) - 1;
            for (var i = 0; i < a.length * chrsz; i += chrsz) b[i >> 5] |= (a.charCodeAt(i / chrsz) & c) << (i % 32);
            return b
        },
        b2h = function (a) {
            var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var c = "";
            for (var i = 0; i < a.length * 4; i++) {
                c += b.charAt((a[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + b.charAt((a[i >> 2] >> ((i % 4) * 8)) & 0xF)
            }
            return c;
        };

    return b2h(cmc5(s2b(s), s.length * chrsz))
};

/*
 * setClientId
 * Private Function that calculates a Client ID and exposes ist to the global obj
 *
 */
(function (globObj, window, JSON) {
    "use strict";
    var clientID = "unknown_ClientID",
        fingerprint_userAgent = function () {
            return window.navigator.userAgent || "unknown user agent";
        },
        fingerprint_display = function () {
            var screen = window.screen || screen || {};
            return JSON.stringify(screen);
        };
    // try to get ID via cookie otherwise hash client pc details
    if (typeof readCookie === "function"){
        clientID = globObj.readCookie("sid");
    }else{
        clientID = globObj.stringToMD5(fingerprint_userAgent() + fingerprint_display());
    }

    globObj.clientID = clientID;
    return true;
}(globObj, window, JSON));

/* To allow a genric way of indication of "DOM has changed" events
 * - trigger global event "dom_loaded" once the static page has been loaded
 * - because all other scripts are decoupled from fixed "onload" or "ready" event - we can trigger indication of "DOM has been changed" also from dynamic content
 * - this adds support for DOM manipulation via Javascript*/
$(document).ready(function(){
    "use strict";

    /* Cross Browser Checks done by Modernizer
     * triggers fallback functionality if browser does not support the feature */
    if(window.Modernizr){
        activatePlaceholders(window.Modernizr);
        reorderBrandsListinTopNavigation(window.Modernizr);
        enableHeaderNavigationTabHoverForTouchDevices(window.Modernizr);
    }

    showReorderLink();
    setTabsWidth();

    $(globObj).trigger("dom_loaded");

    eventDispatcher.init();
    addPaymentOptionCarouselEvents();
    detectIEVersion();

});

$(globObj).bind("dom_loaded", function(){
    $(globObj).trigger("dom_changed");
});

$(globObj).bind("dom_changed", addInputPlusMinusEvents);

$(globObj).bind("dom_changed", function() {
    $('.openDeliveryDlg')
        .unbind('click')
        .bind('click', openDeliveryDialog);
});


function detectIEVersion() {
    var re,
        rv = -1,
        appName = navigator.appName;

    if(appName == "Microsoft Internet Explorer"){
        re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    }else if(appName == "Netscape"){
        re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    }else{
        return;
    }

    var ua = navigator.userAgent;
    if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);

    if(rv > -1){
        if (rv < 8) $("body").addClass("ie7");
        else $("body").addClass("ie" + rv);
    }

    return rv;
}

function addPaymentOptionCarouselEvents () {
    $(".mzp-payment-options input[type='radio']").bind("click", function() {

        var $paymentOptions = $('.mzp-payment-option');
        var $currentOption = $(this).closest('.mzp-payment-option');

        $paymentOptions.each(function(i) {
           $(this).removeClass('active');
        });

        $currentOption.addClass('active');
    });
}

String.prototype.isValidNumber = function(){return /^\d+$/.test(this);}

function parseIntValue ( el ) {
    var $el = $(el);
    var value = $el.val();
    var fallbackValue = $el.data('count') || 0;
    var newValue = value.isValidNumber() ? value : fallbackValue;

    return newValue;
}

/* Note: This will get called on "dom_changed" event, which may happen more than once. So make sure to
 * un-bind any existing event handlers before binding a new one! */
function addInputPlusMinusEvents () {

    $('.inc-amount')
        .unbind('click')
        .bind('click', function (event) {
        event.preventDefault();

        var $el = $(this);
        var $counter = $el.prev();
        var val = +($counter.val());
        var readonly = $counter.attr('readonly');

        if (readonly) return;

        val = val + 1;

        $counter.val(val);
        $counter.data('count', val);
    });

    $('.dec-amount')
        .unbind('click')
        .bind('click', function (event) {
        event.preventDefault();

        var $el = $(this);
        var $counter = $el.next();
        var val = +($counter.val());
        var readonly = $counter.attr('readonly');

        if (readonly) return;

        val = (val > 1) ? --val : 0;

        $counter.val(val);
        $counter.data('count', val);
    });

    // prepare all article-count field to only accept integer values
    $(".input-group-plus-minus input.article-count")
        .numeric(false)

        // checks if manually pasted input is a valid number, if not sets it to zero
        .unbind('blur')
        .bind('blur', function (event) {
            event.preventDefault();

            $(this).val( parseIntValue(this) );
        })

        .unbind('keypress')
        .bind('keypress', function (event) {
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;

            if ( key == 13 ) $(this).val( parseIntValue(this) );
        });
}

function createModalDialog () {
    var html = '';

    if ($('.modal').length == 0) {
        html += '<div class="modal">';
            html += '<div class="modal-dialog">';
                html += '<div class="modal-content">';
                    html += '<div class="modal-header">';
                        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>';
                        html += '<h4 class="modal-title"></h4>';
                    html += '</div>';
                    html += '<div class="modal-body"><div class="inner"></div></div>';
                html += '</div>';
            html += '</div>';
        html += '</div>';

        $('body').append(html);
        attachModalEvents();
    }

}

function hideModal () {

    $('.modal').hide();
    $('.modal-backdrop').remove();

}

function attachModalEvents () {

    $(document).bind('keydown', function(e) {
        if (e.which == "27") {
            hideModal();
        }
    });

    $('.modal .close').bind('click', function (e) {
        hideModal();
    });

    $('.modal-content').bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('.modal').bind('click', function (e) {
        hideModal();
    });

}

function openDeliveryDialog () {

    createModalDialog();

    $('.modal .modal-body .inner').html( $('#loc-expected-delivery-date-desc').html() );

    $('.modal').show();

}




/*
 *
 * Copyright (c) 2006-2010 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 1.2
 * Demo: http://www.texotela.co.uk/code/jquery/numeric/
 *
 */
(function($) {
    /*
     * Allows only valid characters to be entered into input boxes.
     * Note: does not validate that the final text is a valid number
     * (that could be done by another script, or server-side)
     *
     * @name     numeric
     * @param    decimal      Decimal separator (e.g. '.' or ',' - default is '.'). Pass false for integers
     * @param    callback     A function that runs if the number is not valid (fires onblur)
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @example  $(".numeric").numeric();
     * @example  $(".numeric").numeric(",");
     * @example  $(".numeric").numeric(null, callback);
     *
     */
    $.fn.numeric = function(decimal, callback)
    {
        decimal = (decimal === false) ? "" : decimal || ".";
        callback = typeof callback == "function" ? callback : function(){};
        return this.data("numeric.decimal", decimal).data("numeric.callback", callback).keypress($.fn.numeric.keypress).blur($.fn.numeric.blur);
    }

    $.fn.numeric.keypress = function(e)
    {
        var decimal = $.data(this, "numeric.decimal");
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        // allow enter/return key (only when in an input box)
        if(key == 13 && this.nodeName.toLowerCase() == "input")
        {
            return true;
        }
        else if(key == 13)
        {
            return false;
        }
        var allow = false;
        // allow Ctrl+A
        if((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) return true;
        // allow Ctrl+X (cut)
        if((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) return true;
        // allow Ctrl+C (copy)
        if((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) return true;
        // allow Ctrl+Z (undo)
        if((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) return true;
        // allow or deny Ctrl+V (paste), Shift+Ins
        if((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */
            || (e.shiftKey && key == 45)) return true;
        // if a number was not pressed

        if(key < 48 || key > 57)
        {
            /* '-' only allowed at start */
            //if(key == 45 && this.value.length == 0) return true;
            /* only one decimal separator allowed */
            if(decimal && key == decimal.charCodeAt(0) && this.value.indexOf(decimal) != -1)
            {
                allow = false;
            }
            // check for other keys that have special purposes
            if(
                key != 8 /* backspace */ &&
                    key != 9 /* tab */ &&
                    key != 13 /* enter */ &&
                    key != 35 /* end */ &&
                    key != 36 /* home */ &&
                    key != 37 /* left */ &&
                    key != 39 /* right */ &&
                    key != 46 /* del */
                )
            {
                allow = false;
            }
            else
            {
                // for detecting special keys (listed above)
                // IE does not support 'charCode' and ignores them in keypress anyway
                if(typeof e.charCode != "undefined")
                {
                    // special keys have 'keyCode' and 'which' the same (e.g. backspace)
                    if(e.keyCode == e.which && e.which != 0)
                    {
                        allow = true;
                        // . and delete share the same code, don't allow . (will be set to true later if it is the decimal point)
                        if(e.which == 46) allow = false;
                    }
                    // or keyCode != 0 and 'charCode'/'which' = 0
                    else if(e.keyCode != 0 && e.charCode == 0 && e.which == 0)
                    {
                        allow = true;
                    }
                }
            }
            // if key pressed is the decimal and it is not already in the field
            if(decimal && key == decimal.charCodeAt(0))
            {
                if(this.value.indexOf(decimal) == -1)
                {
                    allow = true;
                }
                else
                {
                    allow = false;
                }
            }
        }
        else
        {
            allow = true;
        }
        return allow;
    }

    $.fn.numeric.blur = function()
    {
        var decimal = $.data(this, "numeric.decimal");
        var callback = $.data(this, "numeric.callback");
        var val = $(this).val();
        if(val != "")
        {
            var re = new RegExp("^\\d+$|\\d*" + decimal + "\\d+");
            if(!re.exec(val))
            {
                callback.apply(this);
            }
        }
    }

    $.fn.removeNumeric = function()
    {
        return this.data("numeric.decimal", null).data("numeric.callback", null).unbind("keypress", $.fn.numeric.keypress).unbind("blur", $.fn.numeric.blur);
    }

    $.fn.serializeObject = function() {
        "use strict";

        var result = {};
        $.each(this.serializeArray(), function(i, element) {
            var node = result[element.name];
			if ('undefined' !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push(element.value);
				} else {
					result[element.name] = [node, element.value];
				}
			} else {
				result[element.name] = element.value;
			}
        });

        return result;
    }

})(jQuery);


/* functionality to scroll a div and then keep it on the top of the page
 * as an example: http://css-tricks.com/scroll-fix-content/ */
function copyZone(el){
	if($("#fix-to-top").length > 0) return;

	var zoneClone = $(el).clone();
	var topZone = $("<div id='fix-to-top'></div>");
	topZone.html(zoneClone.html());
	$("#fix-zone").after(topZone);
}

function fixToTop(){
	var fixTop = $("#fix-to-top");
	var fixZone = $("#fix-zone");
	if($(window).scrollTop() > fixZone.offset().top){
		fixTop.show();
		fixZone.css("visibility", "hidden");
	}else{
		fixTop.hide();
		fixZone.css("visibility", "visible");
	}
}

function scrollThenFix(fixZone){
	copyZone(fixZone[0]); // we can have only 1 fix-zone

	$(window).scroll(function(){
		fixToTop();
	});
}


function setTabsWidth(){
	var isIE8 = $("body").hasClass("ie8") || $("body").hasClass("ie7");
    var navigationWidth = !isIE8 ? $("#topNavigation").innerWidth() : $("#page_margins").width(); // IE8 has issue in getting the right width

    var tabs = $("#topNavigation .nav-tab");
    var tabWidth = Math.floor(navigationWidth / tabs.length, 2); // round down otherwise we risk to have the menu split in 2 lines. We use the extension of the floor function below

    tabs.children(".title").children("h2").css("width", "100%");
    tabs.css("width", tabWidth);
}

function showReorderLink(){
    if(newCustomer() === 0){
        $(".js-reorder").show();
	}
}


// Apply CSRF protection token (request param) to every POSTed form
$(globObj).bind("dom_changed", function() {

    $("form[method='POST']")
        .filter(":not(:has(input[name='X-CSRF-Token']))") // only if the CSRF input is not already there
        .prepend(function() {
            var token = readCookie('csrfToken');

            if(typeof token !== 'undefined' || token !== null)
                return '<input type="hidden" name="X-CSRF-Token" value="' + token + '"/>';
            else
                return '';
        });

});


 // Apply CSRF protection token to every POSTed AJAX request
$(document).ajaxSend(function(event, xhr, options) {
    if (options.type === 'POST') {
        var csrfToken = readCookie('csrfToken');

        if(typeof csrfToken !== 'undefined' || csrfToken !== null)
            xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }
});


// Extend Math.round, Math.ceil and Math.floor to allow for precision
['round', 'floor', 'ceil' ].forEach(function(funcName){
	Math['_' + funcName] = Math[funcName];
	Math[funcName] = function(number, precision)
	{
		precision = Math.abs(parseInt(precision)) || 0;
		var coefficient = Math.pow(10, precision);
		return Math['_' + funcName](number*coefficient)/coefficient;
	}
});
