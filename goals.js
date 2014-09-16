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
      return ($scope.agentGoals.sphereFamily +
              $scope.agentGoals.sphereFriends +
              $scope.agentGoals.sphereFormerCoworkers +
              $scope.agentGoals.sphereGroupMembers +
              $scope.agentGoals.sphereB2BMembers +
              $scope.agentGoals.sphereOtherBusiness
              ); 
    };

    $scope.setDatabaseAPlus = function(){
      return ($scope.agentGoals.peopleMultipleReferrals); 
    };

    $scope.setDatabaseA = function(){
      return ($scope.agentGoals.peopleOneReferral + $scope.agentGoals.currentClients); 
    };

    $scope.setDatabaseB = function(){
      return ($scope.agentGoals.pastClients + ($scope.setDatabaseUnknown() * percentageOfUnknownsThatAreB) ); 
    };

    $scope.setDatabaseC = function(){
      return ($scope.setDatabaseUnknown() * percentageOfUnknownsThatAreC); 
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

  }]);

  var agentGoals = {
    
  };

  var weeksInYear = 52;
  var monthsInYear = 12;

  var percentageOfUnknownsThatAreB = 0.15;
  var percentageOfUnknownsThatAreC = 0.75;
  var percentageOfUnknownsThatAreD = 0.10;

})();
