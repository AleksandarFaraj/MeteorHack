angular
    .module('snapify')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$scope','$meteor','$state'];

/* @ngInject */
function LoginController($scope,$meteor,$state) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'LoginController';

    ////////////////
    $scope.login = function () {
        $meteor.loginWithFacebook({}).then(function () {
            $location.go('memberarea.share.searchTrack');
           /* $scope.receivedSongs = $meteor.collection(function () {
                console.log($rootScope.currentUser._id);
                return Songs.find({toId: $rootScope.currentUser._id});
            });*/
        });
    };
}