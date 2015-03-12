import Ember from 'ember';

var EmberPardon = Ember.Mixin.create({
	beforeDestroy: Ember.K,
	isPardoned:function(){
		return !!this._isPardoned;
	}.property(),
	_isPardoned:null,
	pardon:function(){
		if (this._state === 'destroying'){
			return;
		}
		this._isPardoned = true;
	},
	unpardon:function(){
		if (this._state === 'destroying'){
			return;
		}
		this._isPardoned = null;
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