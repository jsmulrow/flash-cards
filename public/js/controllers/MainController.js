app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) {

    $scope.statistics = '../statistics.html';
    $scope.loading = true;

    FlashCardsFactory.getFlashCards().then(function(data){
        $scope.loading = false;
        $scope.flashCards = data;
    });
    
    $scope.categories = [
        "MongoDB",
        "Express",
        "Angular",
        "Node"
    ];

    $scope.activeCat = null;

    $scope.getCategoryCards = function(category){
    	$scope.activeCat = category;
        $scope.loading = true;
        FlashCardsFactory.getFlashCards(category).then(function(data){
    		$scope.loading = false;
            $scope.flashCards = data;
    	});
    };
});

//Express refers to the query string as "req.query" while Angular refers to it as "req.params"
