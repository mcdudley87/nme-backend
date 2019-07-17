const Game = require('./models/game');
const GameConsole = require('./models/gameconsole');
const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection;
const app = express();

app.use(express.urlencoded({extended: false}));

//Connect here
mongoose.connect('mongodb://localhost/nme-backend');


//========================CONSOLES====================//


//GET api/gameconsoles routes: game consoles

app.get('/gameconsoles', (req, res) => {
	GameConsole.find({}, function(err, gameConsole) {
		if (err) res.json(err)
		res.json(gameConsole)
  })
})

app.get('/gameconsoles/:gcid', (req, res) => {
	GameConsole.findById(req.params.id).populate('games').exec( (err, gameConsole) => {
		if (!err) {
			res.status(200).json(gameConsole);
		} else {
		res.status(500).json(err);
		}
	})
})

// CREATE

app.post('/gameconsoles', (req, res) => {
	GameConsole.create({
		make: req.body.make,
		model: req.body.model,
		games: req.body.game
	}, function(err, gameConsole) {
		res.json(gameConsole)
	})
})

// app.post('/gameconsoles', (req, res) => {
// 	GameConsole.create({
// 		make: req.body.make,
// 		model: req.body.model,
// 		games: req.body.game
// 	});
// 		gameconsole.save((err, gameconsole) => {
// 			res.status(201).json(gameconsole);
// 	});
// })



// app.post('/gameconsoles', (req, res) => {
// 	GameConsole.create({
// 		make: req.body.make,
// 		model: req.body.model,
// 		games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]
// 	}, function(err, gameConsole) {
// 		res.json(gameConsole)
// 	})
// })




// UPDATE route

app.put('/gameconsoles/:gcid', (req, res) => {
	GameConsole.findByIdAndUpdate(req.params.id, {}, function(err, gameConsole) {
		if (err) res.json(err)
		res.json(gameConsoles)
	})
})

// app.put('/gameconsoles/:id', (req, res) => {
// 	GameConsole.findByIdAndUpdate(req.params.id, {
// 		make: req.body.make,
// 		model: req.body.model

// 	}, function(err, gameConsole) {
// 		if (err) res.json(err)
// 		res.json(gameConsoles)
// 	})
// })






//DELETE route
app.delete("/gameconsoles", (req, res) => {
	GameConsole.findOneAndRemove(req.params.id, function(err) {
		if (err) res.json(err);
		res.json({message: "console deleted!"})
	})
})

//==================GAMES======================//

//GET routes: games

//GET ALL==
// app.get('/game', (req, res) => {
// 	user.find({}, function(err, games) {
// 		if (err) res.json(err)
// 		res.json(games)
//   })
// })


//GET
app.get('gameconsoles/:gcid/game/:gid', (req, res) => {
	Game.findById(req.params.id, function(err, game) {
		if (err) {
			res.json(err)
		}
		res.json(game)
	})
})

// CREATE
app.post('/game', (req, res) => {
	Game.create({
		name: String,
		year: String
	}, function(err, gameConsole) {
		res.json(game)
	})
})

// OOORRRR?????? //
//all routes should look more like this syntax.
app.post("/game/:gid", (req, res) => {
	Game.findById(req.params.id, function(err, game) {
		GameConsole.findById(req.body.id, function(err, gameConsole) {
			Game.GameConsole.push(GameConsole);
			Game.save( function (err ) {
				GameConsole.Games.push(game);
				GameConsole.save( function(err) {
					if (err) res.json(err)
					res.json(game)
				})
			})
		})
	})
})


//DELETE route
app.delete("/games", (req, res) => {
	Game.findOneAndRemove(req.params.id, function(err) {
		if (err) res.json(err);
		res.json({message: "game deleted!"})
	})
})


//ORRRR???//
// vv that shit down vv there is in process and not done.
app.delete("/game/:gid", (req, res) => {
	Game.findById(req.params.gid, function(err, game) {
		GameConsole.findById(req.body.gcid, function(err, gameConsole) {
			Game.GameConsole.push(GameConsole);
			Game.save( function (err ) {
				GameConsole.Games.push(game);
				GameConsole.save( function(err) {
					if (err) res.json(err)
					res.json(game)
				})
			})
		})
	})
})

app.listen(3001, function () {
	console.log('The Ghost in the Machine Can Hear Your Thoughts...')
});


//=====================================STEVE SOLUTIONS==============//
//Game post route, Steve's way

// app.post('/gameconsoles/:gcid/games', (req, res) => {
// 	GameConsole.findById(req.params.gcid, (err, gameconsoles) => {
// 		let newGame = new Game ({
// 			title: req.body.title,
// 			year: req.body.year
// 		});
// 		newGame.save((err, game) => {
// 			gameconsole.games.push(game._id);
// 			gameconsole.save((err, gameconsole) => {
// 				res.status(200).json(gameconsole);
// 			})
// 		})
// 	})
// })

// GAME DELETE ROUTE


// app.delete('/gameconsoles/:gcid/games/:gid', (req, res) => {
// 	GameConsole.findById(req.params.gcid, (err, gameconsole) => {
// 		gameconsole.games.pull(req.params.gid)
// 		gameconsole.save(err => {
// 			if (err) res.json(err)
// 			Game.deleteOne({_id: req.params.gid}, err => {
// 				if (err) res.json(err)
// 				res.json(1);
// 			})
// 		})
// 	})
// })