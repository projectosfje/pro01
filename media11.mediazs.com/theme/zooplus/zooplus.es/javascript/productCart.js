 /*
	asyncart.js
	- validates input for AddToCart-Value
	- allows adding products asynchronously to cart
	- refreshes MiniCart
	- prepares, changes and handle Notification-Div a.k.a "Cart-Popup"

	13.01.10 Performance improvements & restructuring of functions
	// MarioW
*/

// Global Vars
/*global
$,
document , window, event, navigator,
loctext,
AsyncCart , DWREngine ,
clearTimeout, log
*/
var productCart = {
		articleCount : 0,
		subTotalFormatted : "",
		shippingCostsFormatted : ""
};

var clicked = false,
	doWait=true,
	notvalid = false,
	GLOB_POS = 'absolute',
	savedCart = null,
	actualCart = null,
	noCartRefresh;

var i =0,
	clicked=false,
	timer_3sec = 0,
	timer_8sec = 0,
	mouse_over=false,
	waited_8sec_over=false,
	waited_8sec=false,
	waited_3sec=false,
	started_wait_8sec = false,
	started_wait_3sec = false,
	mouse_clicked = false,
	global_mouseX=300,
	global_mouseY=300,
	usablePoint=null;

/******************************
 * Update the Minicart-View(s)
 ******************************/
productCart.updateCartView = function(){
	$('.miniCart .articleCount').html(productCart.articleCount);

    // to allow working layout with 2/3 portions displayed toggle class depending on article in cart count
    $('.miniCart').toggleClass('js-count_visible', productCart.articleCount > 0);
	$('.miniCart .subTotalFormatted').html(productCart.subTotalFormatted);
	$('.miniCart .shippingCostsFormatted').html(productCart.shippingCostsFormatted);
}

productCart.storeMinicartValues = function(cart){
    if(cart){
        if(typeof cart.articleCount !== "undefined")
            productCart.articleCount = cart.articleCount;
        if(cart.subTotalFormatted)
            productCart.subTotalFormatted = addSpaces(cart.subTotalFormatted);
        if(cart.shippingCostsFormatted)
            productCart.shippingCostsFormatted = addSpaces(cart.shippingCostsFormatted);
    }
}

		
// reset Globals to initial value
function initGlobals(){
	clicked=false;
	timer_3sec = 0;
	timer_8sec = 0;
	mouse_over=false;
	waited_8sec_over=false;
	waited_8sec=false;
	started_wait_8sec = false;
	started_wait_3sec = false;
	waited_3sec=false;
	mouse_clicked = false;
}

// add Space to EUR Values before chanching MiniCart
function addSpaces(inputNumber){
	return inputNumber;
}

// validate Input-Value for changeing Article-Count
function getNumberArticle(articleId) {
    var countElement = 'count_' + articleId;
    var temp = document.getElementById(countElement);

    var value = 1;
    if (temp) {
        var temp2 = temp.value;
		// check if value is a number
        if (temp2 && isFinite(temp2)) {
            value = Math.round(temp2);
            notvalid = false;
		}
	    if (temp2 && !isFinite(temp2) && (temp2!=='') ) {
			notvalid = true;
        }
    }
    return value;
}

// show that product is added already
function displayAddedValue(articleID) {
	// if set to 0 show "normal" cartsymbol
	var countElement = 'count_' + articleID;
	var evalCount = getNumberArticle(articleID);

	// Put it back to the edit box
	var ele = document.getElementById(countElement);
	if (ele){
		ele.value = evalCount;
	}

	clicked = false;
}


/*
*  change the Add to Cart Status icon
*  since the Layout-Images are delivered from MediaServer a generic delimiter "image/" is uses to attach the new icons in the end
* 
* */ 
function setCartIcon(obj, iconPath) {
    var oldImgUrl = obj.attr("src"),
        token = oldImgUrl.indexOf("images/index.html") >= 0 ? "images/" : "image/",
        newUrl = oldImgUrl;

    // touch url only if the URL is ok (contains token)
    if (oldImgUrl.lastIndexOf(token) > 0){
        newUrl = oldImgUrl.substr(0, oldImgUrl.lastIndexOf(token) + token.length) + iconPath;
        obj.attr("src", newUrl);
    }
}


// display animated Cart-Gif while Asyn-Call is ongoing
function animateCart(articleId) {
    setCartIcon($('#cartimg_' + articleId), "a-c/cart_animation.html")
	doWait=true;
}

// show animated Cart at least some time before changing back to Status-Image
function showProductInCartStatus(articleId){
	if (doWait && clicked){
		window.setTimeout("justWait('"+articleId+"')",800);
	}else{
        var countElement = 'count_' + articleId;
        var ele = document.getElementById(countElement);

        if (ele && ele.value > 0){
            setCartIcon($('#cartimg_' + articleId), "a-c/cart_success.html");
            clicked = false;
        }
    }
}

// Deprecated ! - could be consolidated
// start Timer for animated Cart-Image
function justWait(articleId){
	doWait=false;
	//window.alert("func wait");
	showProductInCartStatus(articleId);
}

// stop ongoing Animation and populate that Animation has finished
function stopCartAnimation(articleId){
	clicked = false;
}

// set new Article-Value from cart
function refreshSingleArticleCount(article){

    if ( article ) {
        if (article.couponFreeItem) return;

        var articleId = article.articleId;
        var quantity = article.quantity;
        var $el = $('#count_' + articleId);

        if ($el.length > 0) {
            $el.val(quantity);
            $el.data('count', quantity);

            showProductInCartStatus(articleId);
        }
    }
}

// To put the cart item count to the item edit box - if it's available
function refreshArticlesCount(cartitems) {
    var i = 0;
    if (cartitems && cartitems.length > 0) {
		noCartRefresh = true;
        for (i = 0; i < cartitems.length; i++) {
            refreshSingleArticleCount(cartitems[i]);
        }
		log("refreshArticlesCount() done for "+i+" cartItems");
    }
}

// Change Notification-popup-Content depending on the Status retrieved from the Async AddToCart-process
function refreshCartMsg(cart,cartstatus,diffValue){
	// get headline locresource
	var headlineText = null,
		cartContent  = "";

	// get headline depending on Cart-Status
	switch(cartstatus){
		case 'success': headlineText= loctext["checkout.popup.headline.addedToCart"]; break;
		case 'warning_stock': headlineText=	loctext["checkout.popup.headline.warning"]; break;
		case 'warning': headlineText= loctext["checkout.popup.headline.reducedValue"]; break;
		case 'error'  :	headlineText= loctext["checkout.popup.headline.error"]; break;
		case 'deleted': headlineText= loctext["checkout.popup.headline.deletedFromCart"]; break;
        case 'bonusItem_Warning': headlineText= loctext["checkout.bonusitem.message.error"]; break;
		default		  : headlineText= loctext["checkout.popup.headline.addedToCart"]; break;
	}

	// Set new Title & replace param-placeholder
	if (document.getElementById("cartTitleText")){
		document.getElementById("cartTitleText").innerHTML = headlineText.replace("{0}", diffValue);
	}

	// change Title Background (class)
    $(".cart-popover").removeClass('success');
    $(".cart-popover").removeClass('warning_stock');
    $(".cart-popover").removeClass('warning');
    $(".cart-popover").removeClass('error');
    $(".cart-popover").removeClass('deleted');
    $(".cart-popover").removeClass('bonusItem_Warning');
    $(".cart-popover").addClass(cartstatus);


	// show CART - added OR deleted OR reduced
	if(cartstatus === 'success' || (cartstatus === 'warning') || cartstatus === 'deleted' ){
		// Normal Cart
		cartContent += '<table class="table-cart">';
        cartContent += '<thead><tr><th colspan="2">' + loctext["checkout.popup.checkoutOverview"] + '</th></tr></thead>';
        cartContent += '<tbody>';
		cartContent += '<tr><td class="label" >'+loctext["checkout.popup.quantity"]+'</td><td class="amount"><span id="customerCartCountMsg">'+cart.articleCount+'</span></td></tr>';
		cartContent += '<tr><td class="label" >'+loctext["checkout.popup.shipping"]+'</td><td class="amount"><span id="customerCartShippingMsg">'+cart.shippingCostsFormatted+'</span></td></tr>';
		cartContent += '<tr class="total"><td class="label" >'+loctext["checkout.popup.total"]+'</td><td class="amount"><span id="customerCartValueMsg">'+cart.subTotalFormatted+'</span></td></tr>';
		cartContent += '</tbody>';
	}

	// if not that many Products in Stock get available Amount and display warning
	if(cartstatus === 'warning_stock'){
		//Warning Stock-Count Low
		cartContent += '<p>';
		cartContent += loctext["checkout.popup.message.stockWarning"].replace(/\{0\}/g, diffValue);
		cartContent += '</p>';
	}

	// something goes wrong during AddToCart-Process
	if(cartstatus === 'error'){
		//Error - temporarily not available
		cartContent += '<p>';
		cartContent += loctext["checkout.popup.message.error"];
		cartContent += '</p>'	;
	}
     // According to less points and customer addeed  many produts
    if(cartstatus === 'bonusItem_Warning'){
		//Error - temporarily not available
		cartContent += '<p>';
		cartContent += loctext["checkout.bonusitem.message.error"];
		cartContent += '</p>'	;
	}

	// change Content
	if (document.getElementById("cartContent")){
		document.getElementById("cartContent").innerHTML = cartContent;
	}
}

// Show the Popup in Timeoute-state
function displayPopupTimeout(cart){
	if (mouse_over){
		return false;
	}else{
		//start 8sec Timeout
		clearTimeout( timer_8sec );
		clearTimeout( timer_3sec );
		i++;

		if(!started_wait_3sec){
			timer_3sec = window.setTimeout("set_waited(3)",3000);
			started_wait_3sec = true;
		}
	}
}

// Close/Hide the Popup and clear all Stati & Timeouts that belong to this Popup
function closePopup(){
	//window.alert('ClosePopup');
	clearTimeout( timer_8sec );
	clearTimeout( timer_3sec );

	// detach events
	var popup = document.getElementById('cart_popup');
	//removeEvent(document,"click",watchClick);
	removeEvent(popup,"mouseover",watchMouseOver);
	removeEvent(popup,"mouseout",watchMouseOut);

	// hide popup
    $('.cart-popover').hide();

	clicked=false;
}

// decide if popup should be closed or timeout-state is next
function checkPopupStatusForStateChange(cart){
	if (!mouse_over){
		if ((waited_8sec_over && waited_3sec) || mouse_clicked || waited_3sec || (waited_8sec && (!started_wait_3sec || waited_3sec))){
			closePopup();
		}else{
			if ((waited_8sec_over || (!waited_8sec && started_wait_8sec && !started_wait_3sec))  ){
				displayPopupTimeout(cart);
			}
			// no cart status appears often while timeout is still running - so no problem here
		}
	}

	// set to default
	mouse_clicked = false;
	//waited_8sec_over=false;
	waited_8sec=false;
	waited_3sec=false;
}

// Checks if an Event is Thrown inside a Node-Tree with Parent (parentID) on top
function eventThrownInside(e, objId){

	// get Target of mouseMovement // script from http://www.quirksmode.org/js/events_mouse.html
	var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;

	// theres a firefox Bug that shows up an error if we try to access property of reltg:
	// Error: Permission denied to access property 'xyz' from a non-chrome context
	try{
		while (reltg && reltg.id !== objId && reltg.nodeName !== 'BODY'){
			if (reltg.parentNode){
				reltg = reltg.parentNode;
			}else{
				break;
			}
		}
		// Inside Event Bubbling
		if (reltg && reltg.id && reltg.id === objId) {
			return true;
		}

		// Moved to Outside
		if(reltg && reltg.nodeName && reltg.nodeName === 'BODY'){
			return false;
		}else{
			return true;
		}
	}catch(error){
		return false;
	}
}

// Check for Mouse Over Popup - initiate Status comparation
function watchMouseOver(e){
	if (eventThrownInside(e, 'cart_popup')){
		mouse_over=true;
	}
	if(actualCart && actualCart !== null){
		checkPopupStatusForStateChange(actualCart);
	}
}

// Check for Mouse Out Popup - initiate Status comparation
function watchMouseOut(e){
	//get Area in which the Event is thrown
	if (!eventThrownInside(e, 'cart_popup')){
		mouse_over = false;
	}
	if(actualCart && actualCart !== null){
		checkPopupStatusForStateChange(actualCart);
	}
}

// Check for Mouse Click - initiate Status comparation
function watchClick(e){
	mouse_clicked = true;
	// added check to determine if click is outside popup - to close it imediately
	if (!eventThrownInside(e, 'cart_popup')){
		mouse_over = false;
	}
	if(actualCart && actualCart !== null){
		checkPopupStatusForStateChange(actualCart);
	}
}

// handle Timers and waited/timer status
function set_waited(time){

	if (time === 8){
		if (mouse_over){
			waited_8sec_over = true;
			waited_8sec = true;
		}else{
			waited_8sec = true;
		}
		started_wait_8sec = false;
	}else{
		if (time===3){
			started_wait_3sec = false;
			waited_3sec = true;
		}
	}

	clearTimeout( timer_8sec );
	clearTimeout( timer_3sec );

	// change the Popup Display?
	if(actualCart && actualCart !== null){
		checkPopupStatusForStateChange(actualCart);
		clearTimeout( timer_8sec );
		clearTimeout( timer_3sec );
	}
}

/*
How the Popup should behave

keep popup for 8 sec. least
keep popup displayed while mouse_over
keep popup displayed 3sec after mouse_out
close popup after waited 8 sec && mouse_out
close popup after waited 3 sec && mouse_out after waited 8sec && mouse_over
close popup on pressed popup button
close popup on mouse_out && click
*/

$.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
         top : win.scrollTop(),
         left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};





// Show the Cart-Popup
function displayPopup(cart,cartstatus,count){

	initGlobals();
	actualCart = cart;

	clicked=true;

	// change Popup Content on status
	refreshCartMsg(cart,cartstatus,count);

    updateCartPosition();
    $('.cart-popover').show();

	// register Event-Handler  -- standard.js
	// Check direktion in whitch coursor goes over areas - IN or OUT to set MOUSE_OVER
	var popup = document.getElementById('cart_popup');
	addEvent(document,"click",watchClick);
	addEvent(popup,"mouseover",watchMouseOver);
	addEvent(popup,"mouseout",watchMouseOut);

	//start 8sec Timeout
	clearTimeout( timer_3sec );
	clearTimeout( timer_8sec );
	started_wait_8sec = true;

	timer_8sec = window.setTimeout("set_waited(8)",8000);
}

function updateCartPosition () {
    var $cartPopover = $('.cart-popover');
    var $checkoutBtn = $('#checkoutBtnCart');

    if ($checkoutBtn && $cartPopover) {
        var offsetBtn = $checkoutBtn.offset();
        var widthBtn = $checkoutBtn.outerWidth();
        var heightBtn = $checkoutBtn.outerHeight();
        var widthCart = $cartPopover.width();
        var scrollTop = ($(window).scrollTop() < 0) ? 0 : $(window).scrollTop();
        var newLeftPosition = offsetBtn.left - widthCart + widthBtn - 2;
        var newTopPosition = offsetBtn.top + heightBtn + 2;

        if (!$checkoutBtn.isOnScreen()) {
            newTopPosition = 12;

        } else {
            newTopPosition = newTopPosition - scrollTop;
        }

        $cartPopover.css({'top': newTopPosition, 'left': newLeftPosition});
    }
}

$( window ).scroll(function() {
    if ($('.cart-popover').is(":visible") ) {
        updateCartPosition();
    }
});

// A callback function when article is successfully added
function refreshCartContent(cart, articleId, oldCart) {
		var diffValue = null;
		//oldCart = oldCart ? oldCart : false;

		// Get singleArticleValue from cart
        var singleArticleValue = null,
            totalBonusPoints = 0;
		var i;
        if (cart && cart.articleItems) {
            for (i = 0; i < cart.articleItems.length; i++) {
                if (cart.articleItems[i] && (cart.articleItems[i].articleId === articleId && !cart.articleItems[i].couponFreeItem) && cart.articleItems[i].quantity) {
                    singleArticleValue = cart.articleItems[i].quantity;
                    totalBonusPoints += cart.articleItems[i].quantity * $("#bonusPointsHighlight_"+cart.articleItems[i].articleId).val();
                }
                if (!cart.articleItems[i] || !cart.articleItems[i].articleId || !cart.articleItems[i].quantity) {
                    singleArticleValue = null;
                }
            }
        }

		// Get singleArticleValue from OLD cart
        var oldArticleValue = null;
        if (oldCart && oldCart.articleItems) {
            for (i = 0; i < oldCart.articleItems.length; i++) {
                if (oldCart.articleItems[i] && (oldCart.articleItems[i].articleId === articleId && !oldCart.articleItems[i].couponFreeItem) && oldCart.articleItems[i].quantity) {
                    oldArticleValue = oldCart.articleItems[i].quantity;
                }
                if (!oldCart.articleItems[i] || !oldCart.articleItems[i].articleId || !oldCart.articleItems[i].quantity) {
                    oldArticleValue = null;
                }
            }
        }

		// get Difference NEW - OLD
		if (singleArticleValue){
			//negative Value -> reduce amount (warning)
			diffValue = (oldArticleValue)?(singleArticleValue - oldArticleValue):singleArticleValue;
		}

        // Check if Cart contains the submitted value
        var countElement = 'count_' + articleId,
            ele = document.getElementById(countElement),
            order_status=null,
            articleInput = null,
            iconPath = "a-c/buy.html",
            imgTitle = "",
            totalBonusPoints = totalBonusPoints +  parseInt($("#availBonusPoints").val());

        if (ele && !notvalid) {
			//store articleInput reference only if there is one
            articleInput = $("#cartimg_"+articleId).length != 0 ? $("#cartimg_"+articleId) : null;
			iconPath = "a-c/buy.html";

			// success
			if (singleArticleValue && ((Math.round(ele.value) === singleArticleValue) || (ele.value === ''))){
			   order_status='success';
			}

            //bonusItem_Warning
			if(totalBonusPoints < (( Math.round(ele.value) * ($("#bonusPointsHighlight_"+articleId).val()))) ){
			    order_status='bonusItem_Warning';
			}

			// warning only addeded some OR reduced Value
			if((order_status !== "bonusItem_Warning") && (Math.round(ele.value) !== singleArticleValue) && (Math.round(ele.value) > singleArticleValue) && (Math.round(ele.value) > 0)){
			   diffValue=singleArticleValue;
			   order_status='warning_stock';
			}
			// if reduced value - change diff to actual value (for loc_resource display)
			if (diffValue<0) {
				diffValue=singleArticleValue;
				order_status='warning';
			}
			// error
			if((order_status !== "bonusItem_Warning") && (!singleArticleValue) && (Math.round(ele.value) !== 0)){
			   order_status='error';
			}
			//deleted
			if(singleArticleValue === null && (oldArticleValue > 0) ){
			    order_status='deleted';
				// to be able to display the popup
				diffValue = -1;
			}


        }else{
			// nothing in cart - crap
			if (ele && notvalid && singleArticleValue && oldArticleValue === null){
				order_status='success';
			}
			// 1 in Cart - crap
			if(notvalid && singleArticleValue && oldArticleValue){
				order_status='success';
			}
			// more than 1 in Cart - crap
			if(notvalid && singleArticleValue === 1 && oldArticleValue > 1){
				order_status='success';
			}
		}

		//change Cart Symbol
		iconPath = "a-c/buy.html";
		// channge Tooltip-Text and Status-Image
		if (order_status){
			switch (order_status){
				case 'success':
					iconPath = 'a-c/cart_success.html';
					imgTitle = loctext["checkout.popup.headline.addedToCart"];
					break;
				case 'warning':
					iconPath = 'a-c/cart_warning.html';
					imgTitle = loctext["checkout.popup.headline.reducedValue"];
					break;
				case 'warning_stock':
					iconPath = 'a-c/cart_warning_stock.html';
					imgTitle = loctext["checkout.popup.headline.warning"];
					if (ele) {
						ele.value = singleArticleValue;
					}
					break;
				case 'error'  :
					iconPath = 'a-c/cart_error.html';
					imgTitle = loctext["checkout.popup.headline.error"];
					break;
                case 'bonusItem_Warning'  :
					iconPath = 'a-c/cart_warning.html';
					imgTitle = loctext["checkout.bonusitem.message.error"];
                    if (ele) {
                        ele.value = singleArticleValue;
                    }
					break;
				case 'deleted':
					iconPath = 'a-c/buy.html';
					imgTitle = loctext["checkout.popup.headline.deletedFromCart"];
					break;
			}
		}else{
			if(clicked && articleInput[0]){
				iconPath = 'a-c/buy.html';
			}
		}

        // replace status image & parameters in Locresources
		if(articleInput){
            setCartIcon(articleInput, iconPath);
			articleInput.attr("title", imgTitle.replace("{0}", diffValue));
		}

		// Update cart summary information
        productCart.storeMinicartValues(cart);
		productCart.updateCartView();

        // Set Input Value to added ProductCount
        displayAddedValue(articleId);

        // exclude IE6 & below
		var browser_supports_popup = !$.browser.msie || $.browser.version.split(".")[0] > 6 ;

		// decide if popup should be displayed
		if ( order_status && browser_supports_popup && ((diffValue && ((diffValue !== 0) || order_status === 'deleted' )) || (order_status === "bonusItem_Warning")) ) {
			displayPopup(cart,order_status,diffValue);
		}

		savedCart = cart;
}


// The function which is called when the page is reloaded for the first time
// to initialize the shopping cart.
function reloadCart() {

	if(typeof noCartRefresh === "undefined"){
		noCartRefresh = true;
		log("reloadCart: cart is not up to date and has to be reloaded");
	    // Get the cart content - asynchronously
		$.ajax({
			type: "GET",
			url: "/web/json/getCart.htm",
			dataType: "json",
			success: function(cart){
				refreshCartContent(cart, '','');
                refreshArticlesCount(cart.articleItems);
			}
		});
	}
}

function refreshBonusPointCount(articleId, groupId){
	// check if the updated Article is an Bonuspoints-Article	
	if($("#bonusPoints_"+articleId)[0]){
        var evalCount = getNumberArticle(articleId);
        $.ajax({
            type: "GET",
            url: "/web/json/getTotalBonusPoints.htm?articleId="+articleId+"&quantity="+evalCount,
            dataType: "json",

            success:  function(bPoints){
                if(bPoints != null)
                {
                    $("#availablebonusPoint").html(bPoints.bonuspoints);
                    $("#availBonusPoints").val(bPoints.bonuspoints);
                } else { // if session timed out reload the page to force login
					location.reload(true);
				}				
            },
			error:  function() {
				location.reload(true)
            }
			
        });
	}else{
		// no BP-Article
	}
 }

 function prepareCountValue (articleId) {
     var $input = $('#count_' + articleId);
     var currentCount = $input.val();
     var articleItems = globObj.data.articleItems;

     var currentArticle = null;
     if (articleItems) {
         for (var i = 0; i < articleItems.length; i++) {
             var article = articleItems[i];
             if ( article.articleId == articleId) {
                 currentArticle = article;
                 break;
             }
         }
     }

     var hasSavedArticleCount = false;
     if (currentArticle) {
         var hasSavedArticleCount = true;
     }

     if (currentCount == 0 && !hasSavedArticleCount) {
         $input.val(1);
     }
 }


// To add article to the shopping cart asynchronously
function addArticleToCart(articleId, groupId, location, configurable) {
  if (!clicked) {
        animateCart(articleId);
		clicked = true;

        prepareCountValue(articleId);

		// Check input value
		var evalCount = getNumberArticle(articleId);

		$.ajax({
			type: "GET",
			url: "/web/cart/changeArticleQuantity.htm?articleId="+articleId+"&quantity="+evalCount,
			dataType: "json",
			success: function(cart){
                // Update global object
                var globObj = globObj || window.zooplus;
                if(typeof parseJson === 'function' ){
                    globObj.data = parseJson(cart);
                }

                refreshArticlesCount(cart.articleItems);
                refreshCartContent(cart, articleId, savedCart);
                refreshBonusPointCount(articleId, groupId);

                // trigger object specifying origin from event
                $(globObj).trigger("data_loaded", {origin : 'addArticleToCart'});
			}
		});
    }else{
		clicked=false;
	}
    return false;
}

 /**
  * Get the current cart, shows the popup to the customer and updates minicart information in page
  * @param cartStatus
  * @param count
  */
 function getUpdatedCart(cartStatus, count, showPopup){

     $.ajax({
         type: "GET",
         url: "/web/cart/dynamicData.htm",
         dataType: "json",
         success: function(cart){
             // Update global object
             var globObj = globObj || window.zooplus;
             if(typeof parseJson === 'function' ){
                 globObj.data = parseJson(cart);
             }

            if(showPopup){
                if(typeof cartStatus === 'undefined' || cartStatus == '' || $.trim(cartStatus).length == 0)
                    cartStatus = 'error';
                displayPopup(cart, cartStatus, count);
            }
             productCart.storeMinicartValues(cart);
             productCart.updateCartView();

             // trigger object specifying origin from event
             $(globObj).trigger("data_loaded", {origin : 'showCartPopup'});
         }
     });
 }


 /**
  * Reload to login if content is not SP
  *
  * @param response
  * @param statusCode
  * @param status
  * @param count
  * @param showPopup
  */
 function handleResponse(statusCode, status, count, showPopup) {
     if(statusCode == 200){
         getUpdatedCart(status, count, showPopup);
     } else{
         window.location.reload();
     }
 }


