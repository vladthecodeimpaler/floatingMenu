# floatingMenu

This plugin **requires jQuery!**
floatingMenu is a global-dynamic plugin which means you dont have to worry about dynamically added/created elements.
For performance reasons the plugin clears its own initiation events when not visible.

[**DEMO**](https://vladthecodeimpaler.github.io/floatingMenu/)

**Example usage**

```javascript
    $.floatingMenu({
        selector: 'your-selector',
        items: [
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