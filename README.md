Ember Pardon
===========

## About

This Ember mixin is a Get Out of Jail Free Card that injects a 'beforeDestroy' hook and 'pardon'/'unpardon' methods which allow for the halt or continuation of an object's destruction.

## Installation

* `npm install --save-dev ember-pardon`

## Usage
Ember Pardon can be used on any destroyable Ember.Object.

```js
import Ember from 'ember';
import EmberPardon from 'ember-pardon';

Ember.View.reopen(EmberPardon);
```

Please Note:  For Ember.View it is recommended to add globally, because of how Ember organizes and manages virtual parent views.  It is definitely possible to add as a mixin only, but keep in mind that Ember will attempt to destroy the parent view first, before Ember Pardon has a chance to halt destruction.


### Get Out of Jail Free

Ember Pardon gives your objects freedom once each cycle.  It adds the following:

* `beforeDestroy()`
Called before `willDestroy`.  Overriding this function and calling `this.pardon()` will save the object from being destroyed, which includes being removed from the DOM in the case of a View.

* `pardon()`
Retains the object from destruction during this one cycle.

* `unpardon()`
Reverts the object to default behavior, allowing it to be destroyed.

* `_isPardoned` : Private

Private variable that tracks whether or not the object should be pardoned.


### Complete Example

The following creates an example class that pardons the first time `destroy` is called, but will retain original behavior the second time around.

`unpardon()` only exists for those rare times that you want to cancel a previous pardon.  PLEASE NOTE: Pardon and Unpardon are reset after each destroy cycle.

```js
import Ember from 'ember';
import EmberPardon from 'ember-pardon';

Ember.View.reopen(EmberPardon);

var ExampleView = Ember.View.extend({
	shouldStickAround:true,
	beforeDestroy:function(){
		if (this.shouldStickAround){
			this.set('shouldStickAround', false);
			this.pardon();
			return;
		}
		
		/**
		unpardon used here doesn't really do anything
		because nothing was changed above.  Use this
		to cancel out previous calls to pardon().
		**/
		this.unpardon();
		
	}
});
export default ExampleView;
```

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
