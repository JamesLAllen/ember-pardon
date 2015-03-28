Ember Pardon
===========

## About

This Ember mixin is a Get Out of Jail Free Card that injects a 'beforeDestroy' hook and 'pardon'/'unpardon' methods which allow for the halt or continuation of an object's destruction.

## Installation

* `npm install --save-dev ember-pardon`

## Usage

### As a Mixin or Globally
Ember Pardon can be added to any destroyable Ember Object.  It can be added as a mixin:

```js
import Ember from 'ember';
import EmberPardon from '../mixins/ember_pardon';

// Only add to a specific class as a mixin
var ExampleView = Ember.View.extend(EmberPardon, {
	// ...
});
export default ExampleView;
```

... or reopen classes, say to add to all Views:

```js
import EmberPardon from '../mixins/ember_pardon';

Ember.View.reopen(EmberPardon);
```

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
import EmberPardon from 'mixins/ember_pardon';


var ExampleView = Ember.View.extend(EmberPardon, {
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
