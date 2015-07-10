app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) {

    $scope.statistics = '../statistics.html';

    FlashCardsFactory.getFlashCards().then(function(data){
        $scope.flashCards = data;
    });
    
    $scope.categories = [
        "MongoDB",
        "Express",
        "Angular",
        "Node"
    ];

    $scope.getCategoryCards = function(category){
    	FlashCardsFactory.getFlashCards(category).then(function(data){
    		$scope.flashCards = data;
    	});
    };

	$scope.answerQuestion = function (answer, flashCard) {
		if (!flashCard.answered) {
			flashCard.answered = true;
			flashCard.answeredCorrectly = answer.correct;
			if (answer.correct) ScoreFactory.correct++;
			else ScoreFactory.incorrect++;
		}
	}
});