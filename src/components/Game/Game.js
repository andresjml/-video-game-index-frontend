import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { BASE_URL } from '../../constraints'

export default function Game({game, updatedGame,deleteGame}) {
    const [toggle, setToggle]=useState(false)
    const [newGame, setNewGame]=useState({...game})
    const [genres, setGenres]=useState([])

    

     
    useEffect(()=>{
        fetch(BASE_URL + '/genres')
            .then(r=>r.json())
            .then(setGenres)
    },[])

    function handleEditClick(){
        setToggle(!toggle)
    }  

    function handleInputChange(event) {
        setNewGame({
            ...newGame, 
            [event.target.name]:event.target.value
        })
        
    }

    function handleSubmit(event){
        event.preventDefault()
        updatedGame(newGame)  
        setToggle(false)         
    }
    
    const displayGenres = genres.map((genre=>{
        return <option key={genre.id}  value={genre.id} >{genre.id+'-'+genre.name}</option>
    }))


    return (
        <div className="col py-3 lg-4" >
            <div className="card" style={{width: '18rem'}} >
                <div className="card-body">
                    <h5 className="card-title">{game.title}</h5>
                    
                                            
                    <Link to={`games/${game.id}`} className="btn btn-primary">Details</Link>
                    <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>  
                    
                    {
                    
                        toggle && (
                        <form onSubmit={handleSubmit} >
                            <div className="form-row">
                                <div className="col-5 pt-2">
                                    Title: 
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="title"
                                        value={newGame.title}
                                        placeholder="Title"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-5 pt-2">
                                    Description:
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="description"
                                        value={newGame.description}
                                        placeholder="Description"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-5 pt-2">
                                    Genre:
                                    <div className="input-group-prepend">                        
                                    </div>
                                    <select className="custom-select" id="inputGroupSelect01" name='genre_id' value ={newGame.genre_id} onChange={handleInputChange} >
                                        {displayGenres}
                                    </select>
                                </div>
                                
                                
                            
                                
                                
                                <div className="col-5 pt-2">
                                <button type="submit" className="btn btn-success">
                                    Submit!
                                </button>
                                </div>
                                
                                <div className="col-5 pt-2">
                                <button type="submit" className="btn btn-danger" onClick={() => deleteGame(game)}>
                                    Delete
                                </button>
                                </div>




                            </div>
                        </form>)                         





                    }

                </div>
            </div> 
        </div>
    )
}
