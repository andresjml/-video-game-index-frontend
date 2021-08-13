import React, {useEffect,useState} from 'react'
import {BASE_URL} from '../../constraints/index'

export default function GamePlatformContainer() {
    const[gamePlatforms,setGamePlatforms]=useState([])
    const [toggle, setToggle]=useState(false)
    const [newGamePlatform, setNewGamePlatform]=useState({game_id:"", platform_id: ""})
    const [games, setGames]=useState([])
    const [platforms, setPlatforms]=useState([])
    //const[formData, setformData]=useState({game_id: "",platform_id: ""}) 
    
    //READ

    useEffect(()=>{
        fetch(BASE_URL +  'game_platform')
        .then(r=>r.json())
        .then(setGamePlatforms)
    },[])

    //CREATE

    function createGamePlatform(gamePlatform){        
        
        fetch(BASE_URL + 'game_platform', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(gamePlatform),
          })    
            .then(res => res.json())
            .then(json=>setGamePlatforms([...gamePlatforms, json]))
            .finally(setToggle(false));
    }

    function handleInputChange(event) {
        setNewGamePlatform({
            ...newGamePlatform, 
            [event.target.name]:event.target.value
        })
        
    }    

    function handleSubmit(event){
        event.preventDefault()
        createGamePlatform(newGamePlatform)  
        //setToggle(false)         
    }

    //DELETE

    function handleDelete(gamePlatform){
        fetch(BASE_URL + "game_platform/" + gamePlatform.id, {
            method: "DELETE",
          })
          const newGamePlatforms = gamePlatforms.filter((g) => g.id !== gamePlatform.id);
          setGamePlatforms(newGamePlatforms);
    }

    //MAPING GAMEPLATFORMS

    const displayPlatforms = gamePlatforms.map((gamePlatform=>{
           return (<div className="col-lg-4 py-3" key={gamePlatform.id}>
                <div className="card" style={{width: '18rem'}}>                    
                    <div className="card-body">
                        <h5 className="card-subtitle mb-2 text-muted">Relationship:{gamePlatform.id}</h5>
                        <h5 className="card-title">game_id:{gamePlatform.game_id}-platform_id:{gamePlatform.platform_id}</h5>
                        <button className="btn btn-danger" onClick={()=>handleDelete(gamePlatform)}>Delete Relationship</button>
                    </div>          
                </div>
            </div>)
        
    }))

    //GETTING VIDEO GAME ID

    useEffect(()=>{
        fetch(BASE_URL + '/games')
            .then(r=>r.json())
            .then(setGames)
            
    },[])

    const displayGameId = games.map((game=>{
        return <option  key={game.id} value={game.id}>{game.id+'-'+game.title}</option>
    }))

    //GETTING PLATFORM ID

    useEffect(()=>{
        fetch(BASE_URL + '/platforms')
            .then(r=>r.json())
            .then(setPlatforms)
            
    },[])

    const displayPlatformId = platforms.map((platform=>{
        return <option  key={platform.id} value={platform.id} >{platform.id+'-'+platform.name}</option>
    }))

    

    


    return(
        <>
            <h3 className="display-1 text-center">Game/Platform Relationship</h3>
            <button className="btn btn-primary" onClick={()=>setToggle(!toggle)}>Add New Relationship</button>

            {/*it shows only if toggle is true*/}
            {toggle &&(
                <>
                <form onSubmit={handleSubmit}>
                    <div className="col-5 pt-2">
                        Game:
                        
                        <select className="custom-select" id="inputGroupSelect01" name='game_id' value ={newGamePlatform.game_id} onChange={handleInputChange} >
                            <option selected>Choose...</option>
                            {displayGameId}                    
                        </select>
                    </div>
                    <div className="col-5 pt-2">
                        Platform:
                        
                        <select className="custom-select" id="inputGroupSelect01" name='platform_id' value ={newGamePlatform.platform_id} onChange={handleInputChange} >
                            <option selected>Choose...</option>
                            {displayPlatformId}                    
                        </select>
                    </div>
                    <div className="col pt-2">
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </div>
                </form>
                </>)
            }
           {displayPlatforms}
        </>
    )
}
