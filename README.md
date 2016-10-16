
jQuery Notifier ($.notifier) is a light-weight notification plugin, developed by Neven Dyulgerov. The plugin exposes a simple API for displaying notifications for success, warning, info and failure with custom messages. 

$.notifier has been designed with performance in mind. The non-minified version of the plugin is 8 KB, while the minified is just 3 KB. This makes $.notifier a good match for anyone looking for a lean full-featured notification plugin.

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
		$notifier.notify({
			type: 'success',
			title: 'Success',
			subtitle: 'Hey, you made it!'
		});
	});
</script>
```

The above code will initialize a 'success' notification with title 'Success' and subtitle 'Hey, you made it!' and display it immediately on the screen.

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
			.notify({
				type: 'success',
				title: 'Success',
				subtitle: 'Hey, you made it!'
			})
			.notify({
				type: 'info',
				title: 'Info',
				subtitle: 'This is a standard message'
			})
			.notify({
				type: 'failure',
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
			.notify({
				type: 'success',
				title: 'Success',
				subtitle: 'Hey, you made it!',
				delay: 1000
			})
			.notify({
				type: 'info',
				title: 'Info',
				subtitle: 'This is a standard message',
				delay: 2000
			})
			.notify({
				type: 'failure',
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
		$notifier.notify({
			type: 'success',
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

# Options

You can call a notification in three ways. The traditional way is by just calling:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init();
		
		// display notification
		$notifier.notify({
			type: 'success',
			title: 'Success',
			subtitle: 'Hey, you made it!'
		});
	});
</script>
```

The above code will simply initialize a notification and show it on the page right away. 

Alternatively, you can show the notification with a delay as we saw previously:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init();
		
		// display notification with delay
		$notifier.notify({
			type: 'success',
			title: 'Success',
			subtitle: 'Hey, you made it!',
			delay: 1000
		});
	});
</script>
```

The above code will initialize a notification and show it on the page after 1 second.

The third and more advanced option is to show the notification upon event trigger. This can be done, using the 'showOnEvent' parameter:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init();
		
		// display notification when event 'my_app.events.save' is triggered
		$notifier.notify({
			type: 'success',
			title: 'Save',
			subtitle: 'Your data has been successfully saved',
			showOnEvent: 'my_app.events.save'
		});
	});
</script>
```

The above code will initialize a notification and show it on the page, when the event 'my_app.events.save' gets triggered. This way of displaying a notification can be particularly useful if your application is event-driven.

The last example can be further enhanced by adding a delay, like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init();
		
		// display notification when event 'my_app.events.save' is triggered
		$notifier.notify({
			type: 'success',
			title: 'Save',
			subtitle: 'Your data has been successfully saved',
			showOnEvent: 'my_app.events.save',
			delay: 1000
		});
	});
</script>
```

As you might have guessed, the above code will initialize a notification and when the event 'my_app.events.save' gets triggered, the notification will be shown with a delay of 1 second.

By default, $.notifier uses [Font Awesose icons](http://fontawesome.io/) for its icons. If your application doesn't support Font Awesome, you can pass your own icon classes to the plugin upon initialization, like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init({
			icons: {
				success: 'class-for-success',
				info: 'class-for-info',
				warning: 'class-for-warning',
				failure: 'class-for-failure'
			}
		});
		
		// display notification
		$notifier.notify({
			type: 'success',
			title: 'Save',
			subtitle: 'Your data has been successfully saved'
		});
	});
</script>
```

The above code will initialize $.notifier with your custom icon classes.

# Examples

Here's a full-featured example of a success notification:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialize notifier
		$notifier.init();
		
		// display notification
		$notifier.notify({
			type: 'success',
			title: 'Success',
			subtitle: 'Subtitle for the success message...',
			showOnEvent: 'notifier.notify',
			delay: 1000,
			callbacks: {
				show: function() {
					$notifier.notify({
						type: 'info',
						title: 'Show',
						subtitle: 'Notification for the Show callback',
						delay: 1000
					});
				},
				hide: function() {
					$notifier.notify({
						type: 'warning',
						title: 'Hide',
						subtitle: 'Notification for the Hide callback',
						delay: 1000
					});
				}
			}
		});


		// you can trigger the 'success' notification anytime with:
		// $(document).trigger('notifier.notify');
	});
</script>
```

The 'success' notification above will be executed when the event 'notifier.notify' is triggered. The execution will be delayed with 1 second. On the show event of the notification a new 'info' notification will appear with a delay of 1 second. On the hide event of the notification a new 'warning' notification will appear, again with a delay of 1 second.

