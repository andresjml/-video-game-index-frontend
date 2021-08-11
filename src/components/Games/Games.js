import React,{ useState, useEffect } from "react"

import { BASE_URL } from "../../constraints"
import Form from "../Form/Form"


function Games({game, onEditGame, onDelete}){
    const {id, title,description,genre_id}=game
    const [toggle, setToggle]=useState(false)
    const [selectedGame, setSelectedGame] = useState(game);
    const [gameDet, setGameDet]=useState()
    const [toggle2, setToggle2]=useState(false)
    
    useEffect(()=>{
        fetch(BASE_URL+`games/${id}`)
            .then(res => res.json())
            .then(setGameDet);
    },[game])

    
    
    function handleUpdateclick(){
        setToggle(!toggle)      
                  
    }
    function handleDetailsclick(){
        setToggle2(!toggle2)      
                  
    }
    
    function handleDeleteClick(){
        const obj ={method: "DELETE"}

        fetch(BASE_URL+`games/${id}`, obj)
            .then(res => res.json())
            .then(onDelete(game));            
        
    }
    
    function handleChangeForm(name, value) {
        setSelectedGame({
          ...selectedGame,
          [name]: value,
        });
        
    }

    
   
    

    return(
        <div className="col-lg-4 py-3">
            <div className="card">
                
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    {/*<p className="card-text">Description: {description}</p>*/}         
                    {/*<p className="card-text">Genre ID: {genre_id}</p>*/}
                                        
                    <button className="btn btn-primary me-2" onClick={handleDetailsclick}>Details</button>
                    <button className="btn btn-secondary me-2" onClick={handleUpdateclick}>Update</button>
                    <button className="btn btn-danger me-2" onClick={handleDeleteClick}>Delete Item</button>
                    
                    {
                        toggle2 &&
                        <>
                        {/*<h5 className="card-title">{gameDet.title}</h5>*/}
                        <p className="card-text">Description: {gameDet.description}</p>            
                        <p className="card-text">Genre: {gameDet.genre_id}-{gameDet.genre_name}</p>
                        
                        </>
                    }
                    
                    
                    <Form toggle={toggle} game={selectedGame} onChangeForm={handleChangeForm} onEditGame={onEditGame}/>
                    
                </div>          
            </div>
        </div>
    )
}


export default Games;