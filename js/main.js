;(function($){
	var LightBox = function(){
		this.rendUI();
		this.bindUI();
	}
	LightBox.prototype = {
		rendUI: function(){
			console.log(this)
			this.popupMask = $('<div class="lightbox-mask"></div>');
			this.popup =$('<div class="lightbox-popup"></div>');
			this.popupContent = $('<div class="pic-view">'+
			'<img class="lightbox-img" src="images/1-1.jpg" alt="">'+
			'<span class="switch btn-prev btn-prev-show"></span>'+
			'<span class="switch btn-next btn-next-show"></span>'+
		'</div>'+
		'<div class="lightbox-caption">'+
			'<p class="lightbox-desc">图片标题</p>'+
			'<p class="lightbox-index">图片索引: 1/4</p>'+
			'<a href="javascript:;" class="btn-close">&times;</a>'+
		'</div>')
			this.popup.html(this.popupContent)
			$(document.body).prepend(this.popupMask,this.popup)
		},
		bindUI: function(){

		}
	}
	window.LightBox = LightBox;
})(jQuery)