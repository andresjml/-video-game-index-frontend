import React, {useEffect,useState} from 'react'
import {BASE_URL} from '../../constraints/index'


export default function Genres() {
    const[genres,setGenres]=useState([])
    

    useEffect(()=>{
        fetch(BASE_URL +  'genres')
        .then(r=>r.json())
        .then(setGenres)
    },[])

    console.log(genres)

    const displayGenres = genres.map((genre=>{
           return (<div className="col-lg-4 py-3">
                <div className="card">                    
                    <div className="card-body">
                        <h5 className="card-title">{genre.id}-{genre.name}</h5>
                    </div>          
                </div>
            </div>)
        
    }))


    return(
        <>
           {displayGenres}
        </>
    )
}
