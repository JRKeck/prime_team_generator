var teamNum;//holds the number of teams needed
var gammaStudentArray = [];//the cohort array
var maxTeams; //hold the max number of teams to generate button options
var teamByStudentNum = false; //set the teams based on the number of students per team

//Find the max number of teams
function findMaxTeams(array) {
  maxTeams = array.length/2;
}

//create the team size buttons
function createTeamSizeBtns(numButtons) {
  for (var i = 2; i <= numButtons; i++) {
    $('.team-size').append('<button class="team-request btn" data-teamsize="'+i+'">'+i+'</button>')
  };
  $('.team-size').append('<div class="submit-area"><button class="randomizer btn">Randomize</button></div>');
}

//Send Students to the DOM
function studentsToTeams(teamNum) {
  if (teamByStudentNum == true){teamNum = gammaStudentArray.length/teamNum;}
  for (var i = 1; i <= teamNum; i++) {//create divs for each team
    $('.teams').append('<div class="team col-md-2 col-sm-3 col-xs-6" data-teamid="'+i+'"><h3>Team '+i+'</h3></div>');
  };
  var teamNumber = 1;//set to 1 so we start with team 1
  for (var i = 0; i < gammaStudentArray.length; i++) {
    if (teamNumber > teamNum){teamNumber = 1;}//Move back to first team if counter gets higher than number of teams
    $('[data-teamid="'+teamNumber+'"]').append('<p>'+gammaStudentArray[i]+'</p>');//Append Student to a team
    $('[data-teamid="'+teamNumber+'"] p').last().hide().delay(80 * i).slideDown();//Hide and then show with a progressive fade
    teamNumber++;//Switch to next team
  };
}

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
  function getStudents() {
    $.ajax({
      url: "/data",
      success: function(data){
        $.each(data, function(i){
          gammaStudentArray.push(this.name);
        })
        findMaxTeams(gammaStudentArray);
        createTeamSizeBtns(maxTeams);
        console.log("In the Complete: "+maxTeams);
      },
      })//End ajax call
  }
  //initialize the student array
  getStudents();

  //Choose num of teams button
  $('body').on('click', '.num-teams', function() {
    $(this).parent().children().removeClass('selected');
    $(this).addClass('selected');
    teamByStudentNum = false;

  });

  //Choose num of students button
  $('body').on('click', '.num-students', function() {
    $(this).parent().children().removeClass('selected');
    $(this).addClass('selected');
    teamByStudentNum = true;
  });

  //number buttons
  $('body').on('click', '.team-request', function() {
    $('.team-request').removeClass('selected');//clear out old selection
    $(this).addClass('selected');//add selected class to button pressed
    teamNum = $(this).data('teamsize')//get number of teams from data attr
  });

  //generate teams button
  $('body').on('click', '.randomizer', function() {
    $('.error-msg').remove();
    gammaStudentArray = gammaStudentArray.shuffle();//shuffle the array
    $('.teams').html("");//clear the DOM if teams were already generated
    if (teamNum){//check to make sure a button was pressed
      studentsToTeams(teamNum);
    }
    else { //throw error if no team/student num button selected
      if(!teamByStudentNum){
        $(this).after('<div class="error-msg">Please select a number of teams</div>').fadeIn();
      }
      else {
        $(this).after('<div class="error-msg">Please select a number of students</div>').fadeIn();
      }
      $('.error-msg').hide().fadeIn(600);
    }
  });

});//End Ready
