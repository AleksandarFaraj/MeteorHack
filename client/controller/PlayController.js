angular
    .module('snapify')
    .controller('PlayController', PlayController);

PlayController.$inject = ['$scope', 'Spotify','audio','$rootScope','$state'];

/* @ngInject */
function PlayController($scope, Spotify,audio,$rootScope,$state) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'PlayController';

    ////////////////
    $scope.stopPlaying = function () {
        delete $scope.playingsong;
        audio.audioElement.pause();
        audio.audioElement.currentTime = 0;
        if ($scope.share) {
            $state.go('login');
        }
    };
    $scope.play = function (song) {
        Spotify.getTrack(song.songId).then(function (track) {
            console.log(track);
            Spotify.getArtist(track.artists[0].id).then(function (artist) {
                audio.play(track.preview_url, function () {
                    $scope.stopPlaying();
                });
                Songs.remove({_id: song._id});
                $scope.playingsong = {
                    artist: artist.name,
                    track: track.name,
                    image: artist.images[0].url
                };
            });
        });
    }
}