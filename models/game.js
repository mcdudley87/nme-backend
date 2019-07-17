//Game Schema
const express = require('express')
const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
	name: String,
	year: Number 
})

module.exports = mongoose.model('Game', gameSchema);




//in routes, import all caps game and gameConsoles


