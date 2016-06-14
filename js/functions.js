/* global screenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

(function($) {
    var body, masthead, menuToggle, siteNavigation, socialNavigation, siteHeaderMenu, resizeTimer;

    function initMainNavigation(container) {

        // Add dropdown toggle that displays child menu items.
        var dropdownToggle = $('<button />', {
            'class': 'dropdown-toggle',
            'aria-expanded': false
        }).append($('<span />', {
            'class': 'screen-reader-text',
            text: screenReaderText.expand
        }));

        container.find('.menu-item-has-children > a').after(dropdownToggle);

        // Toggle buttons and submenu items with active children menu items.
        container.find('.current-menu-ancestor > button').addClass('toggled-on');
        container.find('.current-menu-ancestor > .sub-menu').addClass('toggled-on');

        // Add menu items with submenus to aria-haspopup="true".
        container.find('.menu-item-has-children').attr('aria-haspopup', 'true');

        container.find('.dropdown-toggle').click(function(e) {
            var _this = $(this),
                screenReaderSpan = _this.find('.screen-reader-text');

            e.preventDefault();
            _this.toggleClass('toggled-on');
            _this.next('.children, .sub-menu').toggleClass('toggled-on');

            // jscs:disable
            _this.attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');
            // jscs:enable
            screenReaderSpan.text(screenReaderSpan.text() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand);
        });
    }
    initMainNavigation($('.main-navigation'));

    masthead = $('#masthead');
    menuToggle = masthead.find('#menu-toggle');
    siteHeaderMenu = masthead.find('#site-header-menu');
    siteNavigation = masthead.find('#site-navigation');
    socialNavigation = masthead.find('#social-navigation');

    // Enable menuToggle.
    (function() {

        // Return early if menuToggle is missing.
        if (!menuToggle.length) {
            return;
        }

        // Add an initial values for the attribute.
        menuToggle.add(siteNavigation).add(socialNavigation).attr('aria-expanded', 'false');

        menuToggle.on('click.twentysixteen', function() {
            $(this).add(siteHeaderMenu).toggleClass('toggled-on');

            // jscs:disable
            $(this).add(siteNavigation).add(socialNavigation).attr('aria-expanded', $(this).add(siteNavigation).add(socialNavigation).attr('aria-expanded') === 'false' ? 'true' : 'false');
            // jscs:enable
        });
    })();

    // Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
    (function() {
        if (!siteNavigation.length || !siteNavigation.children().length) {
            return;
        }

        // Toggle `focus` class to allow submenu access on tablets.
        function toggleFocusClassTouchScreen() {
            if (window.innerWidth >= 910) {
                $(document.body).on('touchstart.twentysixteen', function(e) {
                    if (!$(e.target).closest('.main-navigation li').length) {
                        $('.main-navigation li').removeClass('focus');
                    }
                });
                siteNavigation.find('.menu-item-has-children > a').on('touchstart.twentysixteen', function(e) {
                    var el = $(this).parent('li');

                    if (!el.hasClass('focus')) {
                        e.preventDefault();
                        el.toggleClass('focus');
                        el.siblings('.focus').removeClass('focus');
                    }
                });
            } else {
                siteNavigation.find('.menu-item-has-children > a').unbind('touchstart.twentysixteen');
            }
        }

        if ('ontouchstart' in window) {
            $(window).on('resize.twentysixteen', toggleFocusClassTouchScreen);
            toggleFocusClassTouchScreen();
        }

        siteNavigation.find('a').on('focus.twentysixteen blur.twentysixteen', function() {
            $(this).parents('.menu-item').toggleClass('focus');
        });
    })();

    // Add the default ARIA attributes for the menu toggle and the navigations.
    function onResizeARIA() {
        if (window.innerWidth < 910) {
            if (menuToggle.hasClass('toggled-on')) {
                menuToggle.attr('aria-expanded', 'true');
            } else {
                menuToggle.attr('aria-expanded', 'false');
            }

            if (siteHeaderMenu.hasClass('toggled-on')) {
                siteNavigation.attr('aria-expanded', 'true');
                socialNavigation.attr('aria-expanded', 'true');
            } else {
                siteNavigation.attr('aria-expanded', 'false');
                socialNavigation.attr('aria-expanded', 'false');
            }

            menuToggle.attr('aria-controls', 'site-navigation social-navigation');
        } else {
            menuToggle.removeAttr('aria-expanded');
            siteNavigation.removeAttr('aria-expanded');
            socialNavigation.removeAttr('aria-expanded');
            menuToggle.removeAttr('aria-controls');
        }
    }

    // Add 'below-entry-meta' class to elements.
    function belowEntryMetaClass(param) {
        if (body.hasClass('page') || body.hasClass('search') || body.hasClass('single-attachment') || body.hasClass('error404')) {
            return;
        }

        $('.entry-content').find(param).each(function() {
            var element = $(this),
                elementPos = element.offset(),
                elementPosTop = elementPos.top,
                entryFooter = element.closest('article').find('.entry-footer'),
                entryFooterPos = entryFooter.offset(),
                entryFooterPosBottom = entryFooterPos.top + (entryFooter.height() + 28),
                caption = element.closest('figure'),
                newImg;

            // Add 'below-entry-meta' to elements below the entry meta.
            if (elementPosTop > entryFooterPosBottom) {

                // Check if full-size images and captions are larger than or equal to 840px.
                if ('img.size-full' === param) {

                    // Create an image to find native image width of resized images (i.e. max-width: 100%).
                    newImg = new Image();
                    newImg.src = element.attr('src');

                    $(newImg).on('load.twentysixteen', function() {
                        if (newImg.width >= 840) {
                            element.addClass('below-entry-meta');

                            if (caption.hasClass('wp-caption')) {
                                caption.addClass('below-entry-meta');
                                caption.removeAttr('style');
                            }
                        }
                    });
                } else {
                    element.addClass('below-entry-meta');
                }
            } else {
                element.removeClass('below-entry-meta');
                caption.removeClass('below-entry-meta');
            }
        });
    }

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var timeinterval = setTimeout(function() {
            var t = getTimeRemaining(endtime);
            /*clock.innerHTML = 'days: ' + t.days + '<br>' +
								 'hours: '+ t.hours + '<br>' +
								 'minutes: ' + t.minutes + '<br>' +
								 'seconds: ' + t.seconds;*/
            clock.innerHTML = t.days;
            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }, 400);
    }

    $(document).ready(function() {
        body = $(document.body);

        $('.scrollTo').click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            var url = $(this).attr('href');
            var hash = url.substring(url.indexOf('#'));
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 750);
        });

        $(window)
            .on('load.twentysixteen', onResizeARIA)
            .on('resize.twentysixteen', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    belowEntryMetaClass('img.size-full');
                    belowEntryMetaClass('blockquote.alignleft, blockquote.alignright');
                }, 300);
                onResizeARIA();
            });

        belowEntryMetaClass('img.size-full');
        belowEntryMetaClass('blockquote.alignleft, blockquote.alignright');

        var deadline = '2016-11-13';

        initializeClock('clockdiv', deadline);
        getTimeRemaining(deadline).days

        mapOptions = {
            scrollWheelZoom: false
        }
        var map = L.map('map', mapOptions).setView([48.850209, 2.230284], 18);


        //Define an array of Latlng objects (points along the line)
        var polylinePoints = [
            //new L.LatLng(48.850957, 2.231284),
				new L.LatLng(48.851028, 2.230605),
				new L.LatLng(48.850858, 2.231678),
				new L.LatLng(48.849778, 2.231678),
				new L.LatLng(48.84927, 2.230423),
				new L.LatLng(48.849623, 2.229286),
				new L.LatLng(48.85011, 2.228395),
				new L.LatLng(48.850611, 2.228621),
				new L.LatLng(48.850901, 2.229393),
				new L.LatLng(48.851028, 2.230605),
        ];

        var polylineOptions = {
            color: 'rgba(239, 72, 54, 1)',
            weight: 10,
            opacity: 0.7
        };

        var polyline = new L.Polyline(polylinePoints, polylineOptions);

        map.addLayer(polyline);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);


    });
})(jQuery);
