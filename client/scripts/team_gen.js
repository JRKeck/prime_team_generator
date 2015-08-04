var teamSize;//holds the number of teams needed
var gammaStudentArray = [];//the cohort array

//Shuffle the array
Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length-1; i >=0; i--) {

    var randomIndex = Math.floor(Math.random()*(i+1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}

$(document).ready(function($) {
  //Get students from json file and place them in array
  $.ajax({
    url: "/data",
    success: function(data){
      $.each(data, function(i){
        gammaStudentArray.push(this.name);

      })
    },
    complete: function(){
    }
    })//End ajax call

  $('.team-request').on('click', function() {
    $('.team-request').removeClass('selected');//clear out old selection
    $('.student-request').removeClass('selected');//clear out old selection
    $(this).addClass('selected');//add selected class to button pressed
    teamSize = $(this).data('teamsize')//get number of teams from data attr
  });

  $('.student-request').on('click', function() {
    $('.student-request').removeClass('selected');//clear out old selection
    $('.team-request').removeClass('selected');//clear out old selection
    $(this).addClass('selected');//add selected class to button pressed
    teamSize = (Math.round(gammaStudentArray.length / $(this).data('teamsize')));//get number of teams by dividing class size by students per team

    console.log(teamSize);
  });

  $('.randomizer').on('click', function() {
    gammaStudentArray = gammaStudentArray.shuffle();//shuffle the array
    $('.teams').html("");//clear the DOM if teams were already generated
    if (teamSize){//check to make sure a button was pressed
      for (var i = 1; i <= teamSize; i++) {//create divs for each team
        $('.teams').append('<div class="team col-md-2 col-sm-3" data-teamid="'+i+'"><h3>Team '+i+'</h3></div>');
      };
      var teamNumber = 1;//set to 1 so we start with team 1
      for (var i = 0; i < gammaStudentArray.length; i++) {
        if (teamNumber > teamSize){teamNumber = 1;}//Move back to first team if counter gets higher than number of teams
        $('[data-teamid="'+teamNumber+'"]').append('<p>'+gammaStudentArray[i]+'</p>');//Append Student to a team
        $('[data-teamid="'+teamNumber+'"] p').last().hide().delay(80 * i).slideDown();//Hide and then show with a progressive fade
        teamNumber++;//Switch to next team
      };
    }
  });

  $(function() {
      $( "#tabs" ).tabs();
    });

});//End Ready




