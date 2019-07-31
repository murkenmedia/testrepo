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
var $sections = ['intro', '1900', '1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', 'final'];
	
var $divs = ['#timeline-intro', '#timeline-1900', '#timeline-1930', '#timeline-1940', '#timeline-1950', '#timeline-1960', '#timeline-1970', '#timeline-1980', '#timeline-1990', '#timeline-2000', '#timeline-2000-after', '#timeline-2010', '#timeline-2010-after', '#timeline-end-before', '#timeline-end', '#timeline-end-after', '#timeline-final'];
	
//////////////////////////////SET PADDING
function dividerPadding() {
	var $nextwidth = 0,
		$totalwidth = 0;
	
	
	if($window.width() >= $minwidth && $window.height() >= $minheight) {
	
		//1900
		var $divider1900 = jQuery('#divider-1900').width()/2;
		jQuery('#content-1900').css("padding-right",$divider1900+'px');
		jQuery('#divider-1900').css("right","-"+$divider1900+'px');

		//1930
		var $divider1930 = jQuery('#divider-1930').width()/2;
		jQuery('#content-1930').css("padding-right",($divider1930+20)+'px');
		jQuery('#content-1940').css("padding-left",$divider1930+'px');
		jQuery('#divider-1930').css("right","-"+($divider1930+100)+'px');

		//1940
		var $divider1940 = jQuery('#divider-1940').width()/2;
		jQuery('#content-1940').css("padding-right",$divider1940+'px');
		jQuery('#content-1950').css("padding-left",$divider1940+'px');
		jQuery('#divider-1940').css("right","-"+($divider1940+100)+'px');

		//1950
		var $divider1950 = jQuery('#divider-1950').width()/2;
		jQuery('#content-1950').css("padding-right",$divider1950+'px');
		jQuery('#content-1960').css("padding-left",$divider1950+'px');
		jQuery('#divider-1950').css("right","-"+($divider1950+100)+'px');

		//1960
		var $divider1960 = jQuery('#divider-1960').width()/2;
		jQuery('#content-1960').css("padding-right",$divider1960+'px');
		jQuery('#content-1970').css("padding-left",$divider1960+'px');
		jQuery('#divider-1960').css("right","-"+($divider1960+100)+'px');

		//1980
		var $divider1970 = jQuery('#divider-1970').width()/2;
		jQuery('#content-1970').css("padding-right",$divider1970+'px');
		jQuery('#content-1980').css("padding-left",$divider1970+'px');
		jQuery('#divider-1970').css("right","-"+($divider1970+100)+'px');

		var $divider1980 = jQuery('#divider-1980').width()/2;
		jQuery('#content-1980').css("padding-right",$divider1980+'px');
		jQuery('#content-1990').css("padding-left",($divider1980+200)+'px');
		jQuery('#divider-1980').css("right","-"+$divider1980+'px');	

		//1990
		var $divider1990 = jQuery('#divider-1990').width()/2;
		jQuery('#content-1990').css("padding-right",$divider1990+'px');
		jQuery('#content-2000').css("padding-left",$divider1990+'px');
		jQuery('#divider-1990').css("right","-"+($divider1990+100)+'px');

		//2000
		var $divider2000 = jQuery('#divider-2000').width()/2;
		jQuery('#content-2000').css("padding-right",$divider2000+'px');
		jQuery('#content-2000-after').css("padding-left",$divider2000+'px');
		jQuery('#divider-2000').css("right","-"+($divider2000+200)+'px');

		//2000 after
		var $divider2000after = jQuery('#divider-2000-after').width()/2;
		jQuery('#content-2000-after').css("padding-right",$divider2000after+'px');
		jQuery('#content-2010').css("padding-left",$divider2000after+'px');
		jQuery('#divider-2000-after').css("right","-"+($divider2000after+200)+'px');

		//2010
		var $divider2010 = jQuery('#divider-2010').width()/2;
		jQuery('#content-2010').css("padding-right",$divider2010+'px');
		jQuery('#content-2010-after').css("padding-left",$divider2010+'px');
		jQuery('#divider-2010').css("right","-"+($divider2010+200)+'px');

		//2010 after
		var $divider2010after = jQuery('#divider-2010-after').width()/2;
		jQuery('#content-2010-after').css("padding-right",$divider2010after+'px');
		jQuery('#content-end-before').css("padding-left",$divider2010after+'px');
		jQuery('#divider-2010-after').css("right","-"+($divider2010after+100)+'px');

		//end before
		var $dividerEndBefore = jQuery('#divider-end-before').width()/2;
		jQuery('#content-end-before').css("padding-right",$dividerEndBefore+'px');
		jQuery('#content-end').css("padding-left",$dividerEndBefore+'px');
		jQuery('#divider-end-before').css("right","-"+($dividerEndBefore+200)+'px');

		//end
		var $dividerEnd = jQuery('#divider-end').width()/2;
		jQuery('#content-end').css("padding-right",$dividerEnd+'px');
		jQuery('#content-end-after').css("padding-left",$dividerEnd+'px');
		jQuery('#divider-end').css("right","-"+($dividerEnd)+'px');

		jQuery.each( $divs, function( i, val ) {
			$nextwidth = jQuery( val ).width();
			$totalwidth = $totalwidth + $nextwidth;
		});

		jQuery('.parallax').css("width",($totalwidth+1)+'px');
		
	} else {		
		jQuery('.parallax').css("width","");
		jQuery('.content-padding' ).css("padding","");
	}
}
	
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
	
	dividerPadding();
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
			$slidestop = jQuery("#timeline-"+$sections[$anchor]).position().left+10,
			$totalpos,
			$headpos = parseInt(jQuery("#anchor-"+$sections[$anchor]).css('marginLeft'));
		
		if($headpos == 0) {
			var $parent = jQuery("#anchor-"+$sections[$anchor]).closest('.content-padding');
			$headpos =  parseInt($parent.css('paddingLeft'));				
		}
		$totalpos = $headpos+$slidestop;
		//console.log('Section: '+$slidestop+', H3: '+$headpos+ ', Total:'+$totalpos);
		
		jQuery('.nav-item').removeClass('active');
		jQuery(this).addClass('active');

		$iScroll.scrollTo(-$totalpos, 0, 700,IScroll.utils.ease.quadratic);
		setTimeout(function(){ 
			jQuery('body').removeClass('nav-scrolling');
			checkNav($anchor);
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

		var $slidestop, $nextNum, $totalpos, $headpos;		
		$activeNum = jQuery('.slide').isInViewport().data('section')

		if(jQuery(this).hasClass('prev-arrow')) {
			$nextNum = $activeNum -1;			
		} else {
			$nextNum = $activeNum +1;
		}		
		checkNav($nextNum);
		$slidestop = jQuery("#timeline-"+$sections[$nextNum]).position().left+10;
		$headpos = parseInt(jQuery("#anchor-"+$sections[$nextNum]).css('marginLeft'));
		
		if($headpos == 0) {
			var $parent = jQuery("#anchor-"+$sections[$nextNum]).closest('.content-padding');
			$headpos =  parseInt($parent.css('paddingLeft'));				
		}
		$totalpos = $headpos+$slidestop;
		
		if($nextNum == 0){
			$totalpos = 0;
		}
		
		//console.log('Next num: '+$nextNum+' Section: '+$slidestop+', Headline: '+$headpos+ ', Total:'+$totalpos);

		$iScroll.scrollTo(-$totalpos, 0, 700,IScroll.utils.ease.quadratic);
		setTimeout(function(){ 
			jQuery('body').removeClass('nav-scrolling');
		}, 900);
	}
	
});	

////////////////////////////LOAD CONTENT
$window.load(function () {
	
	if($window.width() >= $minwidth && $window.height() >= $minheight) {		
		
		jQuery('body').addClass('load-complete');
		setTimeout(function(){ showMouse(); }, 1000);

		if (!jQuery('body').hasClass('horz-scroll')) {
			jQuery('body').addClass('horz-scroll');				
			initHorizontalScroll();			
		}		
		
	} else {
		//jQuery('#loading-screen').css({'display':'none'});
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
			$lazydesktop = jQuery('.lazy-desktop').Lazy({
				chainable: false,
				threshold: 1500,
				throttle:500,
				scrollDirection:'horizontal',
				afterLoad: function(element) {
					element.removeClass("lazy-desktop");
					element.addClass("in-view");
				}
			});		
		}
		
		if (!jQuery('body').hasClass('horz-scroll')) {			
			jQuery('body').addClass('horz-scroll');			
				
			$lazy.config('scrollDirection','horizontal');
			
			
			$lazynofade.config('scrollDirection', 'horizontal');
			$lazynofade.config('imageBase', 'assets/img/');
		}
		
		
		
		
	} else {
		
		if (jQuery('body').hasClass('horz-scroll')) {
			jQuery('body').removeClass('horz-scroll');
		}	
		
		if (!jQuery('body').hasClass('vert-scroll')) {
			jQuery('body').addClass('vert-scroll');
						
			$lazy.config('scrollDirection', 'vertical');
			
			
			$lazynofade.config('scrollDirection', 'vertical');
			$lazynofade.config('imageBase', 'assets/img/mobile/');
		}
		
	}
	
	
});
	
////////////////////////////ON READY	
jQuery(document).ready(function(){			
	$lazy = jQuery('.lazy').Lazy({
		chainable: false,
		threshold: 1000,
		throttle:500,
		afterLoad: function(element) {
			element.removeClass("lazy");
			element.addClass("in-view");
		}
	});	
	
	$lazynofade = jQuery('.lazy-nofade').Lazy({
		chainable: false,
		threshold: 1500,
		throttle:500,
		afterLoad: function(element) {
			element.removeClass("lazy-nofade");
			element.addClass("in-view");
		}
	});	
	
	
	if($window.width() >= $minwidth && $window.height() >= $minheight) {
		$lazy.config('scrollDirection','horizontal');
		$lazynofade.config('scrollDirection', 'horizontal');
		$lazynofade.config('imageBase', 'assets/img/');
		
		jQuery('body').addClass('lazy-desktop');
		
		$lazydesktop = jQuery('.lazy-desktop').Lazy({
			chainable: false,
			threshold: 1500,
			throttle:500,
			scrollDirection:'horizontal',
			afterLoad: function(element) {
				element.removeClass("lazy-desktop");
				element.addClass("in-view");
			}
		});	
		
	} else {
		$lazy.config('scrollDirection', 'vertical');
		$lazynofade.config('scrollDirection', 'vertical');
		$lazynofade.config('imageBase', 'assets/img/mobile/');
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
