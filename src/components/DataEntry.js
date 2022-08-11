import {React,useState}from 'react'
// import {props} from 'react'
import './style/DataEntry.css'
import {Link} from 'react-router-dom';
export default function DataEntry(props) {
  //states used in this components
  const [selectTeam,setSelectTeam] = useState("select team to enter player names")
  const [overs,setOvers] = useState("5")
  const [team1Players,setTeam1Players]=useState([])
  const [team2Players,setTeam2Players]=useState([])
  //data that will send to parent component
  let data = {
    overs:overs,
    team1Players:team1Players,
    team2Players:team2Players
  }
  
  //prevent reload function
  window.onbeforeunload = function() {
    return "Dude, are you sure you want to leave? Think of the kittens!";
}
//function run after load
window.onload = ()=>{
  window.location ='/'
}
//to select team to enter team's players
const selectTeamChange = (event)=>{
 setSelectTeam(event.target.value)
}
//submit players
const submitPlayers = ()=>{
  const values = document.getElementById('playertext').value;
  const valueArray= values.split(",")
  if(selectTeam===props.team1){
    setTeam1Players(valueArray)
    document.getElementById('playertext').value= ""
    setSelectTeam(props.team2)
  }
  else if(selectTeam===props.team2){
    setTeam2Players(valueArray)
    document.getElementById('playertext').value= ""
    setSelectTeam(props.team1)
  }

}
//select overs
const onOverChange = (event)=>{
  setOvers(event.target.value)
}
  return (
    <>
    <div className="container app-container">
    <h1 className="text-center heading">Cricket Score  Counter</h1>
   <div className="">
    {<h1 className ="heading">{props.team1.toUpperCase()} <i>vs</i> {props.team2.toUpperCase()}</h1>}
    <div className="container">
    
    <div className="form-group">
      <label htmlFor="over">Overs</label>
      {/* select overs passing props as string*/}
      <select className="form-select" id="over" onChange={onOverChange}>
        <option value ='5'>5</option>
        <option value ='10'>10</option>
        <option value ='15'>15</option>
        <option value ='20'>20</option>
      </select>
      <p>{parseFloat(overs)}</p>
    </div>
    {/* selecting teams in dropdown option */}
    <select className="form-select" onChange={selectTeamChange}>
      <option hidden>Select team To Enter Players Names</option>
      <option value={props.team1}>{props.team1}</option>
      <option value={props.team2}>{props.team2}</option>
    </select>
    <p>{selectTeam}</p>
    {/* entry of players name */}
    <div className="form-group">
    <label htmlFor="playertext">Players Names</label>
    <textarea className="form-control" id="playertext" placeholder = {`Enter Players Name Seprated By  ,` }></textarea>
    <button className="btn btn-success submitButton" onClick = {submitPlayers}>Submit</button>

    <div className="teamListContainer container">
      <div className="team1">
        {/* team1 entry */}
        <h1>{props.team1.toUpperCase()}</h1>
    {team1Players.map((players)=>
    <i>
      {team1Players.indexOf(players)+1} : {players} <br />
    </i>
    )}
    </div>
    {/* team2 entry */}
    <div className="team2">
      <h1>{props.team2.toUpperCase()}</h1>
    {team2Players.map((players)=>
        <i>
        {team2Players.indexOf(players)+1} : {players} <br />
      </i>
    )}
    </div>
    </div>
  </div>
  {/* go to page after entering details */}
  <div className="container">
    <button disabled = {team1Players.length===0||team2Players.length===0} onClick = {props.sendDataToApp(data)} className="btn btn-success" style={{marginLeft:'35%',width:'30%'}}><Link className="btn btn-success" to="/count" style={{width:'100%'}}>Start</Link></button>
  </div>
    </div>
    </div>
    </div>
    
    </>
  )
    }
