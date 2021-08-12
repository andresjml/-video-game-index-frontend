import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar"
import GameContainer from "../GameContainer/GameContainer"
import GenreContainer from "../GenreContainer/GenreContainer"
import GameDetails from '../GameDetails/GameDetails'
import PlatformContainer from '../PlatformContainer/PlatformContainer';

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
              <GameContainer />
            </Route>
            <Route path='/games/:id'>
              <GameDetails />
            </Route>

          <Route path='/genres'>
              <GenreContainer />
          </Route>
          <Route path='/platforms'>
              <PlatformContainer />
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
