
angular.module('GameContoller', [])

.controller('gameController', ['$scope', '$http', function ($scope, $http) {
  $scope.showPlay = false;
  $scope.showResult = false;
  $scope.computerScore = 0;
  $scope.playerScore = 0;
  $scope.showIcons=true;
  $scope.tieScore = 0;
  $scope.showError = false;

  $scope.selectChoice = (choice)=> {
    $scope.playerChoice = choice;
    $scope.showPlay = true;
  }

  $scope.playGame = ()=> {
    $http({
      method: 'POST',
      url: '/match',
      data: { 'choice' : $scope.playerChoice }
    }).then(response =>{
        if(response.status==200){
            $scope.showPlay = false;
            $scope.showIcons=false;
            $scope.computerChoice=response.data.computerChoice;
            $scope.showResult=true;
            $scope.result=response.data.result
            calcScore(response.data.result);
            $scope.showError=false;
        }
    }).catch(error=>{
      if(error.status==500){
        $scope.showError=true;
      }
    })
  }
  $scope.playAgain = ()=> {
    $scope.showIcons=true;
    $scope.showResult=false;
    $scope.showError=false;
  }
  calcScore=(result)=>{
    if (result === "win") {
      $scope.playerScore += 1;
    } else if (result === "lose") {
      $scope.computerScore += 1;
    } else {
      $scope.tieScore += 1;
    }
  }

}])