# floatingMenu

This plugin **requires jQuery!** floatingMenu is a global-dynamic plugin which means you dont have to worry about dynamically added/created elements.
For performance reasons the plugin clears its own initiation events when not visible. <br />

[**DEMO**](https://vladthecodeimpaler.github.io/floatingMenu/) <br />

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
            blank : true, // open url in new tab (optional, defaults to false)
            close : false, // dont close the menu after and action has happened (optional, defaults to true)
        },
        {
            title : 'google',
            action : 'https://google.com/',
            close : false, // no effect since there is a redirect (optional)
        },
        {
            title : 'Insert',
            action : function(event) {
                alert('insert');
            },
            blank : true, // no effect since action is not a url (optional, defaults to false)
            close : false, // dont close the menu after and action has happened (optional, defaults to true)
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

<br />
**Events**: beforeAction, afterAction, beforeShow, afterShow, beforeChangePosition, afterChangePosition, beforeHide, afterHide

```javascript
var $fm = $.floatingMenu({ ... });
$fm.on('afterShow', function(event) 
{
    // your code here
});
```

<br />
TODO:

- ~~option whether url opens in new window or same window~~ <br />
- ~~option whether menu closes after clicking an item~~ <br />
- Theming best practices <br />
