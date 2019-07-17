import React from 'react';

const GameConsoleList = props => {
	let gameConsoles; 
	if (props.gameConsoles.length) {
		gameConsoles = props.gameConsoles.map((gameConsole, index) => {
		return <p className='gameconsolerow' key={index}>{gameConsole.name}</p>
		})
} else { 
	gameConsoles = <p>No Game Console Data!</p>
}
return (
	<div className='GameConsoleList'>
		<h3>All the Consoles:</h3>
		{gameConsoles}
		<hr />
		<form onSubmit={props.handleSubmit}>
			<input onChange={props.handleGameConsoleMakeChange} type="text" make="make" placeholder="Make (e.g. Nintendo...)" value={props.name} />
			<input onChange={props.handleGameConsoleModelChange} type="text" model="model" placeholder="Model (e.g. GameCube...)" value={props.model} />
			<input type="submit" value="Add Console" />
		</form>
	</div>
	)
}

export default GameConsoleList; 