import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar"
import GamesContainer from "../GamesContainer/GameContainer"
import Genres from "../Genres/Genres"
import GameDetails from '../GameDetails/GameDetails'

function App() {


  return (
    <div className="bg-transparent">    
       <Router>      
        <NavBar />
          <Switch>
            <Route exact path="/">
              <h2>Home Page</h2>
            </Route>
            <Route exact path='/games'>
              <GamesContainer />
            </Route>
            <Route path='/games/:id'>
              <GameDetails />
            </Route>

          <Route path='/genres/'>
              <Genres />
          </Route>
          <Route path="*">
              <h1> 404 not found</h1>
          </Route>
       </Switch>
       </Router> 
    </div>   
  );
}

export default App;
