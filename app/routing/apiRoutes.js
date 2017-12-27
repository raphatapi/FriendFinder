var friend = require("../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friend);
	});

	app.post("/api/friends", function(req, res) {
		var newClient = req.body;
		var myScore = newClient.scores;
		var total = 0;
        var bestMatch = 100;
        var index = -1;

		for(var j = 0; j < friend.length; j++){
            total = 0;
            for(var i = 0; i < myScore.length; i++) {
				var dif = Math.abs(myScore[i] - friend[j].scores[i]);
				total += dif;
            };
			
            if (total < bestMatch) {
                bestMatch = total;
                index = j;
            };
        };
        friend.push(newClient);
        res.json(friend[index]);
	});
};