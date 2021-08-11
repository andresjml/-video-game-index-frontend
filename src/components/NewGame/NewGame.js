import React, {useState} from 'react'
import {BASE_URL} from '../../constraints/index'

function NewGame({onNewItem}) {

    const[formData, setformData]=useState({
        title: "",
        description: "",
        genre_id: ""
    })

    function handleInputChange(event){
        setformData({
            ...formData,
            [event.target.name]:event.target.value
        })
    }

    function handleSubmit(event){
        event.preventDefault()

        const gameToCreate = {            
            title: formData.title,
            description: formData.description,
            genre_id: parseInt(formData.genre_id)
        }

        fetch(BASE_URL + 'games', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameToCreate),
        })
          .then(res => res.json())
          .then(onNewItem);
          
          setformData({
            title: "",
            description: "",
            genre_id: ""
          })
          
    }

    return (
        <div className="row justify-content-start">
            <h1>New Game</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-5">
                    Title: 
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="title"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-5">
                    Description:
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={formData.description}
                        placeholder="description"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-5">
                    Genre ID:
                    <input
                        className="form-control"
                        type="text"
                        name="genre_id"
                        value={formData.genre_id}
                        placeholder="Genre ID"
                        onChange={handleInputChange}
                    />
                </div>
                
            
                
                
                <div className="col">
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
                </div>
            </div>
        </form>
            
        </div>
    )
}

export default NewGame;
