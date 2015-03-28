import Ember from 'ember';

var EmberPardon = Ember.Mixin.create({
	beforeDestroy: Ember.K,
	isPardoned:false,
	_isPardoned:false,
	_pardonedChildren:Ember.A(),
	_pardonOnPardonChange:function(){
		this._setPardon(this.get('isPardoned'));
	}.observes('isPardoned'),
	_setPardon:function(value){
		this._isPardoned = value;
		this.set('isPardoned', value);
		this._pardonCheckVirtualParent();
	},
	_pardonCheckVirtualParent:function(){
		if (!this._parentView){
			return;
		}
		if (!this._parentView.isVirtual || !EmberPardon.detect(this._parentView)){
			return;
		}
		if (this._isPardoned){
			this._parentView.pardonChild(this);
			return;
		}
		this._parentView.unpardonChild(this);
	},
	init:function(){
		this._super.apply(this, arguments);
		this._isPardoned = this.get('isPardoned');
	},
	pardon:function(){
		if (this._state === 'destroying'){
			return;
		}
		this._setPardon(true);
		this._pardonCheckVirtualParent();
	},
	unpardon:function(){
		if (this._state === 'destroying'){
			return;
		}
		this._setPardon(false);
	},
	pardonChild:function(child){
		this._pardonedChildren.addObject(child);
		this._setPardon(true);
	},
	unpardonChild:function(child){
		this._pardonedChildren.removeObject(child);
		if (this._pardonedChildren.length <= 0){
			this._setPardon(false);
		}
	},
	destroy:function(){
		if (this._state === 'destroying'){
			this._super.apply(this, arguments);
			return;
		}
		this.beforeDestroy();
		if(this._isPardoned){
			this.unpardon();
			return;
		}
		this._super.apply(this, arguments);
	},
});

export default EmberPardon;