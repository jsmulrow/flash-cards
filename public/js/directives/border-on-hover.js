app.directive('borderOnHover', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attribute){
			element.on('mouseenter', function(){
				element.addClass("border-on-hover");
			});
			element.on('mouseleave', function(){
				element.removeClass("border-on-hover");
			});
		}
	};
});