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
	</div>
	)
}

export default GameConsoleList; 