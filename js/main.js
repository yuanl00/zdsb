$(function(){
	function resize() {
		// 获取屏幕宽度
		var windowWidth = $(window).width();
		// 判断屏幕大小,和Bootstrap相关小屏幕
		var isSmallScreen = windowWidth < 768;
		// 根据屏幕大小替换呈现的图骗
		$('#main_ad > .carousel-inner > .item').each(function(index,ele) {

			$ele = $(ele);
			// 获取url地址
			var imgSrc = isSmallScreen ? $ele.data('img-xs') : $ele.data('img-lg');
			// 初始化为PC显示
			$ele.css('background-image','url("' + imgSrc + '")');
			// 以上为正常打开模式，下面为响应式
			if(isSmallScreen) {
				$ele.html('<img src="'+ imgSrc +'" alt="图片内容" />')
			}else{
				$ele.empty();
			};


		});
	};

	// 执行屏幕变化,(让页面打开直接先触发resize,不然就先初始化显示)
	$(window).on('resize',resize).trigger('resize');
	// tooptip 初始化插件
	$('[data-toggle="tooltip"]').tooltip();

	// 设置选项卡总宽度
	var $ulContainer= $('.nav-tabs');
	// 获取所有子元素的宽度和
	var sumW = 30;
	//遍历子元素
	$ulContainer.children().each(function(index,ele) {
		sumW += ele.clientWidth //更加高效，只要一步就完成
		// sum += $(ele).width();
	})
	// 判断当前ul的宽度是否超出了屏幕宽度，如果超出就显示横向滚动
	if(sumW > $(window).width()) {
		$ulContainer.css('width',sumW).parent().css('overflow-x','scroll');
	}

	// 点击强新闻标题
	//a注册点击事件
	var $newsTitle = $('.news-title');
	$('#news .nav-pills a').on('click',function() {
		//获取当前元素
		var $this = $(this);
		//获取对应的title值
		var title = $this.data('title');
		// console.log(title)
		//将title值设置到相应的位置
		$newsTitle.text(title);
	});

	// 轮播图片滑动图片切换
	// 判断手指在轮播图片上的滑动方向
			// touchstart,touchmove,touchend
	//获取所有轮播图片	
	var $carousel = $('.carousel');
	// 注册滑动事件
	var startX,endX;
	var offset = 50;
	// 手指触碰的位置
	$carousel.on('touchstart',function(e){
		// console.log(e.originalEvent.touches[0].clientX) //开始时记录手指锁在坐标，结束时记录手指所在坐标，比大小
		startX = e.originalEvent.touches[0].clientX;
	});
	// 手指移动的最后位置
	$carousel.on('touchmove',function(e){
		endX = e.originalEvent.touches[0].clientX;
	})

	$carousel.on('touchend',function(e){
		// 当运动轨迹大于一定的范围才算是滑动
		 // console.log(startX > endX ? 'left' : 'right');
		 // 控制精度，获取每次的运动距离，大于这个距离认为有方向变化
		 var distance = Math.abs(startX - endX);
		 if(distance > offset) {
		 	// 有方向变化
		 	// console.log(startX > endX ? 'left' : 'right')
		 	//根据获得方向选择上一张或下一张
			$(this).carousel(startX > endX ? 'next' : 'prev');
		 }
	})

	

});