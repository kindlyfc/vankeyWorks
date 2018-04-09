const angular = require('angular');
const axios = require('axios');
const qs = require('qs');
const crypto = require('crypto-js');

const loginApp = angular.module('loginApp', [])

loginApp.service('ajax', function() {
	var ajax = axios.create({
		baseURL:'http://192.168.0.169',
		timeout: 3000,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function(data) {
			return qs.stringify(data);
		}
	});
	return {
		get: function(url, param, successCallback, errorCallback) {
			ajax.get(url+'?'+qs.stringify(param))
			.then(function(resp) {
				successCallback(resp);
			}).catch(function(error) {
				errorCallback(error);
			});
		},
		post: function(url, param, successCallback, errorCallback) {
			ajax.post(url, param)
			.then(function(resp) {
				successCallback(resp);
			}).catch(function(error) {
				errorCallback(error);
			});
		}
	}
});

module.exports = loginApp.controller('loginCtrl', ['$scope','ajax',
function($scope, ajax) {
	$scope.login = function() {
		ajax.post('/login', {
			username: $scope.username,
			password: crypto.enc.Base64.stringify(crypto.enc.Utf8.parse($scope.password))
		}, function(resp) {
			if (resp.data.code === 0) {
				window.location.href = '/index';
			} else {
				alert(resp.data.msg);
			}
		})
	}
}]);
