/*
---
 
name: Zoomer
description: Class to show zoomed image inside original
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: core:1.2.4:*
provides: Zoomer
 
...
*/

var Zoomer = new Class({
	
	version: '1.6',
	
	Implements: [Options],
	
	options: {
		smooth: 6
	},
	
	initialize: function(element, options){
		this.setOptions(options);
		this.small = document.id(element);
		if(!this.small.complete){
			this.small.addEvent('load', function(){
				this.prepareSmall();
			}.bind(this));
		}else{
			this.prepareSmall();
		}
		var src = this.options.big || this.small.get('big');
		this.big = new Element('img', {src: src}).setStyles({
			position: 'absolute',
			top: 0,
			left: 0,
			opacity: 0,
			cursor: 'crosshair'
		});
		if(!this.big.complete){
			this.big.addEvent('load', function(){
				this.prepareBig();
			}.bind(this));
		}else{
			this.prepareBig();
		}
	},
	
	prepareSmall: function(){
		this.wrapper = new Element('div', {'class': 'zoomer-wrapper'}).wraps(this.small);
		['margin', 'left', 'top', 'bottom', 'right', 'float', 'clear', 'border', 'padding'].each(function(p){
			var style = this.small.getStyle(p);
			var dflt = 'auto';
			if(['float', 'clear', 'border'].contains(p)) dflt = 'none';
			if(p == 'padding') dflt = '0';
			try{
				this.small.setStyle(p, dflt);
				this.wrapper.setStyle(p, style);
			}catch(e){};
		}, this);
		this.wrapper.setStyles({
			width: this.small.offsetWidth,
			height: this.small.offsetHeight,
			position: 'relative',
			overflow: 'hidden'
		});
		this.smallSize = {
			width: this.small.width,
			height: this.small.height
		};
		if(this.bigPrepared){
			this.ready();
		}else{
			this.smallPrepared = true;
		}
	},
	
	prepareBig: function(){
		this.bigSize = {
			width: this.big.width,
			height: this.big.height
		};
		if(this.smallPrepared){
			this.ready();
		}else{
			this.bigPrepared = true;
		}
	},
	
	ready: function(){
		this.big.inject(this.wrapper);
		this.bigWrapper = new Element('div', {'class': 'zoomer-wrapper-big'}).setStyles({
			position: 'absolute',
			overflow: 'hidden',
			top: this.small.offsetTop,
			left: this.small.offsetLeft,
			width: this.small.offsetWidth,
			height: this.small.offsetHeight,
			background: 'url(_)'
		}).wraps(this.big);
		this.bigWrapper.addEvents({
			mouseenter: this.startZoom.bind(this),
			mouseleave: this.stopZoom.bind(this),
			mousemove: this.move.bind(this)
		});
	},
	
	move: function(event){
		this.dstPos = event.page;
	},
	
	startZoom: function(){
		this.position = this.small.getPosition();
		this.timer = this.zoom.periodical(10, this);
		this.big.fade('in');
	},
	
	stopZoom: function(){
		$clear(this.timer);
		this.big.fade('out');
	},
	
	zoom: function(){
		if(!this.dstPos) return;
		var steps = this.options.smooth;
		var current = {
			left: this.big.getStyle('left').toInt(),
			top: this.big.getStyle('top').toInt()
		};
		var dst = {
			left: parseInt((this.dstPos.x - this.position.x) * (1 - this.bigSize.width/this.smallSize.width)),
			top: parseInt((this.dstPos.y - this.position.y) * (1 - this.bigSize.height/this.smallSize.height))
		};
		var now = {
			left: current.left - (current.left - dst.left)/steps,
			top:  current.top - (current.top - dst.top)/steps
		};
		this.big.setStyles(now);
	}
	
});
