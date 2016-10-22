;(function($){
	var LightBox = function(){
		this.rendUI();
		this.bindUI();
		
	}
	LightBox.prototype = {
		rendUI: function(){
			this.body = $(document.body);
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
			this.body.prepend(this.popupMask,this.popup)
		},
		bindUI: function(){
			console.log(this.body)
			self = this;
			this.groupName = null;
			this.groupData = [];
			this.getGroup = function(){
				var self = this;
				var groupList = $(document.body).find("*[data-group="+this.groupName+"]")
				self.groupData.length = 0;
				groupList.each(function(){
					self.groupData.push({
						src: $(this).attr('data-source'),
						id: $(this).attr('data-id'),
						caption: $(this).attr('data-caption')
					})
				})
				//console.log(self.groupData)
			}
			this.body.delegate('.js-lightbox','click',function(e){
				e.stopPropagation()
				var curGroupName = $(this).attr('data-group');
				if(curGroupName != self.groupName){
					self.groupName = curGroupName;
					self.getGroup()
				}
				//初始化弹窗
				self.initPopup($(this))	
			});
			
			this.picView = this.popup.find('.pic-view');
			this.popupPic = this.popup.find('.lightbox-img')
			this.picCaption = this.popup.find('.lightbox-caption')
			this.nextBtn = this.popup.find('.btn-next')
			this.prevBtn = this.popup.find('.btn-prev')
			this.captionText = this.popup.find('.lightbox-desc');
			this.currIndex = this.popup.find('.lightbox-index');
			this.closeBtn = this.popup.find('.btn-close');
			
		},
		initPopup: function(Obj){
				var sourceSrc = Obj.attr('data-source'),
						currentId = Obj.attr('data-id');
				this.showMask = function(sourceSrc,currentId){
					this.popupPic.hide()
					this.picCaption.hide()
					this.popupMask.fadeIn()
					var winWidth = $(window).width(),
							winHeight = $(window).height(),
							viewHeight = winHeight/2 + 10;
					this.picView.css({
						width: winWidth/2,
						height: winHeight/2
					})
					this.popup.css({
						width: winWidth/2 + 10,
						height: viewHeight,
						marginLeft: -(winWidth/2+10)/2,
						top: -viewHeight
					}).animate({
						top: (winHeight-viewHeight)/2
					},500).show()
				}
				this.showMask(sourceSrc,currentId);		
			}
	}
	window.LightBox = LightBox;
})(jQuery)