angular
    .module('snapify')
    .controller('SearchController', SearchController);

SearchController.$inject = ['$scope'];

/* @ngInject */
function SearchController($scope) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'SearchController';

    ////////////////

}