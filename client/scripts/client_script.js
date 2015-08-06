var modAdj = [];
var adj = [];
var javascriptTerms = [];
var ajax1 = false;
var ajax2 = false;
var ajax3 = false;

function getRandWord(array) {
  var randWord = array[Math.floor(Math.random()*array.length)];
  return randWord;
}

function getPhrase(word1, word2, word3) {
  $('.phrase').remove();
  var phrase = word1 + " " + word2 + " " + word3;
  $('.container').append('<div class="phrase">'+phrase+'</div>')
}

$(document).ready(function() {

  //Get students from json file and place them in array
  function getWordArrays() {
    $.ajax({
      url: "/data1",
      success: function (data) {
        $.each(data, function(){
          modAdj.push(this.name);
        });
        ajax1 = true;
      }
    })//End ajax call
    $.ajax({
      url: "/data2",
      success: function (data) {
        $.each(data, function(){
          adj.push(this.name);
        });
        ajax2 = true;
      }
    })//End ajax call
    $.ajax({
      url: "/data3",
      success: function (data) {
        $.each(data, function(){
          javascriptTerms.push(this.name);
        });
        ajax3 = true;
      }
    })//End ajax call
  }

  //initialize the student array
  getWordArrays();

  $('body').on('click', '.generate-phrase', function() {
    if(ajax1 && ajax2 && ajax3){
      getPhrase(getRandWord(modAdj), getRandWord(adj), getRandWord(javascriptTerms));
    }
    else {
      console.log("Not Ready")
    }
  });

});
