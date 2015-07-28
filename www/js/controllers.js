angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope) {

})

.controller('AddCtrl', function($scope, todoParse, $stateParams) {
	$scope.carObj = {};

	$scope.addCar = function(class_time,car_date) {
		$scope.carObj['class_time'] = {
			"__type": "Date",
			"iso": class_time
		};
		$scope.carObj['car_date'] = {
			"__type": "Date",
			"iso": car_date
		};
		todoParse.create($scope.carObj).then(function(success) {
			alert('成功送出！')
		});
	};
	// $scope.addCar = function() {
	// 	for (var i in $scope.carObj) {
	// 		cars.set(i, $scope.carObj[i]);
	// 	};
	// 	cars.save(null, {
	// 	  success: function(cars) {
	// 	    // Execute any logic that should take place after the object is saved.
	// 	    alert('成功送出！編號: ' + cars.id);
	// 	  },
	// 	  error: function(cars, error) {
	// 	    // Execute any logic that should take place if the save fails.
	// 	    // error is a Parse.Error with an error code and description.
	// 	    alert('發生錯誤！錯誤編號: ' + error.description);
	// 	  }
	// 	});
	// };
})

.controller('SearchCtrl', function($scope, todoParse, $stateParams) {
  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // }
  // $scope.update = function (note) {
  $scope.updateAll = function() {
  	todoParse.getAll().then(function(result) {
	  	console.log(result);
	    $scope.items = result.data.results;
	  });
  };

  $scope.remove = function(item) {
  	todoParse.delete(item.objectId).then(function(success) {});
		$scope.updateAll();
  };

  $scope.updateAll();

})

.controller('SearchDetailCtrl', function($scope, $stateParams, todoParse) {
	todoParse.get($stateParams.chatId).then(function(result) {
    $scope.item = result.data;
  });
 //  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
