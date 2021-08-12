import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {BASE_URL} from '../../constraints/index'
import NewGame from '../NewGame/NewGame'
import './GameContainer.css'
import Game from '../Game/Game'


export default function GameContainer() {
    const[games,setGames]=useState(null)
    const[edit, setEdit]=useState(false)
   
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
            .then(json=>setGames([...games, json]));
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
          .then(res => res.json())
          .then(json=>{
            const updatedGames = games.filter((game) =>
            game.id !== json.id)

          setGames(updatedGames);
       
        });
          
    }
    
    
    
    
    function populateGames(){
            return games.map(game=> <Game key={game.id} game={game} updatedGame={handleUpdateGame} deleteGame={handleDelete}/>)
    }
   

    
    
       

    return (
        <div>
            <NewGame createGame={createGame} />
            <div className="container">{games && populateGames()}</div>            
        </div>
        
    )

    
}
