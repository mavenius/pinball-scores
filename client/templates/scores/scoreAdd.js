var scoreAdd = function() {
    var scoreInput =  document.getElementById("score-input");
	var rawScore = scoreInput.value;
    var score = Number(rawScore);
    scoreInput.value = '';

    if(score <= 0) {
      swal({ type: "error", title: "Invalid Score!", text: "Score must be a positive number" });
	  scoreInput.value = rawScore;
      return;
    }
    Meteor.call('scoreInsert', score, Session.get("currentGame"), function(error, result) {
      // display the error to the user and abort
      if (error) {
        scoreInput.value = rawScore;
        return swal({ type: "error", title: error.reason });
      } else { 
        swal({type: "success", title: "Score added sucessfully!", text: "Nice job!" });
      }
    });
}

Template.scoreAdd.events({
  "keypress #score-input": function (evt, template) {
    if (evt.which === 13) {
      scoreAdd();
    }
  },
  "click .add-score": function (event, template) {
    scoreAdd();
  }
});