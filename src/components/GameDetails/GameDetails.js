import React,{ useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { BASE_URL } from "../../constraints"
import Platform from "../Platform/Platform";



function GameDetails(){

    const[game, setGame]=useState(null);    

    const {id}=useParams()
    
    useEffect(()=>{        
        fetch(BASE_URL+'games/'+id)
            .then(r=>r.json())
            .then(json =>setGame(json))            
            
    },[id])

    

    return(
        <div>
            {game && (
                <>
                    <div className="card" style={{width: '30rem'}}>
                        <div className="card-body">
                            <h2 className="card-title">{game.title}</h2>
                            <h5 className="card-subtitle mb-2 text-muted">Description:</h5>                        
                            <p className="card-text">{game.description}</p>
                            <h5 className="card-subtitle mb-2 text-muted">Genre id:</h5>                        
                            <p className="card-text">{game.genre_id}</p>
                            <h5 className="card-subtitle mb-2 text-muted">Platforms:</h5> 
                            {game.platforms.map(platform => <Platform platform={platform} />)}
                            <Link to='/games' ClassName="card-link">Back to Games Index</Link>                        
                        </div>
                    </div>
                </>
            )}
        </div>
    );
    
}


export default GameDetails;