//===================
// -- MASONRY --
//===================

$(window).load(function(){

	// place in a timeout to make angular happy
	setTimeout(function(){
		$('.grid').masonry({
			// set itemSelector so .grid-sizer is not used in layout
			itemSelector: '.grid-item',
			// use element for option
			// columnWidth: function( containerWidth ) { return containerWidth / columns; }
			percentPosition: true
		});
	}, 0)

})



