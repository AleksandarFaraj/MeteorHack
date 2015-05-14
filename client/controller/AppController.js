angular
    .module('snapify')
    .controller('AppController', AppController);

AppController.$inject = ['$scope', '$meteor','Spotify','$rootScope','audio'];

/* @ngInject */
function AppController($scope, $meteor,Spotify,$rootScope,audio) {
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
        Spotify.search(search, 'track',{limit:3}).then(function(data){
            $scope.tracks = data;
            console.log(data);
        });
    }
    $scope.sendTrack=function(trackId) {
        $scope.selectedTrack = trackId;
    }
    $scope.sendSong=function(toId) {
        $meteor.call('sendSong',toId,$scope.selectedTrack);
        $scope.selectedTrack=null;
    }
    $scope.receivedSongs = $meteor.collection(function () {
        console.log($rootScope.currentUser._id);
        return Songs.find({toId:$rootScope.currentUser._id});
    });
    $scope.play=function(song) {
        Spotify.getTrack(song.songId).then(function(track){
            audio.play(track.preview_url);
            Songs.remove({_id:song._id});
        });
    }
}