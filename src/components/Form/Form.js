import React,{useState, useEffect} from "react"
import {BASE_URL} from '../../constraints/index'

function Form({toggle,game, onChangeForm, onEditGame}){
    const [genres, setGenres]=useState([])

    useEffect(()=>{
        fetch(BASE_URL + '/genres')
            .then(r=>r.json())
            .then(setGenres)
    },[])

    if (!toggle) return null;

    const {id, title,description,genre_id}=game

    function handleInputChange(event) {
        onChangeForm(event.target.name, event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault()

        const gameToUpdate = {            
            title: title,
            description: description,
            genre_id: parseInt(genre_id)
        }

        fetch(BASE_URL +`games/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameToUpdate),
        })
          .then(res => res.json())
          .then(onEditGame)   
    }
    
    const displayGenres = genres.map((genre=>{
        return <option  value={genre.id} >{genre.id+'-'+genre.name}</option>
    }))

   
    return(
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="col-5 pt-2">
                    Title: 
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={title}
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
                        value={description}
                        placeholder="Description"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-5 pt-2">
                    Genre:
                    <div className="input-group-prepend">                        
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" name='genre_id' value ={genre_id} onChange={handleInputChange} >
                        {displayGenres}
                    </select>
                </div>
                
                
            
                
                
                <div className="col-5 pt-2">
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
                </div>
            </div>
        </form>
    );
}

export default Form;