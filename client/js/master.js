particlesJS.load('particles-js', '/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

var app = angular.module("whisper", []);
app.controller("index", function($scope, $http){
    $scope.addConfession = function(element){
        var confession = $('.textarea > div').text().trim();
        if(confession){
           $http.post("/new/confession", {confession: confession})
            .then(function(response){
                if(response.data.status == 400){
                    $(".error-handling").html("<div class='alert alert-danger'>"+response.data.msg+"</div>");   
                }else{
                    $(".error-handling").html("<div class='alert alert-success'>"+response.data.msg+"</div>"); 
                    $scope.getConfessions();
                }
            }), function(response){
                $(".error-handling").html(response.error);  
            }; 
        }else{
            $(".error-handling").html("<div class='alert alert-warning'>Share something :)</div>");   
            return;
        }
    };
    
    $scope.getConfessions = function(){
        $http.get("/confessions").then(function(response){$scope.confessions = response.data.results; console.log(response.data.results.length/3)});
    };
});