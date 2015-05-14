angular
    .module('snapify')
    .controller('AppController', AppController);

AppController.$inject = ['$scope'];

/* @ngInject */
function AppController($scope) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'AppController';

    ////////////////

}