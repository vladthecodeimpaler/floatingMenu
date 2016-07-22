# floatingMenu

This plugin **requires jQuery!** floatingMenu is a global-dynamic plugin which means you dont have to worry about dynamically added/created elements.
For performance reasons the plugin clears its own initiation events when not visible. <br />

[**DEMO**](https://vladthecodeimpaler.github.io/floatingMenu/) <br />

icons (optional) - you can use your favourite font package, just provide the icon class in the icon parameter. <br />
note! the demo is using [ionicons](http://ionicons.com/)

**Example usage**

```javascript
            },
            {
                title : 'Insert',
                action : function(event) {
                    alert('insert');
                },
                blank : true, // no effect (optional)
                close : false, // close the menu after the action happene (optional)
            },
            {
                title : 'Edit',
                action : function(event) 
                {
                    alert('edit');
                },
            },
            {
                title : 'Remove',
                action : function(event) {
                    alert('remove');
                },
            },
        },
    ]
});
```

<br />
**Events**: beforeAction, afterAction, beforeShow, afterShow, beforeChangePosition, afterChangePosition, beforeHide, afterHide

```javascript
var $fm = $.floatingMenu({ ... });
$fm.on('afterShow', function(event) 
{
    // your code here
});
```

TODO:

- ~~option whether url opens in new window or same window~~ <br />
- ~~option whether menu closes after clicking an item~~ <br />
- Theming best practices <br />
