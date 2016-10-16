(function($) {

    $.fn.notifier = (function() {

        // @private property object icons
        var icons = {
            success: 'fa fa-check',
            info:    'fa fa-info',
            warning: 'fa fa-exclamation',
            failure: 'fa fa-times'
        };


        // @protected method hide
        var show  = function() {};


        // @protected method hide
        var hide  = function() {};


        // @private object notification
        var notification = (function() {
            return {
                styles: {
                    wrapper: 'position:fixed; top: 20px; right: 20px; line-height: 1.2; z-index: 999;',
                    notification: 'opacity: 0.0, display: none; position: relative; width: 320px; padding: 25px; margin-bottom: 20px; z-index: 999; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); transition: all, 0.3s;',
                    title: 'font-size: 30px; text-transform: uppercase;',
                    subtitle: '',
                    icon: 'position: relative; font-size: 32px; padding: 0px 10px 0px 0px;',
                    success: 'background-color: #dff0d8; color: #3c763d;',
                    info: 'background-color: #d9edf7; color: #31708f;',
                    warning: 'background-color: #fcf8e3; color: #8a6d3b;',
                    failure: 'background-color: #f2dede; color: #a94442;'
                },
                globalWrapper: 'body',
                wrapper: 'notifications',
                selector: 'notification',
                init: function() {
                    var $globalWrapper = $(this.globalWrapper);

                    $globalWrapper.css({ position: 'relative' });
                    $globalWrapper.append('<div class="' + this.wrapper + '" style="' + this.styles.wrapper + '"></div>');
                },
                exists: function() {
                    return $('.' + this.wrapper).length > 0;
                },
                getCallbacks: function(callbacks) {
                    callbacks      = typeof callbacks === 'object' ? callbacks : {};
                    callbacks.show = this.getCallback(callbacks['show']);
                    callbacks.hide = this.getCallback(callbacks['hide']);

                    return callbacks;
                },
                getCallback: function(callback) {
                    return typeof callback === 'function' ? callback : function() {};
                },
                getTemplate: function(settings) {
                    var html = '<div class="' + this.selector + ' ' + settings.type + '" data-index="' + settings.index + '" style="' + this.styles.notification + this.styles[settings.type] + '"><p style="' + this.styles.title + '"><span class="icon dashicons ' + settings.icon + '" style="' + this.styles.icon + '"></span>' + settings.args.title + '</p><p style="' + this.styles.subtitle + '">' + settings.args.subtitle + '</p></div>';

                    return html;
                },
                show: function(type, args, callbacks) {
                    
                    // get callbacks
                    callbacks = this.getCallbacks(callbacks);

                    // initialize, if not initialized already
                    if ( ! this.exists() ) {
                        this.init();
                    }

                    // set default notification type
                    if ( ! icons.hasOwnProperty(type) ) {
                        type = 'info';
                    }

                    // set notification settings
                    var settings = {
                        args: args,
                        type: type,
                        icon: icons[type],
                        index: $('.' + this.selector).length
                    };

                    // get notification html
                    var html = this.getTemplate(settings);

                    // append notification to wrapper
                    $('.' + this.wrapper).append(html);

                    // show notification
                    var $notification = $('.' + this.selector + '[data-index="' + settings.index + '"]');
                    $notification.show();

                    // execute global show
                    show();

                    // execute local show
                    callbacks.show();

                    // call hide action
                    this.hide(settings.index, callbacks.hide);
                },
                hide: function(index, callback) {
                    var that = this;

                    setTimeout(function() {
                        if ( $('.' + that.selector + '[data-index="' + index + '"]:hover').length != 0 ) {

                            // call hide recursively
                            that.hide(index, callback);
                        } else {

                            // hide notification
                            var $notification = $('.' + that.selector + '[data-index="' + index + '"]');
                            $notification.hide();

                            // execute global hide
                            hide();

                            // execute local hide
                            callback();
                        }
                    }, 7500);
                }
            }
        })();


        // @public notify
        var notify = function(type, args, delay, callbacks) {
            // set delay
            delay = typeof delay === 'number' && delay > 0 ? delay : 0;

            // show notification with delay
            setTimeout(function() {
                notification.show(type, args, callbacks);
            }, delay);

            // enable cascade
            return this;
        };


        // @public init
        var init = function(args) {

            // configure args
            args = typeof args === 'object' ? args : {};

            // update show callback, if the client has provided one
            if ( typeof args.show === 'function' ) {
                show = args.show;
            }

            // update hide callback, if the client has provided one
            if ( typeof args.hide === 'function' ) {
                hide = args.hide;
            }

            // update icons, if the client has provided icons
            if ( typeof args.icons === 'object' ) {
                icons = args.icons;
            }
        };

        // notify
        return {
            init: init,
            notify: notify
        };
    })();
})( jQuery );