import React, {useEffect,useState} from 'react'
import {BASE_URL} from '../../constraints/index'
import NewGame from '../NewGame/NewGame'
import './GameContainer.css'
import Game from '../Game/Game'


export default function GameContainer() {
    const[games,setGames]=useState(null)
    const [toggle, setToggle]=useState(false)
   
    //READ

    useEffect(()=>{
        fetch(BASE_URL +  'games')
        .then(r=>r.json())
        .then(setGames)
    },[])  

    //CREATE

    function createGame(game){        
        const gameToCreate = {            
            title: game.title,
            description: game.description,
            genre_id: parseInt(game.genre_id)
        }
        fetch(BASE_URL + 'games', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(gameToCreate),
          })
            .then(res => res.json())
            .then(json=>setGames([...games, json]))
            .finally(setToggle(false));
    }

    //UPDATE
    function handleUpdateGame(game){
        const gameToUpdate = {            
            title: game.title,
            description: game.description,
            genre_id: parseInt(game.genre_id)
        }

        fetch(BASE_URL +`games/${game.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameToUpdate),
        })
          .then(res => res.json())
          .then(json=>{
            const updatedGames = games.map((game) =>
            game.id === json.id ? json : game
          );
          setGames(updatedGames);
       
          });
    }
    
    
    //DELETE

    function handleDelete(game){
        fetch(BASE_URL + "games/" + game.id, {
            method: "DELETE",
          })
          const newGames = games.filter((g) => g.id !== game.id);
                setGames(newGames);
    }
    
    
    
    
    function populateGames(){
        return games.map(game=> <Game key={game.id} game={game} updatedGame={handleUpdateGame} deleteGame={handleDelete}/>)
    }
   

    
    
       

    return (
        <div className="container">
            <h3 className="display-1 text-center">Games</h3>
            <div  className="row">
            <button className="btn btn-primary" onClick={()=>setToggle(!toggle)}>Add New Game</button>
            </div>
            {toggle &&(
                <NewGame createGame={createGame} />
            )}
            
            <div className="row">{games && populateGames()}</div>            
        </div>
        
    )

    
}
