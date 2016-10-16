
jQuery Notifier ($.notifier) is a light-weight notification plugin, developed by Neven Dyulgerov. The plugin exposes a simple API for displaying notifications for success, warning, info and failure with custom messages.

# Requirements

jQuery (1.6 or higher)


# Getting Started

You can clone or download $.notifier from this repository. The download includes a non-minified and minified version of the plugin.

To include the minified version of the plugin on your page, simply add:

```javascript
<script type="text/javascript" src="path-to-plugin/jquery-notifier.min.js"></script>
```

To include the non-minified version of the plugin, add:

```javascript	
<script type="text/javascript" src="path-to-plugin/jquery-notifier.js"></script>
```

# How to Use

You can use $.notifier like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var $notifier = $('body').notifier;
		
		// initialze notifier
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
		
		// initialze notifier
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
		
		// initialze notifier
		$notifier.init();
		
		// display chained notifications with delay
		$notifier
			.notify('success', {
				title: 'Success',
				subtitle: 'Hey, you made it!'
			}, 1000)
			.notify('info', {
				title: 'Info',
				subtitle: 'This is a standard message'
			}, 2000)
			.notify('failure', {
				title: 'Error',
				subtitle: 'This is your typical error message' 
			}, 3000);
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
		
		// initialze notifier with 'global' callbacks
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
			subtitle: 'Hey, you made it!'
		}, 0, {
			show: function() {
				console.log('This callback will be executed when this notification is opened');
			},
			hide: function() {
				console.log('This callback will be executed when this notification is closed.');
			}
		});
	});
</script>
```

In the example above, notice the 3rd argument - 0. This is the value for the delay. When adding callbacks for show/hide, you need to explicitly define the delay for the notification. In case you do not want a delay, simply set the delay to 0 or null.
