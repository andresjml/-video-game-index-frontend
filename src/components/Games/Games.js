import React,{ useState } from "react"
import { BASE_URL } from "../../constraints"
import Form from "../Form/Form"

function Games({game, onEditGame, onDelete}){
    const {id, title,description,genre_id}=game
    const [toggle, setToggle]=useState(false)
    const [selectedGame, setSelectedGame] = useState(game);


    
    function handleUpdateclick(){
        setToggle(!toggle)                
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
                    <p className="card-text">Description: {description}</p>            
                    <p className="card-text">Genre ID: {genre_id}</p>
                                        
                    <button className="btn btn-primary me-2" onClick={handleUpdateclick}>Update</button>
                    <button className="btn btn-primary" onClick={handleDeleteClick}>Delete Item</button>
                    <Form toggle={toggle} game={selectedGame} onChangeForm={handleChangeForm} onEditGame={onEditGame}/>
                </div>          
            </div>
        </div>
    )
}


export default Games;