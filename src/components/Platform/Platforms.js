import React, {useEffect,useState} from 'react'
import {BASE_URL} from '../../constraints/index'


export default function Platforms() {
    const[platforms,setPlatforms]=useState([])
    

    useEffect(()=>{
        fetch(BASE_URL +  'platforms')
        .then(r=>r.json())
        .then(setPlatforms)
    },[])

    

    const displayPlatforms = platforms.map((platform=>{
           return (<div className="col-lg-4 py-3">
                <div className="card">                    
                    <div className="card-body">
                        <h5 className="card-title">{platform.id}-{platform.name}</h5>
                    </div>          
                </div>
            </div>)
        
    }))


    return(
        <>
           {displayPlatforms}
        </>
    )
}
