angular.module('snapify').factory('audio', ['$document', '$timeout', function ($document, $timeout) {
    var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
    var _this = {
        audioElement: audioElement,
        play: function (filename) {
            if (audioElement.paused) {
                audioElement.src = filename;
                audioElement.play();     //  <-- Thats all you need
            }
            var ctime = function () {
                $timeout(function timeout() {
                    _this.currentTime = audio.currentTime;
                    if (!audioElement.paused) {
                        ctime();
                    }
                }, 100);
            };
            ctime();
        },
        stop: function () {
            audio.audioElement.pause();
            audio.audioElement.currentTime = 0;
        }
    }
    return _this;
}]);
