'use strict';

var scope, rootScope, state;
beforeEach(module('MobileCMSApp'));
beforeEach(inject(function ($state, $urlRouter, $rootScope, $controller) {
    rootScope = $rootScope;
    state = $state;
    scope = $rootScope.$new();
    $controller('chatCtrl', { $scope: scope });
}));

describe('AppRouteTest', function () {
    // rootScope.$broadcast("csrAuthed", {user: {username:'abc',password:'1111'}, token: '313151351'})
    // state.go('^.dashboard')
    // console.log('route :',state)
    it('messageList = []', function () {
        expect(scope.messageList.length).toBe(0);
    });
});

describe('myAppTest1', function () {
    it('messageList = []', function () {
        expect(scope.messageList.length).toBe(0);
    });
});