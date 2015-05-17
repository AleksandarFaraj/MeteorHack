angular.module('snapify').factory('audio', ['$document', '$timeout', function ($document, $timeout) {
    var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
    var _this = {
        audioElement: audioElement,
        play: function (filename, cb) {
            if (audioElement.paused) {
                audioElement.src = filename;
                audioElement.play();     //  <-- Thats all you need
            }
            var ctime = function () {
                $timeout(function timeout() {
                    if (!audioElement.paused) {
                        ctime();
                    } else {
                        cb();
                    }
                }, 100);
            };
            ctime();
        }
    };
    return _this;
}]);
