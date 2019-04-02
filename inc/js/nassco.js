(function () {
	"use strict";
jQuery.noConflict();


var $window = jQuery(window),
	$iScroll,
	$activeNum,
	$lazy,
	$lazynofade,
	$parallax = jQuery('#parallax'),
	$minheight = 600,
	$minwidth = 576,
	$lazydesktop,
	isIE = /*@cc_on!@*/false || !!document.documentMode;	
	
//////////////////0/////////1////////2//////3///////4///////5///////6///////7////////8///////9//////10///////11/////12
var $sections = ['intro', '1900', '1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', 'end'];
	
//////////////////////////////INIT HORZ SCROLL
function initVerticalScroll() {	
	resetTransforms();
}
	
//////////////////////////////INIT HORZ SCROLL
function initHorizontalScroll() {
	
	resetTransforms();
	$iScroll = new IScroll('#wrapper', {
		probeType: 3,
		deceleration:0.01,
		scrollX: true, 
		scrollY: false, 
		mouseWheel: true,
		mouseWheelSpeed:20,
		bounce:false,
		responsive:true,
		click:true,
	});	
	
	$iScroll.on('scrollStart', function () {
		if (!jQuery('body').hasClass('hide-mouse')) {
			jQuery('body').addClass('hide-mouse');
			hideMouse();
		}
	});
	
	$iScroll.on('scroll', function () {
		$window.trigger('scroll');	
		jQuery('.slide').isInViewport().addClass('in-viewport active');

		if (!jQuery('body').hasClass('nav-scrolling')) {					
			$activeNum = jQuery('.slide').isInViewport().data('section');
			
			
			checkNav($activeNum);
		}
		
	});
	
	if(!isIE) {
		$parallax.stellar({
			verticalScrolling: false,
			responsive:false,
			scrollProperty: 'transform',
			positionProperty: 'transform',
			hideDistantElements: false
		});
	}
	

	$parallax.find('.slide').isInViewport().addClass('in-viewport');
	$activeNum = jQuery('.slide').isInViewport().data('section');
	checkNav($activeNum);
	//$iScroll.scrollTo(0, 0);
	jQuery( '.footer-nav-wrap' ).addClass('in-view');
}

//////////////////////////////DELETE HORZ SCROLL
function deleteScroll() {
	$iScroll.scrollTo(0, 0);
	resetTransforms();
	$iScroll.scrollTo(0, 0);
	$iScroll.destroy();
	if(!isIE) {
		$parallax.data('plugin_stellar').destroy();
		$parallax.stellar('destroy');
	}

	resetTransforms();
}
	
//////////////////////////////ARROW AND MOUSE
function checkNav(num) {
	//NAV
	jQuery('.nav-item').each(function() {
		if (jQuery(this).data('section') == num) {
			jQuery(this).addClass('active');
		} else {
			jQuery(this).removeClass('active');
		}
	});
	
	//ARROWS
	jQuery('.nav-arrow').removeClass('disable');
	if(num == 0) {
		jQuery('.prev-arrow').addClass('disable');
	}
	if(num>=($sections.length-1)) {
		jQuery('.next-arrow').addClass('disable');
	}
}
	
function resetTransforms() {
	jQuery('*[data-stellar-ratio]').each(function() {
		jQuery(this).attr("style","");		
	});
}

function showMouse() {
	jQuery('.nav-animation').addClass('active');
}
function hideMouse() {
	jQuery('.nav-animation').addClass('fadeout active');
}
	

////////////////////////////////////MOBILE NAV
	
jQuery('ul.mobile-menu a').on('click', function(){
    jQuery('.mobile-menu-wrap').collapse('hide');
});

///////////////////////////////////FOOTER NAV
jQuery('ul.footer-nav li.nav-item').bind('click',function(event){
	
	if (!jQuery('body').hasClass('nav-scrolling')) {
		jQuery('body').addClass('nav-scrolling');		
		event.preventDefault();
		event.stopPropagation();		
		if (!jQuery('body').hasClass('hide-mouse')) {
			jQuery('body').addClass('hide-mouse');
			hideMouse();
		}
		var $anchor = jQuery(this).data('section'),
			$slidestop = jQuery("#timeline-"+$sections[$anchor]).position().left+10;		
		
		jQuery('.nav-item').removeClass('active');
		jQuery(this).addClass('active');

		$iScroll.scrollTo(-$slidestop, 0, 700,IScroll.utils.ease.quadratic);
		setTimeout(function(){ 
			jQuery('body').removeClass('nav-scrolling');
		}, 900);
	}	
});

	
///////////////////////////////////ARROW NAV
	
jQuery('.nav-arrow').bind('click',function(event){
	if (!jQuery('body').hasClass('nav-scrolling')) {
		jQuery('body').addClass('nav-scrolling');
		event.preventDefault();
		event.stopPropagation();
		
		if (!jQuery('body').hasClass('hide-mouse')) {
			jQuery('body').addClass('hide-mouse');
			hideMouse();
		}		

		var $slidestop, $nextNum;		
		$activeNum = jQuery('.slide').isInViewport().data('section')

		if(jQuery(this).hasClass('prev-arrow')) {
			$nextNum = $activeNum -1;			
		} else {
			$nextNum = $activeNum +1;
		}		
		checkNav($nextNum);		
		$slidestop = jQuery("#timeline-"+$sections[$nextNum]).position().left+10;	

		$iScroll.scrollTo(-$slidestop, 0, 700,IScroll.utils.ease.quadratic);
		setTimeout(function(){ 
			jQuery('body').removeClass('nav-scrolling');
		}, 900);
	}
	
});	

////////////////////////////LOAD CONTENT
$window.load(function () {
	
	if($window.width() >= $minwidth && $window.height() >= $minheight) {		
		
		jQuery('#loading-screen').delay(500).animate({'opacity':0},300,function(){ 
			jQuery('#loading-screen').css({'display':'none'});
			jQuery('body').addClass('load-complete');
			setTimeout(function(){ showMouse(); }, 1000);
			
			if (!jQuery('body').hasClass('horz-scroll')) {
				jQuery('body').addClass('horz-scroll');				
				initHorizontalScroll();			
			}				
		});
		
	} else {
		jQuery('#loading-screen').css({'display':'none'});
		jQuery('body').addClass('load-complete');
		
		if (!jQuery('body').hasClass('vert-scroll')) {
			jQuery('body').addClass('vert-scroll');
			initVerticalScroll();
		}			
	}
	
});
	
//////////////////////////////RESIZE COMPLETE
var resizeComplete = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();
	
////////////////////////////RESIZE	
$window.resize(function() {
	
	if (!jQuery('body').hasClass('resizing')) {
		jQuery('body').addClass('resizing');
		
		if($window.width() >= $minwidth && $window.height() >= $minheight) {
			deleteScroll();
		}
		
		
		resetTransforms();
		
		var d = new Date();
		var n = d.getTime();
		resizeComplete(function(){			
			if (jQuery('body').hasClass('resizing')) {
				jQuery('body').removeClass('resizing');	
				resetTransforms();

				if($window.width() >= $minwidth && $window.height() >= $minheight) {
					initHorizontalScroll();
				} else {
					initVerticalScroll();
				}
			}
		}, 500, "resize horizontal"+n);
		
	}
	
	if($window.width() >= $minwidth && $window.height() >= $minheight) {
	
		if (jQuery('body').hasClass('vert-scroll')) {
			jQuery('body').removeClass('vert-scroll');
		}
		
		if (!jQuery('body').hasClass('lazy-desktop')) {	
			$lazydesktop = jQuery('.lazy-desktop').lazy({
				chainable: false,
				threshold: 1500,
				scrollDirection:'horizontal',
				afterLoad: function(element) {
					//element.find('.loading').removeClass('active');
					element.removeClass("lazy-desktop");
					element.addClass("in-view");
				}
			});		
		}
		
		if (!jQuery('body').hasClass('horz-scroll')) {			
			jQuery('body').addClass('horz-scroll');			
				
			$lazy.config('scrollDirection','horizontal');
			
			
			$lazynofade.config('scrollDirection', 'horizontal');
			$lazynofade.config('imageBase', 'inc/img/');
		}
		
		
		
		
	} else {
		
		if (jQuery('body').hasClass('horz-scroll')) {
			jQuery('body').removeClass('horz-scroll');
		}	
		
		if (!jQuery('body').hasClass('vert-scroll')) {
			jQuery('body').addClass('vert-scroll');
						
			$lazy.config('scrollDirection', 'vertical');
			
			
			$lazynofade.config('scrollDirection', 'vertical');
			$lazynofade.config('imageBase', 'inc/img/mobile/');
		}
		
	}
	
	
});
	
////////////////////////////ON READY	
jQuery(document).ready(function(){			
	$lazy = jQuery('.lazy').lazy({
		chainable: false,
		threshold: 1000,
		afterLoad: function(element) {
			//element.find('.loading').removeClass('active');
			element.removeClass("lazy");
			element.addClass("in-view");
		}
	});	
	
	$lazynofade = jQuery('.lazy-nofade').lazy({
		chainable: false,
		threshold: 1500,
		afterLoad: function(element) {
			//element.find('.loading').removeClass('active');
			element.removeClass("lazy-nofade");
			element.addClass("in-view");
		}
	});	
	
	
	if($window.width() >= $minwidth && $window.height() >= $minheight) {
		$lazy.config('scrollDirection','horizontal');
		$lazynofade.config('scrollDirection', 'horizontal');
		$lazynofade.config('imageBase', 'inc/img/');
		
		jQuery('body').addClass('lazy-desktop');
		
		$lazydesktop = jQuery('.lazy-desktop').lazy({
			chainable: false,
			threshold: 1500,
			scrollDirection:'horizontal',
			afterLoad: function(element) {
				//element.find('.loading').removeClass('active');
				element.removeClass("lazy-desktop");
				element.addClass("in-view");
			}
		});	
		
	} else {
		$lazy.config('scrollDirection', 'vertical');
		$lazynofade.config('scrollDirection', 'vertical');
		$lazynofade.config('imageBase', 'inc/img/mobile/');
	}	
	jQuery('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		prependTo:'.mag-wrap',
		image: {
			verticalFit: true,
			titleSrc: 'title'
		}
	});			
});	

})();
