angular
    .module('snapify')
    .controller('AppController', AppController);

AppController.$inject = ['$scope','$meteor'];

/* @ngInject */
function AppController($scope,$meteor) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'AppController';

    ////////////////
    console.log('hello world');
    $scope.login = function() {
        $meteor.loginWithFacebook({},function(){
            console.log('Logged in');
        });
    }
}