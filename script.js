var resizeFontSize = function() {
	var $time = $('#time'),
		$text = $('#text'),
		fontSize = 18,
		cellWidth = 0,
		cellHeight = 0,
		intervall = 1,
		
		maxHeight = $time.innerHeight(),
		maxWidth = $time.innerWidth(),
		
		textHeight = $text.height();
		textWidth  = $text.width();
		
	$text.removeClass('ready').addClass('resize');

	var setFontsize = function() {
		$text.css({fontSize: fontSize, lineHeight: fontSize + 'px'});				

		var $firstChar = $('.number:first', $text),
			orginalContent = $firstChar.html();

		$firstChar.css('width', 'auto');
		$firstChar.css('height', 'auto');

		cellWidth = 0;
		cellHeight = 0;
		
		for (i=0; i<10; i++) { // test all numbers
			$firstChar.text(i);
			var testWidth = Math.floor($firstChar.width());	
			var testHeight = Math.floor($firstChar.innerHeight()); 
			
			if(cellWidth < testWidth) 
				cellWidth = testWidth;
				cellHeight = testHeight;
		}
		
		$firstChar.html(orginalContent);

		$('.number', $text).css({width: cellWidth, height:cellHeight});
	}
	
	while (textHeight < maxHeight && textWidth < maxWidth && fontSize < 1000) {
		fontSize = fontSize + intervall;
		setFontsize();
		
		objHeight = $time.height();
		textHeight = $text.height();
		textWidth = $text.outerWidth();
		//console.log('max Fonsize: '+  fontSize + 'px < 1000  &&  maxHeight:' + textHeight + ' < ' + maxHeight + ' && maxWidth:' + textWidth +'<'+ maxWidth + ' && oneline:'+objHeight +' == '+ maxHeight, 'cellWidth ' + cellWidth);
	}
	
	// reset last step
	fontSize = fontSize - intervall;
	setFontsize();
	
	window.setTimeout(function() {
		$text.removeClass('resize').addClass('ready');
	}, 900);
	
	
	return true;
}

function updateTime() {
	// Get the time and work out 12 hour time
	var date = new Date();
	var hour24 = date.getHours();
	var hour12 = (hour24 != 0 && hour24 != 12) ? (hour24 % 12) : 12;
	var meridiem = (hour24 < 12) ? 'am' : 'pm';

	// Update the clock elements
	changeValue($('#h1'), Math.floor(hour24 / 10));
	changeValue($('#h2'), hour24 % 10);
	changeValue($('#m1'), Math.floor(date.getMinutes() / 10));
	changeValue($('#m2'), date.getMinutes() % 10);
	changeValue($('#s1'), Math.floor(date.getSeconds() / 10));
	changeValue($('#s2'), date.getSeconds() % 10);

}

// Update a number
function changeValue($number, newValue) {
	var value = parseInt($('.current', $number).text()),
		newValue = parseInt(newValue);

	if (value == newValue) return;

	var $new = $('<span>').addClass('new').text(newValue).appendTo($number);

	$number.addClass('changed').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e){
		$('.current', $number).text(newValue);
		$new.remove();
		$number.removeClass('changed');
	}); 	
}

function updateTrack() {
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/user/mracidfreak/recenttracks.xml',
		dataType: 'xml',
		success: function(data) {
			$track = $(data).find('track:eq(0)');
			title = $track.find('name').text() + ' - ' + $track.find('artist').text();

			console.log([  Math.floor((new Date().getTime())/1000)    ]);
		}
	});
}

