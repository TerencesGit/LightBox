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
			'<img class="lightbox-img" src="images/1-1.jpg">'+
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
			this.currentIndex = this.popup.find('.lightbox-index');
			this.closeBtn = this.popup.find('.btn-close');
			
		},
		initPopup: function(Obj){
			var self = this;
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
					},function(){
						self.loadImg(sourceSrc)
					}).show()
					
					this.getIndexOf = function(currentId){
						var index = 0;
						$(this.groupData).each(function(i) {
							index = i;
							if(this.id === currentId){
								return false
							}
						});
						return index;
					}
					this.index = this.getIndexOf(currentId);
					console.log(this.index)
					var groupDataLength = this.groupData.length;
					if(groupDataLength>0){
						if(this.index === 0){
							this.prevBtn.addClass('disabled')
							this.nextBtn.removeClass('disabled')
						}else if(this.index === groupDataLength-1){
							this.prevBtn.removeClass('disabled')
							this.nextBtn.addClass('disabled')
						}else{
							this.prevBtn.removeClass('disabled')
							this.nextBtn.removeClass('disabled')
						}
					}
				}
				this.showMask(sourceSrc,currentId);	
				this.loadImg = function(sourceSrc){
					self.popupPic.css({
						width: 'auto',
						height: 'auto'
					}).hide()
					this.preload(sourceSrc,function(){
						self.popupPic.attr('src',sourceSrc)
						var imgWidth = self.popupPic.width(),
								imgHeight = self.popupPic.height();
						self.changeImg(imgWidth,imgHeight)
					})
				}
				this.preload = function(src,callback){
					var img = new Image();
					img.onload = function(){
						callback()
					}
					img.src = src;	
				}	
				this.changeImg = function(width,height){
					var winWidth = $(window).width(),
							winHeight = $(window).height();
					var scale = Math.min(winWidth/(width+10),winHeight/(height+10),1);
					width = width*scale;
					height = height*scale;
					this.picView.animate({
						width: width+10,
						height: height+10
					})
					this.popup.animate({
						width: width+10,
						height: height+10,
						marginLeft: -(width/2),
						top: (winHeight-height)/2
					},function(){
						self.popupPic.css({
							width: width,
							height: height
						}).fadeIn()
						self.picCaption.fadeIn()
					}) 	
					this.captionText.text(this.groupData[this.index].caption)
					this.currentIndex.text("当前索引"+(this.index+1)+"/"+this.groupData.length)
				}
				this.popupMask.on('click',function(){
					self.close()
				})
				this.closeBtn.on('click',function(){
					self.close()
				})
		},
		close: function(){
			this.popupMask.fadeOut();
			this.popup.fadeOut()
		}
	}
	window.LightBox = LightBox;
})(jQuery)