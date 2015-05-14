angular
    .module('snapify')
    .controller('AppController', AppController);

AppController.$inject = ['$scope', '$meteor','Spotify'];

/* @ngInject */
function AppController($scope, $meteor,Spotify) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'AppController';

    ////////////////
    console.log('hello world');
    $scope.login = function () {
        $meteor.loginWithFacebook({}, function () {
            console.log('Logged in');
        });
    };
    $scope.setUsername = function (username) {
        $meteor.call('setUsername', username);
    };
    $scope.friends = $meteor.collection(function () {
        return Meteor.users.find({});
    });
    $scope.searchTracks = function(search) {
        Spotify.search(search, 'track').then(function(data){
            $scope.tracks = data;
            console.log(data);
        });
    }
}