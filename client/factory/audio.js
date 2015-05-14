angular.module('snapify').factory('audio', ['$document',function ($document) {
    var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
    return {
        audioElement: audioElement,
        play: function (filename) {
            if (audioElement.paused) {
                audioElement.src = filename;
                audioElement.play();     //  <-- Thats all you need
            }
        }
    }
}]);
