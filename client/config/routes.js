angular.module('snapify')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //
        // For any unmatched url, redirect to /state1
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('login', {
                templateUrl: "client/login/login.ng.html",
                controller:'LoginController'
            })
            .state('memberarea', {
                url: '/',
                abstract: true,
                templateUrl: "client/memberarea/main.ng.html",
                controller:'AppController',
                resolve: {
                    "currentUser": ["$meteor", function ($meteor) {
                        return $meteor.requireUser();
                    }]
                }
            })
            .
            state('memberarea.share', {
                url: '',
                abstract: true,
                templateUrl: "client/memberarea/share/share.ng.html",
            }).state('memberarea.share.searchTrack', {
                url: '',
                templateUrl: "client/memberarea/share/searchTrack.ng.html",

            })
            .state('memberarea.share.selectFriend', {
                templateUrl: "client/memberarea/share/selectFriend.ng.html"
            })

    }]).
    run(["$rootScope", "$state", function ($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $meteor.requireUser() promise is rejected
            // and redirect the user back to the login page
            console.log(error);
            if (error === "AUTH_REQUIRED") {
                // It is better to use $state instead of $location. See Issue #283.
                $state.go('login');

            }
        });
    }]);
