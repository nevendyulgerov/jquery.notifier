
jQuery Notifier ($.notifier) is a light-weight notification plugin, developed by Neven Dyulgerov. The plugin exposes a simple API for displaying notifications for success, warning, info and failure with custom messages. 

$.notifier has been designed with performance in mind. The non-minified version of the plugin is 7 KB, while the minified is just 3 KB. This makes $.notifier quite useful if you want minimum overhead to your code base.

# Requirements

jQuery (1.6 or higher)


# Getting Started

You can clone or download $.notifier from this repository. The download includes a non-minified and minified version of the plugin.

$.notifier requires jQuery to work. So, make sure that you have jQuery included on your page before loading the plugin:

```javascript
<script type="text/javascript" src="path-to-jquery/jquery.js"></script>
```

To include the minified version of the plugin on your page, simply add:

```javascript
<script type="text/javascript" src="path-to-plugin/jquery-notifier.min.js"></script>
```

To include the non-minified version of the plugin, add:

```javascript	
<script type="text/javascript" src="path-to-plugin/jquery-notifier.js"></script>
```

Alternatively, you can include the plugin in an async manner, like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function() {
	
		// define path to jquery-notifier
		var pluginUrl = 'path-to-plugin/jquery-notifier.js';
		
		// get plugin asynchronously
		$.getScript(pluginUrl, function() {
			// the plugin is loaded and ready to use
			
			// your code goes here...
		});
	});
</script>
```


# How to Use

You can use $.notifier like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init();
		
		// display notification for success
		$notifier.notify('success', {
			title: 'Success',
			subtitle: 'Hey, you made it!'
		});
	});
</script>
```

$.notifier supports the cascade pattern, so you can chain notifications like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init();
		
		// display chained notifications
		$notifier
			.notify('success', {
				title: 'Success',
				subtitle: 'Hey, you made it!'
			})
			.notify('info', {
				title: 'Info',
				subtitle: 'This is a standard message'
			})
			.notify('failure', {
				title: 'Error',
				subtitle: 'This is your typical error message' 
			});
	});
</script>
```

You can also define a delay for each notification like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init();
		
		// display chained notifications with delay
		$notifier
			.notify('success', {
				title: 'Success',
				subtitle: 'Hey, you made it!',
				delay: 1000
			})
			.notify('info', {
				title: 'Info',
				subtitle: 'This is a standard message',
				delay: 2000
			})
			.notify('failure', {
				title: 'Error',
				subtitle: 'This is your typical error message', 
				delay: 3000
			});
	});
</script>
```

In the example above, the 'success' notification will appear after 1 second, the 'info' notification will appear after 2 seconds and the 'failure' notification after 3 seconds.

# Callbacks

You can can pass callbacks to notifier in two ways:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier with 'global' callbacks
		$notifier.init({
			show: function() {
				console.log('This callback will be executed every time a notification is opened');
			},
			hide: function() {
				console.log('This callback will be executed every time a notification is closed');
			}
		});
		
		// display notification with 'local' callbacks
		$notifier.notify('success', {
			title: 'Success',
			subtitle: 'Hey, you made it!',
			callbacks: {
				show: function() {
					console.log('This callback will be executed when this notification is opened');
				},
				hide: function() {
					console.log('This callback will be executed when this notification is closed.');
				}
			}			
		});
	});
</script>
```

The global callbacks will be executed everytime a notification is shown/hidden. The local callbacks, however, will be executed only when their notification is show/hidden.
