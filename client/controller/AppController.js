angular
    .module('snapify')
    .controller('AppController', AppController);

AppController.$inject = ['$scope', '$meteor', 'Spotify', '$rootScope', 'audio', '$state', '$timeout'];

/* @ngInject */
function AppController($scope, $meteor, Spotify, $rootScope, audio, $state, $timeout) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'AppController';
    ////////////////
    $scope.logout = function () {
        $meteor.logout();
        $state.go("login");
    };
    $meteor.subscribe('songs').then(function (subscriptionHandle) {
        $scope.receivedSongs = $meteor.collection(Songs);
    });

    $scope.friends = $meteor.collection(function () {
        return Meteor.users.find({});
    });
    $scope.searchTracks = function (search) {
        Spotify.search(search, 'track', {limit: 3}).then(function (data) {
            $scope.tracks = data;
            console.log(data);
        });
    };
    $scope.sendTrack = function (trackId) {
        $scope.selectedTrack = trackId;
        $state.go('memberarea.share.selectFriend');
    };
    $scope.sendSong = function (toId) {
        $meteor.call('sendSong', toId, $scope.selectedTrack);
        $state.go('memberarea.share.searchTrack');
        delete $scope.selectedTrack;
    };
    $scope.shareSong = function(){
        $meteor.call('sendShare', $scope.selectedTrack).then(function(data){
            console.log(data);
            $scope.sentUrl = data;
                $state.go('memberarea.share.link');
            delete $scope.selectedTrack;
        });

    }
}