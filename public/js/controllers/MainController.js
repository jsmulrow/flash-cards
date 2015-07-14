app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) {

    $scope.statistics = '../statistics.html';
    $scope.loading = true;

    $scope.flashCardsContainer = FlashCardsFactory;

    FlashCardsFactory.getFlashCards()
    .then(function(data){
        $scope.loading = false;
        FlashCardsFactory.flashCards = data;
    });
    
    $scope.categories = [
        "MongoDB",
        "Express",
        "Angular",
        "Node"
    ];

    // $scope.activeCat = null;

    $scope.getCategoryCards = function(category){
    	FlashCardsFactory.activeCat = category;
        $scope.loading = true;
        FlashCardsFactory.getFlashCards(category).then(function(data){
    		$scope.loading = false;
            FlashCardsFactory.flashCards = data;
    	});
    };

});

//Express refers to the query string as "req.query" while Angular refers to it as "req.params"
