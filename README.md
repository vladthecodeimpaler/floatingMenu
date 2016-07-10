# floatingMenu

This plugin **requires jQuery!**
floatingMenu is a global-dynamic plugin which means you dont have to worry about dynamically added/created elements.
For performance reasons the plugin clears its own initiation events when not visible.

[**DEMO**](https://vladthecodeimpaler.github.io/floatingMenu/)


icons (optional) - you can use your favourite font package, just provide the icon class in the icon parameter

note! the demo is using [ionicons](http://ionicons.com/)

**Example usage**

```javascript
    $.floatingMenu({
        selector: 'your-selector',
        items: [
            {
            	icon : 'ion-ios-analytics-outline',
            	title : 'Youtube',
                action : 'https://www.youtube.com/'
            },
            {
            	title : 'Insert',
                action : function(event) {
                	alert('insert');
                }
            },
            {
            	title : 'Edit',
                action : function(event) 
                {
                	alert('edit');
                }
            },
            {
            	title : 'Remove',
                action : function(event) {
                    alert('remove');
                }
            },
        ]
    });
```

TODO:

- Theming best practices