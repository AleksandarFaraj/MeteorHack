angular
    .module('snapify')
    .controller('PublicController', PublicController);

PublicController.$inject = ['$scope','$stateParams','$meteor'];

/* @ngInject */
function PublicController($scope,$stateParams,$meteor) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'PublicController';

    ////////////////
    $scope.share = $meteor.collection(Share).subscribe('share',$stateParams.ticket);

}