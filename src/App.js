import './App.css';
import DataEntry from "./components/DataEntry"
import CountingPage from './components/CountingPage';
import Navbar from './components/Navbar';
import Guide from './components/Guide';
import {useState, React} from "react";
import {BrowserRouter as Router,
Routes,Route,Link} from "react-router-dom";
function App() {
  const [teamOne, setTeamOne] = useState("Team 1");
  const [teamTwo, setTeamTwo] = useState("Team 2");
  const [overs,setOvers] = useState("5")
  const [team1Players,setTeam1Players]=useState([])
  const [team2Players,setTeam2Players]=useState([])
  // function to get data from child components
  function sendDataToApp(data){
    setOvers(data.overs);
    setTeam1Players(data.team1Players)
    setTeam2Players(data.team2Players)
  }
  const onChangeHandler1 = (event) => {
    if(event.target.value.length!==0){
      setTeamOne(event.target.value);
    }
    else{
      setTeamOne("Team 1")
    }
    
  };
  const onChangeHandler2 = (event) => {
    if(event.target.value.length!==0){
      setTeamTwo(event.target.value);
    }
    else{
      setTeamTwo("Team 2")
    }
  };
  return (
    <> 
    <Router>
      <Routes>
        <Route path = "/" key={0} element={<>
          <Navbar/>
          <h1 className="text-center heading">Cricket Score  Counter</h1>
      <div className="container app-container" style={{height:'90vh'}}>
      <h1 className = "text-center heading">Enter Teams Name</h1>
        <h3 className = "text-center">{teamOne.toUpperCase()}</h3>
        <input
          type="text"
          id="team1"
          className="form-control"
          onChange={onChangeHandler1} placeholder="Enter Here"
        />
        <h5 style={{fontFamily:"cursive"}} className = "text-center">Vs</h5>
        <hr />
        <h3 className = "text-center">{teamTwo.toUpperCase()}</h3>
        <input type="text" className="form-control" onChange={onChangeHandler2} placeholder="Enter Here"/>
        <button className="btn btn-success" style = {{marginLeft:'35%',width:'30%'}} ><Link to="/enterdata"  className="btn btn-success" style = {{width:'100%',textAlign:'center'}}> Next</Link></button>
      </div>
      </>}>
      </Route>
      <Route path = "/enterdata" element = {<DataEntry key={1} team1 ={teamOne}  team2 = {teamTwo} sendDataToApp={sendDataToApp}/>}></Route>
      <Route path = "/count" element = {<CountingPage key={2} team1={teamOne} team2={teamTwo} overs={overs} team1Players={team1Players} team2Players={team2Players} teamOne={teamOne} teamTwo = {teamTwo} />}></Route>
      <Route path = "/guide" element = {<Guide/>}></Route>
      <Route path = "/about" element = {<Guide/>}></Route>
      </Routes>
      </Router>
    </>
  );
}

export default App;
