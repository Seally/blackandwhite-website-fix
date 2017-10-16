// ==UserScript==
// @name         B&W webpage fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix for dull-looking black and white webpages.
// @author       Porama Ruengrairatanaroj
// @match        *://www.mkrestaurant.com/*
// @match        *://www.tescolotus.com/*
// @match        *://www.tops.co.th/*
// @match        *://www.lazada.co.th/*
// @match        *://www.bigc.co.th/*
// @match        *://*.cpfreshmartshop.com/*
// @match        *://scbsonline.settrade.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

window.addEventListener('load', function () {
    'use strict';

    var grayscaleRegexMatch = /grayscale\([^)]*\)/g;

    var unsetGrayscaleFilter = function (elem) {
        if (elem === null) {
            return false;
        }

        try {
            var elemStyle = window.getComputedStyle(elem);
            var watchThis = false;

            if (elemStyle === null) {
                return false;
            }

            if (elemStyle.filter.match(grayscaleRegexMatch).length > 0) {
                elem.style.setProperty("filter", "unset", "important");
                watchThis = true;
            }

            if (elemStyle.webkitFilter.match(grayscaleRegexMatch).length > 0) {
                elem.style.setProperty("-webkit-filter", "unset", "important");
                watchThis = true;
            }

            return watchThis;
        } catch (e) {
            console.log("Failed to process: " + elem);
        }
    };

    unsetGrayscaleFilter(document.body);

    // We can't limit this to <body>, since apparently some ridiculously stupid
    // websites (I'm looking at you, SCB, CP Freshmart) have <div> tags *outside*
    // of the body tag.
    var items = document.getElementsByTagName('*');
    for (var i = 0; i < items.length; ++i) {
        unsetGrayscaleFilter(items[i]);
    }
}, false);