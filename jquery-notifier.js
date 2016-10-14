(function($) {

    $.fn.notifier = (function() {

        // @private property object icons
        var icons = null;

        // @protected method hide
        var show  = function() {};

        // @protected method hide
        var hide  = function() {};


        // @private object notifications
        var note = (function() {
            return {
                styles: {
                    wrapper: 'position:fixed; top: 20px; right: 20px; line-height: 1.2; z-index: 999;',
                    notification: 'position: relative; width: 320px; padding: 25px; margin-bottom: 20px; z-index: 999; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); transition: all, 0.3s;',
                    title: 'font-size: 30px; text-transform: uppercase;',
                    subtitle: '',
                    icon: 'position: relative; font-size: 32px; padding: 0px 10px 0px 0px;',
                    success: 'background-color: #dff0d8; color: #3c763d;',
                    info: 'background-color: #d9edf7; color: #31708f;',
                    warning: 'background-color: #fcf8e3; color: #8a6d3b;',
                    failure: 'background-color: #f2dede; color: #a94442;'
                },
                selector: 'notifications',
                init: function() {
                    var that = this;
                    var $wrapper = $('body');

                    $wrapper.css({ position: 'relative' });

                    $wrapper.append('<div class="' + this.selector + '" style="' + that.styles.wrapper + '"></div>');
                },
                exists: function() {
                    return $('.'+this.selector).length > 0;
                },
                getCallbacks: function(callbacks) {
                    callbacks = typeof callbacks === 'object' ? callbacks : {};
                    callbacks.show = this.getCallback(callbacks['show']);
                    callbacks.hide = this.getCallback(callbacks['hide']);

                    return callbacks;
                },
                getCallback: function(callback) {
                    return typeof callback === 'function' ? callback : function() {};
                },
                show: function(type, args, callbacks) {
                    var that = this;
                    callbacks = this.getCallbacks(callbacks);

                    if ( ! this.exists() ) {
                        this.init();
                    }

                    if ( ! icons.hasOwnProperty(type) ) {
                        type = 'success';
                    }

                    var icon = icons[type];

                    var index = $('.notification').length;
                    $('.'+this.selector).append('<div class="notification ' + type + '" data-index="' + index + '" style="' + that.styles.notification + that.styles[type] + '"><p style="' + that.styles.title + '"><span class="icon dashicons ' + icon + '" style="' + that.styles.icon + '"></span>' + args.title + '</p><p style="' + that.styles.subtitle + '">' + args.subtitle + '</p></div>');

                    show();
                    callbacks.show();
                    this.hide(index, callbacks.hide);
                },
                hide: function(index, callback) {
                    var that = this;

                    setTimeout(function() {
                        if ( $('.notification[data-index="' + index + '"]:hover').length != 0 ) {
                            that.hide(index, callback);
                        } else {
                            var $notification = $('.notification[data-index="' + index + '"]');
                            $notification.fadeOut(300, function() {
                                $notification.remove();

                                hide();
                                callback();
                            });
                        }
                    }, 7500);
                }
            }
        })();


        // @public notify
        var notify = function(type, args, delay, callbacks) {
            delay = typeof delay === 'number' && delay > 0 ? delay : 0;

            setTimeout(function() {
                note.show(type, args, callbacks);
            }, delay);

            // enable cascade
            return this;
        };


        // @public init
        var init = function(args) {
            args = typeof args === 'object' ? args : {};

            if ( typeof args.show === 'function' ) {
                show = args.show;
            }

            if ( typeof args.hide === 'function' ) {
                hide = args.hide;
            }

            // set icons
            icons = args['icons'] || {
                success: 'fa fa-check',
                info:    'fa fa-info',
                warning: 'fa fa-exclamation',
                failure: 'fa fa-times'
            };
        };

        // notify
        return {
            init: init,
            notify: notify
        };
    })();
})( jQuery );