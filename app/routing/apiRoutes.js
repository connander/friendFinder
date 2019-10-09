var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        friends.push(req.body);

        var guestScore = req.body.scores;
        var newFriend = 0;
        var highestScoreDif = 50;

        for (var i = 0; i < (friends.length -1); i++) {
            var compare = friends[i].scores;
            var difference = 0;

            for (var j = 0; j < guestScore.length; j++) {
                var currentDif = Math.abs(parseInt(guestScore[j]) - parseInt(compare[j]));
                difference = difference + currentDif;
            }

            if (difference < highestScoreDif) {
                highestScoreDif = difference;
                newFriend = i;
            }
        }
        res.send(friends[newFriend]);
    });
};