import React, {useEffect,useState} from 'react'
import {BASE_URL} from '../../constraints/index'


export default function Platforms() {
    const[platforms,setPlatforms]=useState([])
    const [toggle, setToggle]=useState(false)
    const [newPlatform, setNewPlatform]=useState({name:""})
    
    //READ

    useEffect(()=>{
        fetch(BASE_URL +  'platforms')
        .then(r=>r.json())
        .then(setPlatforms)
    },[])

    //CREATE

    function createPlatform(platform){        
        
        fetch(BASE_URL + 'platforms', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(platform),
          })    
            .then(res => res.json())
            .then(json=>setPlatforms([...platforms, json]))
            .finally(setToggle(false));
    }

    function handleInputChange(event) {
        setNewPlatform({
            ...newPlatform, 
            [event.target.name]:event.target.value
        })
        
    }    

    function handleSubmit(event){
        event.preventDefault()
        createPlatform(newPlatform)  
        //setToggle(false)         
    }

    //DELETE

    function handleDelete(platform){
        fetch(BASE_URL + "platforms/" + platform.id, {
            method: "DELETE",
          })
          const newPlatforms = platforms.filter((g) => g.id !== platform.id);
                setPlatforms(newPlatforms);
    }

    //MAPING PLATFORMS

    const displayPlatforms = platforms.map((platform=>{
           return (<div className="col-lg-4 py-3" key={platform.id}>
                <div className="card" style={{width: '15rem'}}>                    
                    <div className="card-body">
                        <h5 className="card-title">{platform.id}-{platform.name}</h5>
                        <button className="btn btn-danger" onClick={()=>handleDelete(platform)}>Delete Platform</button>
                    </div>          
                </div>
            </div>)
        
    }))


    return(
        <>
            <h3 className="display-1 text-center">Platforms</h3>
            <button className="btn btn-primary" onClick={()=>setToggle(!toggle)}>Add New Platform</button>

            {/*it shows only if toggle is true*/}
            {toggle &&(
                <form onSubmit={handleSubmit} >
                    <div className="form-row">
                        <div className="col-5 pt-2">
                            Name: 
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={newPlatform.name}
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
           {displayPlatforms}
        </>
    )
}
