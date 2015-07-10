app.directive('flashCard', function(ScoreFactory){
	return {
		restrict: 'E',
		templateUrl: "/js/directives/flashCard.html",
		card: "=",
		link: function(scope, element, attribute){
			scope.answerQuestion = function (answer, flashCard) {
				if (!flashCard.answered) {
					flashCard.answered = true;
					flashCard.answeredCorrectly = answer.correct;
					if (answer.correct) ScoreFactory.correct++;
					else ScoreFactory.incorrect++;	
					}
				}
		}
	};
});