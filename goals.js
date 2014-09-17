(function(){
  var app = angular.module('goals', ['ui.utils.masks']);

  app.controller('GoalsController', ['$scope', function($scope) {

    $scope.agentGoals = agentGoals;

    $scope.setGrossCommission = function(){
      return ($scope.agentGoals.overallGoal + $scope.agentGoals.expenses) / $scope.agentGoals.agentSplit;
    };

    $scope.setSalesVolumeNeeded = function(){
      return ($scope.setGrossCommission() / $scope.agentGoals.avgCommissionRate);
    };

    $scope.setTransactionsNeeded = function(months){
      return ($scope.setSalesVolumeNeeded() / $scope.agentGoals.avgSalePrice / monthsInYear * months);
    };

    $scope.setTouchesPerClose = function(){
      return ($scope.agentGoals.touchesPerReferral * $scope.agentGoals.referralsPerClose);
    };

    $scope.setTouchesToReachGoal = function(segments){
      return ($scope.setTransactionsNeeded(monthsInYear) * $scope.setTouchesPerClose() / segments);
    };

    $scope.setMarketingWorkDayTouchesNeeded = function(){
      return ($scope.setTouchesToReachGoal(weeksInYear) / $scope.agentGoals.daysMarketingPerWeek);
    };

    $scope.setDatabaseUnknown = function(){
      return (($scope.agentGoals.sphereFamily || 0) +
              ($scope.agentGoals.sphereFriends || 0) +
              ($scope.agentGoals.sphereFormerCoworkers || 0) +
              ($scope.agentGoals.sphereGroupMembers || 0) +
              ($scope.agentGoals.sphereB2BMembers || 0) +
              ($scope.agentGoals.sphereOtherBusiness || 0)
              ); 
    };

    $scope.setDatabaseAPlus = function(){
      return ($scope.agentGoals.peopleMultipleReferrals) || 0; 
    };

    $scope.setDatabaseA = function(){
      return ($scope.agentGoals.peopleOneReferral || 0) + ($scope.agentGoals.currentClients || 0); 
    };

    $scope.setDatabaseB = function(){
      return ($scope.agentGoals.pastClients || 0) + ($scope.setDatabaseUnknown() * percentageOfUnknownsThatAreB); 
    };

    $scope.setDatabaseC = function(){
      return $scope.setDatabaseUnknown() * percentageOfUnknownsThatAreC;
    };

    $scope.setDatabaseTotalSize = function(){
      return ($scope.setDatabaseAPlus() + 
              $scope.setDatabaseA() + 
              $scope.setDatabaseB() + 
              $scope.setDatabaseC()
              ); 
    };

    $scope.setAdjustedMailingListSize = function(){
      if ($scope.agentGoals.mailingList > $scope.setDatabaseTotalSize()) {
        return ($scope.agentGoals.mailingList - $scope.setDatabaseTotalSize()); 
      }
      else {
        return 0;
      }
    };

    $scope.setAvailableTouchesPerYear = function(){
      return ($scope.setDatabaseAPlus() * 24) + 
             ($scope.setDatabaseA() * 12) +
             ($scope.setDatabaseB() * 8) + 
             ($scope.setDatabaseC() * 6);
    };

    $scope.setDatabaseTransactionsCapacity = function(){
      return ($scope.setAvailableTouchesPerYear() / $scope.setTouchesPerClose());
    };

    $scope.setDatabaseVolumeCapacity = function(){
      return $scope.setDatabaseTransactionsCapacity() * ($scope.agentGoals.avgSalePrice || 0);
    };

    $scope.setDatabaseMaximumTakeaway = function(){
      return $scope.setDatabaseVolumeCapacity() * $scope.agentGoals.avgCommissionRate * $scope.agentGoals.agentSplit - ($scope.agentGoals.expenses || 0);
    };

    $scope.setDatabaseCapacity = function(){
      return $scope.setDatabaseMaximumTakeaway() / $scope.agentGoals.overallGoal * 100;
    };

  }]);

  var agentGoals = {
    overallGoal: 150000,
    expenses: 20000,
    agentSplit: 0.80,
    avgCommissionRate: 0.0275,
    avgSalePrice: 350000,
    touchesPerReferral: 20,
    referralsPerClose: 5,
    daysMarketingPerWeek: 4,
    peopleMultipleReferrals: 3,
    peopleOneReferral: 10,
    currentClients: 10,
    pastClients: 100,
    sphereFamily: 15,
    sphereFriends: 15,
    sphereFormerCoworkers: 10,
    sphereGroupMembers: 30,
    sphereB2BMembers: 15,
    sphereOtherBusiness: 10,
    mailingList: 700
  };

  var weeksInYear = 52;
  var monthsInYear = 12;

  var percentageOfUnknownsThatAreB = 0.15;
  var percentageOfUnknownsThatAreC = 0.75;
  var percentageOfUnknownsThatAreD = 0.10;

})();
