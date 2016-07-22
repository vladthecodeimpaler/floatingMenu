(function ($) {
    'use strict';

    // Main Class
    function FloatingMenu (options) 
    {
        this.$this = null;
        this.menuReference = null;
        this.selector = null;
        this.mainClass = 'floating-menu';
        this.markup = "<ul class=" + this.mainClass + "></ul>";
        this.$menuTemplate = null;
        this.floatedTo = null;
        this.$callout = null; // the element that initiated the show event
        this.isVisible = false;

        this.init(options);
    }

    FloatingMenu.prototype = {
        init: function(options) 
        {   
            this.selector = options.selector;
            this.menuReference = Math.random(); // generate a weak random reference
            this.$this = $(this).data('raw', this);
            this.$menuTemplate = $(this.markup).data('menuReference', this.menuReference);

            // generate mennu items
            var $li = null;
            var $a = null;

            options.items.forEach(function(item)
            {
                // cache the action type
                var type = null;
                var href = '#';

                // reset li item
                $li = $("<li></li>");
                
                if(item.action instanceof Function)
                {
                    type = 'fn';
                } 
                else if (typeof item.action === 'string' || item.action instanceof String) 
                {
                    type = 'url';
                    href = item.action;
                } 
                else
                {
                    throw(new Error('floatingMenu: ERROR, invalid action type'));
                    return false;
                }

                $a = $("<a href='" + href + "'>" + item.title + "</a>").click({type: type, item: item}, $.proxy(this.actionHandler, this));

                if(item.icon != undefined)
                {
                    var $span = $('<span></span>').addClass('fm-icon ' + item.icon); 
                    $a.prepend($span);
                }

                $a.data('menuReference', this.menuReference);
                $li.append($a);

                this.$menuTemplate.append($li);
            }, this);
                

            $(document).on('click.show.'+this.menuReference, this.selector, $.proxy(this.calloutHandler, this));
        },

        // Handler for the menu elements click action
        actionHandler: function(event)
        {
            event.preventDefault();

            this.$this.trigger("beforeAction", [event]);

            switch (event.data.type) {
                case ('fn'):
                    event.data.item.action(event);
                    break;
                case ('url'):
                    (event.data.item.blank) ? window.open(event.data.item.action, '_blank') : window.location.assign(event.data.item.action);
                    break;
            }

            if (event.data.item.close !== false)
            {
                this.hide();
            }

            this.$this.trigger("afterAction", [event]);
        },
        // Invoking handler
        calloutHandler: function(event) 
        {
            var $callout = $(event.target);

            // if toggled - hide
            if($callout.attr('data-fm-callout') == 'true')
            {
                this.hide();
                return;
            }

            this.calloutRemoveIsCallout();

            this.$callout = $callout;
            this.$callout.attr('data-fm-callout', 'true');

            this.floatedTo = this.$callout.attr('data-fm-floatTo');

            if(!(['top', 'bottom', 'right', 'left'].indexOf(this.floatedTo) + 1))
            {
                this.floatedTo = 'top';
            }

            this.$menuTemplate.attr('data-fm-floated', this.floatedTo);

            this.show(event);
        },
        // Show the menu
        show : function(event) 
        {
            this.$this.trigger("beforeShow", [event]);

            (function(_self) {
                
                if(!_self.isVisible)
                {
                    _self.$menuTemplate.addClass('animated fadeInPosition').appendTo('body');
                    _self.attachShowEvents();
                } else {
                    _self.$menuTemplate.removeClass('animated fadeInPosition').addClass('visible-transit');
                }

                var calloutPosition = _self.getRelativeToCalloutPos();
                _self.setMenuPosition(calloutPosition.top, calloutPosition.left);

                _self.isVisible = true;

            }(this));

            this.$this.trigger("afterShow", [event]);
        },
        getRelativeToCalloutPos: function() 
        {
            var top = 0;
            var left = 0; 

            var $offset = this.$callout.offset();

            switch (this.floatedTo) {
                case 'bottom':
                    top = $offset.top + this.$callout.height() + 9;
                    left = ($offset.left + this.$callout.width() / 2) - (this.$menuTemplate.width() / 2);
                    break;
                case 'left':
                    top = ($offset.top + this.$callout.height() / 2) - (this.$menuTemplate.height() / 2);
                    left = $offset.left - this.$menuTemplate.width() - 9;
                    break;
                case 'right':
                    top = ($offset.top + this.$callout.height() / 2) - (this.$menuTemplate.height() / 2);
                    left = ($offset.left + this.$callout.width()) +  9;
                    break;
                default:
                    // Default is top
                    top = ($offset.top - this.$menuTemplate.height()) - 9;
                    left = ($offset.left + this.$callout.width() / 2) - (this.$menuTemplate.width() / 2);
                    break;
            }

            return {'top': top, 'left': left};
        },
        setMenuPosition: function(top, left) 
        {
            this.$this.trigger("beforeChangePosition");

            (function(_self) {

                _self.$menuTemplate.css({'top':top,'left':left});

            }(this));

            this.$this.trigger("afterChangePosition");
        },
        // Hide menu and detach unnecessary events
        hide: function() 
        {
            if(!this.isVisible)
            {
                return;
            }

            this.detachShowEvents();

            this.$this.trigger("beforeHide");

            (function(_self) {
                _self.$menuTemplate = _self.$menuTemplate.detach();
                _self.$menuTemplate.attr('class', _self.mainClass);
                _self.isVisible = false;
                _self.calloutRemoveIsCallout();
            }(this));

            this.$this.trigger("afterHide");
        },
        calloutRemoveIsCallout: function(attr)
        {
            if(this.$callout != null)
            {
                this.$callout.removeAttr('data-fm-callout');
                this.$callout = null;
            }
        },
        // Attach show events on display
        attachShowEvents: function() 
        {
            var _self = this;
            
            // Hide event
            $(document).on('click.hide.'+this.menuReference, function(event) 
            {
                if(!$(event.target).is(_self.selector) && $(event.target).data('menuReference') != _self.menuReference)
                {
                    _self.hide();
                }
            });
        },
        // Detach show events on hide
        detachShowEvents: function() 
        {
            // Remove hide event
            $(document).off('click.hide.' + this.menuReference);
        },
        // Remove reference events so that no references are left and it can be picked by the garbage collector
        destroy: function() 
        {
            this.hide();
            // Remove show event
            $(document).off('click.show.' + this.menuReference);
        }
    }

    function Plugin(options) 
    {
        var floatingMenu = new FloatingMenu(options)
        return floatingMenu.$this;
    }

    $.extend({
        floatingMenu: Plugin
    });

}(jQuery));