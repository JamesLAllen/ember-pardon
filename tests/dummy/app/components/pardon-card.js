import Ember from 'ember';

export default Ember.Component.extend({
	handleIsPardonedChange:function(){
		console.log('ISPARDONED CHANGED = ', this.get('isPardoned'));
	}.observes('isPardoned'),
	actions:{
		destroyItem:function(){
			this.sendAction('action', this);
			this.destroy();
		}
	}
});
