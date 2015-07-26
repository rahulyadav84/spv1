var app = angular.module('sp',['ngRoute']);

app.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/landingPage',{templateUrl:'pages/landingPage.html'})
				   .when('/login',{templateUrl:'pages/login.html'})
				   .when('/aptRequest',{templateUrl:'pages/aptRequest.html'})
				   .otherwise({redirectTo:'/login',template:'login.html'});

}]);

app.controller('landingPageCtrl',function(){



});

app.controller('spCntrl',['$http','$location',function($http, $location){

	
	var that = this;
	this.userName = '';
	this.pwd = '';
	this.setUserId = '';

	this.setRoute = function(routeName){
		$location.path(routeName);
	}

	this.validateUser = function(val,index,arr){
		if (arr[index].user === that.userName && arr[index].pwd === that.pwd) {
			that.setUserId = 99;
			that.setRoute('landingPage');
			return;
		}
	}

	this.validateLogin = function(){
		$http.get('http://ec2-52-8-207-104.us-west-1.compute.amazonaws.com:3000/').success(function(data){
			data.userBase.entries.some(that.validateUser);
		});
	}

	this.gotoSvcReq = function(svcReq){

		$location.path(svcReq);

	}

}]);