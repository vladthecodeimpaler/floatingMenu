# floatingMenu

This plugin **requires jQuery!**
floatingMenu is a global-dynamic plugin which means you dont have to worry about dynamically added/created elements.
For performance reasons the plugin clears its own initiation events when not visible.

[**DEMO**](https://vladthecodeimpaler.github.io/floatingMenu/)


icons (optional) - you can use your favourite font package, just provide the icon class in the icon parameter. <br />
note! the demo is using [ionicons](http://ionicons.com/)

**Example usage**

```javascript
    $.floatingMenu({
        selector: 'your-selector',
        items: [
            {
                icon : 'ion-social-youtube',
                title : 'Youtube',
                action : 'https://youtube.com/',
                blank : true, // opens link in new tab (optional)
                close : false, // close the menu after the action happene (optional)
            },
            {
                title : 'google',
                action : 'https://google.com/',
                close : false, // no effect (optional)
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
        ]
    });
```

TODO:

- option whether url opens in new window or same window <br />
- option whether menu closes after clicking an item <br />
- Theming best practices <br />
