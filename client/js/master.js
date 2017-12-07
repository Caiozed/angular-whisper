var app = angular.module("whisper", []);
app.controller("index", function($scope, $http){
    $scope.addConfession = function(element){
        $scope.confessions = [];
        var confession = $('.textarea > div').text().trim();
        if(confession){
           $http.post("/new/confession", {confession: confession})
            .then(function(response){
                $(".error-handling").html("");
                if(response.data.status == 400){
                    $(".error-handling").append("<div class='alert alert-danger'>"+response.data.msg+"</div>");   
                }else{
                    $(".error-handling").append("<div class='alert alert-success'>"+response.data.msg+"</div>"); 
                    $scope.getConfessions();
                }
            }), function(response){
                $(".error-handling").append(response.error);  
            }; 
        }else{
            $(".error-handling").append("<div class='alert alert-warning'>Share something :)</div>");   
            return;
        }
        
    };
    
    $scope.getConfessions = function(){
        $http.get("/confessions").then(function(response){$scope.confessions = response.data.results; console.log($scope.confessions)});
    };
});