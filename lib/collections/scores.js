Scores = new Meteor.Collection("scores");

Scores.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});


Meteor.methods({
  scoreInsert: function(score) {
    var user = Meteor.user();
    var scoreDocument =  {
      userId: user._id, 
      score: score,
      name: user.profile.name, 
      submitted: new Date()
    };
    var scoreId = Scores.insert(scoreDocument);
    return {
      _id: scoreId
    };
  }
});