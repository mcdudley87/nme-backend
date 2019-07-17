//Game Console Schema
const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;



const gameConsoleSchema = new mongoose.Schema({
	make: String,
	model: String,
	games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]
});

module.exports = mongoose.model('GameConsole', gameConsoleSchema);


//============//


