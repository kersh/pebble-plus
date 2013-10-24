/*!
 *
 *  Copyright (c) David Bushell | http://dbushell.com/
 *
 */
(function(window, document, undefined)
{
    
    // helper functions

    var trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    };

    var hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };

    var hasParent = function(el, id)
    {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };

    // normalize vendor prefixes

    var doc = document.documentElement;

    var transform_prop = window.Modernizr.prefixed('transform'),
        transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function() {
            var props = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd otransitionend',
                'msTransition'     : 'MSTransitionEnd',
                'transition'       : 'transitionend'
            };
            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
        })();

    window.App = (function()
    {

        var _init = false, app = { };

        var inner = document.getElementById('content-column-wrapper'),
            inner_option = document.getElementById('option-asset'),
            inner_delete = document.getElementById('option-delete'),

            nav_open = false,
            assets_open = false,
            option_share_open = false,
            option_delete_open = false,

            nav_class = 'js-nav',
            assets_class = 'js-panel',
            option_share_class = 'js-option-share',
            option_delete_class = 'js-option-delete';


        app.init = function()
        {
            if (_init) {
                return;
            }
            _init = true;

            var closeNavEnd = function(e)
            {
                if (e && e.target === inner) {
                    document.removeEventListener(transition_end, closeNavEnd, false);
                }
                nav_open = false;
            };

            var closeAssetsEnd = function(e)
            {
                if (e && e.target === inner) {
                    document.removeEventListener(transition_end, closeAssetsEnd, false);
                }
                assets_open = false;
            };

            var closeOptionShareEnd = function(e) {
                if (e && e.target === inner_option) {
                    document.removeEventListener(transition_end, closeOptionShareEnd, false);
                }
                option_share_open = false;
            };

            var closeOptionDeleteEnd = function(e) {
                if (e && e.target === inner_delete) {
                    document.removeEventListener(transition_end, closeOptionDeleteEnd, false);
                }
                option_delete_open = false;
            };

            app.closeNav =function()
            {
                if (nav_open) {
                    // close navigation after transition or immediately
                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeNavEnd, false);
                    } else {
                        closeNavEnd(null);
                    }
                }
                removeClass(doc, nav_class);
            };

            app.closeAssets =function()
            {
                if (assets_open) {
                    // close navigation after transition or immediately

                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeAssetsEnd, false);
                    } else {
                        closeAssetsEnd(null);
                    }
                }
                removeClass(doc, assets_class);
            };

            app.closeOptionShare = function()
            {
                if (option_share_open) {
                    var duration_share = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner_option, '')[transition_prop + 'Duration']) : 0;
                    if (duration_share > 0) {
                        document.addEventListener(transition_end, closeOptionShareEnd, false);
                    } else {
                        closeOptionShareEnd(null);
                    }
                }
                removeClass(doc, option_share_class);
            };

            app.closeOptionDelete = function()
            {
                if (option_delete_open) {
                    var duration_delete = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner_delete, '')[transition_prop + 'Duration']) : 0;
                    if (duration_delete > 0) {
                        document.addEventListener(transition_end, closeOptionDeleteEnd, false);
                    } else {
                        closeOptionDeleteEnd(null);
                    }
                }
                removeClass(doc, option_delete_class);
            };

            app.openNav = function()
            {
                if (nav_open) {
                    return;
                }
                addClass(doc, nav_class);
                nav_open = true;
            };

            app.openAssets = function()
            {
                if (assets_open) {
                    return;
                }
                addClass(doc, assets_class);
                assets_open = true;
            };

            app.openOptionShare = function()
            {
                if (option_share_open) {
                    return;
                }
                addClass(doc, option_share_class);
                option_share_open = true;
            };

            app.openOptionDelete = function()
            {
                if (option_delete_open) {
                    return;
                }
                addClass(doc, option_delete_class);
                option_delete_open = true;
            };            

            app.toggleNav = function(e)
            {
                if (nav_open && hasClass(doc, nav_class)) {
                    app.closeNav();
                } else {
                    app.openNav();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            app.toggleAssets = function(e)
            {
                if (assets_open && hasClass(doc, assets_class)) {
                    app.closeAssets();
                } else {
                    app.openAssets();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            app.toggleOptionShare = function(e)
            {
                if (option_share_open && hasClass(doc, option_share_class)) {
                    app.closeOptionShare();
                } else {
                    app.openOptionShare();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            app.toggleOptionDelete = function(e)
            {
                if (option_delete_open && hasClass(doc, option_delete_class)) {
                    app.closeOptionDelete();
                } else {
                    app.openOptionDelete();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            // open nav with main "nav" button
            document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);

            // open assets with main "assets" button
            document.getElementById('panel-open-btn').addEventListener('click', app.toggleAssets, false);

            // open and close option share with share button
            document.getElementById('option-share-btn').addEventListener('click', app.toggleOptionShare, false);

            // close nav by touching the partial off-screen content
            document.addEventListener('click', function(e)
            {
                if (nav_open && !hasParent(e.target, 'menu-column')) {
                    e.preventDefault();
                    app.closeNav();
                }
            },
            true);

            document.getElementById('btn-option-asset-delete').addEventListener('click', app.toggleOptionDelete, false);
            document.getElementById('delete-no').addEventListener('click', app.toggleOptionDelete, false);

            addClass(doc, 'js-ready');

        };

        return app;

    })();

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', window.App.init, false);
    }

})(window, window.document);
