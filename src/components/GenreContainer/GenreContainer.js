import React, {useEffect,useState} from 'react'
import {BASE_URL} from '../../constraints/index'


export default function Genres() {
    const[genres,setGenres]=useState([])
    const [toggle, setToggle]=useState(false)
    const [newGenre, setNewGenre]=useState({name:""})
    
    //READ

    useEffect(()=>{
        fetch(BASE_URL +  'genres')
        .then(r=>r.json())
        .then(setGenres)
    },[])

    //CREATE

    function createGenre(genre){        
        
        fetch(BASE_URL + 'genres', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(genre),
          })
            .then(res => res.json())
            .then(json=>setGenres([...genres, json]))
            .finally(setToggle(false));
    }

    function handleInputChange(event) {
        setNewGenre({
            ...newGenre, 
            [event.target.name]:event.target.value
        })
        
    }    

    function handleSubmit(event){
        event.preventDefault()
        createGenre(newGenre)  
        setToggle(false)         
    }

    //DELETE

    function handleDelete(genre){
        fetch(BASE_URL + "genres/" + genre.id, {
            method: "DELETE",
          })
          const newGenres = genres.filter((g) => g.id !== genre.id);
                setGenres(newGenres);
    }
    
    //MAPING GENRES
    const displayGenres = genres.map((genre=>{
           return (<div className="col-lg-4 py-3">
                <div className="card" style={{width: '15rem'}}>                    
                    <div className="card-body">
                        <h5 className="card-title">{genre.id}-{genre.name}</h5>
                        <button className="btn btn-danger" onClick={()=>handleDelete(genre)}>Delete Genre</button>
                    </div>          
                </div>
            </div>)
        
    }))


    return(
        <>
            <h3 class="display-1 text-center">Genres</h3>
            <button className="btn btn-primary" onClick={()=>setToggle(!toggle)}>Add New Genre</button>  

            {/*it shows only if toggle is true*/}
            {toggle &&(
                <form onSubmit={handleSubmit} >
                    <div className="form-row">
                        <div className="col-5 pt-2">
                            Title: 
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={newGenre.name}
                                placeholder="name"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-5 pt-2">
                        <button type="submit" className="btn btn-success">
                            Submit!
                        </button>
                    </div>
                </form>)
            }


           {displayGenres}
        </>
    )
}
