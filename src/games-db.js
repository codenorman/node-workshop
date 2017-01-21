var admin = require("firebase-admin");
var https = require('https');

admin.initializeApp({
    credential: admin.credential.cert("./src/config/games-f44bf-firebase-adminsdk-qqk8f-f94c799213.json"),
    databaseURL: "https://games-f44bf.firebaseio.com"
});

var defaultAuth = admin.auth();
var defaultDatabase = admin.database();

var games = defaultDatabase.ref("games");
var players = defaultDatabase.ref("players");


games.once('value').then(function (snapshot) {
    if (!snapshot.exists()) {
        console.log('INITIALIZE DATABASE ');
        games.set({
            'tic-tac-toe': {
                minPlayers: 2,
                maxPlayers: 2
            },
            'checkers': {
                minPlayers: 2,
                maxPlayers: 2
            },
            'Chess': {
                minPlayers: 2,
                maxPlayers: 2
            },
            'Klondike': {
                minPlayers: 1,
                maxPlayers: 1
            }

        });
        addGame('Poker', 2, 5);
        addGame('Go Fish', 2, 4);
        addGame('War', 2, 2);
        addGame('Go', 2, 2);
        addGame('Uno', 2, 10);
    }
});

var addPlayer = function(player, name){
    var newPlayer = players.child(player);
    newPlayer.push(name);

};

games.on('child_added', function (data) {
    for (var i = data.val().minPlayers; i <= data.val().maxPlayers; i++) {
        addPlayer(i, data.key)
    }
});

var addGame = function (name, minPlayers, maxPlayers) {
    console.log('addgame', name)
    var newGame = games.child(name);
    newGame.set({minPlayers: minPlayers, maxPlayers: maxPlayers});
};

var updateGame = function (name, minPlayers, maxPlayers) {
    var minKey = name + '/minPlayers';
    var maxKey = name + '/maxPlayers';
    games.update({
        minKey: minPlayers,
        maxKey: maxPlayers
    })
};

var deleteGame =  function (name) {
    games.remove(name);
};

var gamesList = function() {
    var result;
    games.on("value", function (snapshot) {
        result = snapshot.val();
    });
    return result;

};

module.exports = {
    addGame: addGame,
    updateGame: updateGame,
    deleteGame: deleteGame,
    gamesList: gamesList
};

