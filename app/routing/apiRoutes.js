var friendsList = require("../data/friends.js");

module.exports = function(app) {

	// ============================ API Routes============================

	// API GET Request
	app.get("/api/friends", function(req, res) {
		
		return res.json(friendsList);
	});

	// API POST Request
	app.post("/api/friends", function(req, res) {
		
		var newFriend = req.body;
		var friendListScoreCard = [];

		for (i = 0; i < friendsList.length; i++) {
			var differenceScore = 0;
			for (j = 0; j < 10; j++) {

				var userScoreCard = newFriend['surveyResponses[]'];
				var friendScoreCard = friendsList[i].surveyResponses;

				differenceScore += Math.abs(parseInt(userScoreCard[j]) - friendsList[i].surveyResponses[j]);
			}
			friendListScoreCard.push(differenceScore);
		}

		var min = Math.min.apply(null, friendListScoreCard);
		for (k = 0; k < friendListScoreCard.length; k++) {
			if (friendListScoreCard[k] == min) {
				var newFriendName = friendsList[k].name;
				var newFriendPhoto = friendsList[k].photoURL;
				var bestFriend  = {
					newFriendName: newFriendName,
					newFriendPhoto: newFriendPhoto
				}
				res.send(bestFriend);
			};
		};
		friendsList.push(req.body);
	});
};