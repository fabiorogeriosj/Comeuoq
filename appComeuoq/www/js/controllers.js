angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('mainCtrl', function ($rootScope){
  $rootScope.database = [];
})

.controller('ComeuCtrl', function($scope, $rootScope, $ionicModal, $state) {
  $scope.comidas = [
    { id:1, titulo: 'Refeição', descricao: 'Almoço ou jantar'},
    { id:2, titulo: 'Lanche', descricao: 'café da manha, tarde e noite'}
  ];
  $scope.itens = [
    {id:100, titulo:'Pouco', descricao: 'Comeu pouco sem exagerar apenas o necessário pois não estava com muita fome.'},
    {id:101, titulo:'Normal', descricao: 'Comeu o ideial.'},
    {id:102, titulo:'Mais que o normal', descricao: 'Comeu um pouco a mais que o ideial.'},
    {id:103, titulo:'Comeu muito', descricao: 'Não se controlou e comeu muito.'}
  ];
  $rootScope.database.length = 0;
  $scope.comeuoq = {};

  if(localStorage.getItem("database")){
    $rootScope.database = JSON.parse(localStorage.getItem("database"));
  }

  $ionicModal.fromTemplateUrl('templates/itens.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function(comeu) {
    $scope.comeuoq = comeu;
    $scope.modal.show();
  };

  $scope.foi = function (item){
    var obj = {
      id_comeu: $scope.comeuoq.id,
      id_como: item.id,
      comeu: $scope.comeuoq.titulo,
      como: item.titulo,
      data: moment().format("YYYYMMDD"),
      hora: moment().format("HHmm"),
      data_formatada : moment().format("DD/MM/YYYY HH:mm")
    }
    $scope.insertDatabase(obj);
    $rootScope.database.unshift(obj);
    $scope.modal.hide();
  }

  $scope.insertDatabase = function (obj){
    var db = [];
    var inDb = localStorage.getItem("database");
    if(inDb){
      db = JSON.parse(inDb)
    }
    db.unshift(obj);
    localStorage.setItem("database", JSON.stringify(db));
  }

})

.controller('DashboardCtrl', function($scope, $stateParams) {
  
  $scope.fromNow = function (data){
    return moment(data, "DD/MM/YYYY HH:mm").fromNow();
  }

});
