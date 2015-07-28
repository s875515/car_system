angular.module('starter.services', [])

// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'FF1 課程',
//     lastText: 'You on your way?',
//     face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
//   }, {
//     id: 1,
//     name: '火搶班',
//     lastText: 'Hey, it\'s me',
//     face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
//   },{
//     id: 2,
//     name: '在職班',
//     lastText: 'I should buy a boat',
//     face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
//   }, {
//     id: 3,
//     name: 'EMTP 課程',
//     lastText: 'Look at my mukluks!',
//     face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
//   }, {
//     id: 4,
//     name: '講座',
//     lastText: 'This is wicked good ice cream.',
//     face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
//   }];

//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// })

.factory('DBA', function ($http, $q) {
  var self = this;
  self.query = function (method, api, data, header) {
      var q = $q.defer();
      switch (method) {
          case 'GET':
              $http.get(api, header).then(function (result) {
                  q.resolve(result);
              }, function (error) {
                  console.warn(error);
                  q.reject(error);
              })
              break;
          case 'POST':
              $http.post(api, data, header).then(function (result) {
                  q.resolve(result);
              }, function (error) {
                  console.warn(error);
                  q.reject(error);
              })
              break;
          case 'PUT':
              $http.put(api, data, header).then(function (result) {
                  q.resolve(result);
              }, function (error) {
                  console.warn(error);
                  q.reject(error);
              })
              break;
          case 'DELETE':
              $http.delete(api, header).then(function (result) {
                  q.resolve(result);
              }, function (error) {
                  console.warn(error);
                  q.reject(error);
              })
              break;
      }
      return q.promise;
  }
  return self
})

.factory('todoParse', function (DBA, PARSE_KEYS, PARSE_API) {
  var self = this;
  var header = {headers: {
          'X-Parse-Application-Id': PARSE_KEYS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_KEYS.REST_API_KEY
      }
  }
  var headerJson = {
      headers: {
          'X-Parse-Application-Id': PARSE_KEYS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_KEYS.REST_API_KEY,
          'Content-Type': 'application/json'
      }
  }
  self.getAll = function () {
      return DBA.query('GET', PARSE_API, '', header);
  }
  self.get = function (objectId) {
      return DBA.query('GET', PARSE_API + '/' + objectId, '', header);
  };
  self.create = function (object) {
      return DBA.query('POST', PARSE_API, object, headerJson);
  }
  self.update = function (objectId, object) {
      return DBA.query('PUT', PARSE_API + '/' + objectId, object, headerJson);
  }
  self.delete = function (objectId) {
      return DBA.query('DELETE', PARSE_API + '/' + objectId, '', headerJson);
  }
  return self;
})
.value('PARSE_KEYS', {
  APP_ID: 'S7UJ1QfUFl1kKVL83L2RjHgTK6s2E7boUPG1C7pY',
  REST_API_KEY: 'tnVfwMxI6qL9b1RVKhYEFzRJnwlax71ofE2AygbR'
})
.value('PARSE_API', "https://api.parse.com/1/classes/Cars");
