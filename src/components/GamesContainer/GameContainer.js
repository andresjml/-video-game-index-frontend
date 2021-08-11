import React, {useEffect,useState} from 'react'
import {BASE_URL} from '../../constraints/index'
import Games from '../Games/Games'
import NewGame from '../NewGame/NewGame'

export default function GameContainer() {
    const[games,setGames]=useState([])
    const[showNewGame, setShowNewGame]=useState(false)

    useEffect(()=>{
        fetch(BASE_URL +  'games')
        .then(r=>r.json())
        .then(setGames)
    },[])

    function handleShowNewGame(){
        setShowNewGame(!showNewGame)
    }

    function handleNewGame(NewGame){
        setGames([...games, NewGame]);
        setShowNewGame(!showNewGame)
    }

    function handleEditGame(updatedGame) {
        const updatedGames = games.map((game) =>
          game.id === updatedGame.id ? updatedGame : game
        );
        setGames(updatedGames);
    }   

    function handleDeleteGame(deletedGame){
        const updatedGames = games.filter((game) =>
            deletedGame.id !== game.id
        );

        setGames(updatedGames);
    }

    const displayGames = games.map((game=>{
               return <Games key={game.id} game={game} onEditGame={handleEditGame} onDelete={handleDeleteGame}/>
    }))

    

    return (
        <div className="container">
            <button onClick={handleShowNewGame} className="btn btn-success mt-3">Add New Game</button>
            {showNewGame? <NewGame onNewItem={handleNewGame}/>: null }
            <div className="row">
                {displayGames}
            </div>
            
        </div>
    )
}
{/*comment*/}