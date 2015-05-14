angular.module('snapify', [
    'angular-meteor', 'spotify'
]).config(['SpotifyProvider',function (SpotifyProvider) {
  SpotifyProvider.setClientId('6a760743cac0444da34f7afa835e887b');
}]);
