
/**
 * JSON/P callback function that is called by the Certona Resonance hosted tag.
 */
function resonanceCallback(args){

    $(args.resonance.schemes).each(function(index, scheme){

        var recoTitleId = 'reco-title-' + scheme.scheme;

        if(scheme.display === "no" || scheme.items.length === 0){
            // if we have no data, don't show the recomandation box nor the title
            $("#"+recoTitleId).remove();
            $("[data-reco-scheme='" + scheme.scheme + "']").remove();
            return;
        }

        scheme.addToCart = (typeof addToCartText !== "undefined" ? addToCartText : ""); // need it for the buy button

        $.each(scheme.items, function(index, item) {
            prepareDisplayItem(item, locale);
        });

        $("[data-reco-scheme='" + scheme.scheme + "']")
            .each( function(index, container) {
                var recoTemplate = $(container).attr("data-reco-template"),
                    templateHtml = $("#"+recoTemplate);

                $(container).attr("name", scheme.scheme); // it is needed for the tests

                $("#"+recoTitleId).show();

                $(templateHtml).tmpl(scheme)
                    .appendTo(container);
            });

        $(globObj).trigger("dom_changed");
    });
}


function prepareDisplayItem(item, locale) {
    item.standardPriceText = (item.standardPrice > 0 ? formatPrice(item.standardPriceLabel, item.standardPrice, item.currency, locale) : "");

    item.styleSalePrice = (item.standardPrice > 0 ? "specialPrices" : "text");
    item.reducedPriceText = (item.reducedPrice > 0 ? formatPrice(item.reducedPriceLabel, item.reducedPrice, item.currency, locale) : "");

    item.pricePerUnitPriceText = (item.pricePerUnit > 0 && item.unit !== "" ? "( " + formatPrice("", item.pricePerUnit, item.currency, locale) + " / " + item.unit + " )" : "");

    item.rating = mediaServerDomainUrl + '/image/bewertungen/' + item.rating + '_star.gif';
    item.feedbackUrl = "/feedback" + item.detailURL;

	item.shortName = (item.name.length > 39 ? item.name.substring(0, 39) + "..." : item.name);
}


/**
 * Construct a full picture URL from the given picture path.
 */
function constructFullPictureURL(picturePath, size) {

    // The subdirectory is the last part of the filename before the extension, and after the final underscore.
    var subDir = picturePath.slice(
        picturePath.lastIndexOf('_') + 1, picturePath.lastIndexOf('.'));

    return '//' + mediaServerHostName + '/bilder/' + subDir + '/' + size + '/' + picturePath;
}

function formatPrice(priceLabel, price, currency, locale) {
    var formattedPrice = "";
    if (typeof ExoPriceFormatter !== 'undefined') {
        var formatter = new ExoPriceFormatter({
            prefix: zooplusLocale.currencySymbolAfterPrice ? "" : zooplusLocale.currencySymbol + " ",
            thousandsSeparator: zooplusLocale.thousandsSeparator,
            decimalSeparator: zooplusLocale.decimalSeparator,
            decimalPlaces: 2,
            suffix: zooplusLocale.currencySymbolAfterPrice ? " " + zooplusLocale.currencySymbol : ""
        });
        formattedPrice =  formatter.format(parseFloat(price).toFixed(4));
    } else {
        locale = locale.replace("_", "-");
        price = Number(price);
        formattedPrice = price.toLocaleString(locale, {style: "currency", currency: currency, minimumFractionDigits: 2});
    }

    return formatString(priceLabel, [ formattedPrice ]);
}


function formatString(format, args) {
	if(format === "") return args.join(" ");

    return format.replace(/\{(\d+)\}/g,
        function(match, g1) { return args[Number(g1)]; }
    );
}
