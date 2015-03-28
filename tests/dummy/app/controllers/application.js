import Ember from 'ember';

export default Ember.Controller.extend({
	itemIndex:6,
	items:[
		'item 0',
		'item 1',
		'item 2',
		'item 3',
		'item 4',
		'item 5'
	],
	actions:{
		addItem:function(){
			this.items.pushObject('item ' + this.get('itemIndex'));
			this.incrementProperty('itemIndex');

		},
		destroyItem:function(item){
			// console.log('destroying item', item);
			this.items.removeObject(item.get('title'));
		}
	}
});
