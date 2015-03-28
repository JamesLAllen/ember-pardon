import Ember from 'ember';
import EmberPardon from 'ember-pardon';

Ember.View.reopen(EmberPardon);

export default Ember.Component.extend({
	actions:{
		destroyItem:function(){
			this.sendAction('action', this);
			this.destroy();
		}
	}
});
