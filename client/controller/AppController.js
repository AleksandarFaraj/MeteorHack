angular
    .module('snapify')
    .controller('AppController', AppController);

AppController.$inject = ['$scope', '$meteor', 'Spotify', '$rootScope', 'audio', '$state', '$timeout'];

/* @ngInject */
function AppController($scope, $meteor, Spotify, $rootScope, audio, $state, $timeout) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'AppController';
    console.log($meteor);
    ////////////////
    $scope.logout = function () {
        $meteor.logout();
        $state.go("login");
    };
    if ($rootScope.currentUser) {
        $scope.receivedSongs = $meteor.collection(function () {
            console.log($rootScope.currentUser._id);
            return Songs.find({toId: $rootScope.currentUser._id});
        });
    }
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
        $scope.selectedTrack = null;
    };
    $scope.stopPlaying = function () {
        delete $scope.playingsong;
        audio.audioElement.pause();
        audio.audioElement.currentTime = 0;

    };
    $scope.play = function (song) {
        Spotify.getTrack(song.songId).then(function (track) {
                console.log(track);
                Spotify.getArtist(track.artists[0].id).then(function (artist) {

                    audio.play(track.preview_url);
                    audio.audioElement.addEventListener("ended", function () {
                        $scope.stopPlaying();
                    }, true);
                    Songs.remove({_id: song._id});

                    $scope.playingsong = {
                        artist: artist.name,
                        track: track.name,
                        images: artist.images,
                        audio: audio
                    };


                });

            }
        )
        ;
    }
}