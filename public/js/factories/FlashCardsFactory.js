app.factory("FlashCardsFactory", function($http){
    return {
        getFlashCards: function(category){
            var queryParams = {};
            if (category) {
                queryParams.category = category;
            }
            return $http.get('/cards', {
                params: queryParams
            })
            .then(function(response){
                return response.data;
            });
        },
        getFlashCard: function(id) {
            return $http.get('/cards/' + id, {params: {_id: id}});
        },
        deleteFlashCard: function(id) {
            console.log('deleting the card', id);
            return $http.delete('/cards/' + id);
        },
        updateFlashCard: function(card) {
            // update script
            $http.put('/cards/' + card._id, card)
                .success(function(card) {
                    console.log('new card', card);
                });
        },
        flashCards: [],
        activeCat: null
    };
});