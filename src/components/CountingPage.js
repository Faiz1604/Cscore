import { React, useState,useEffect } from "react";
import "./style/CountingPage.css";
import html2pdf from "html2pdf.js";
const CountingPage = (props) => {
  //states used in this components
  const [thisOver, setThisOver] = useState([]);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [over, setOver] = useState(0);
  const [battingTeam, setBattingTeam] = useState("NULL");
  const [ballCount, setBallCount] = useState(0);
  const [currentBowler, setCurrentBowler] = useState("");
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [batStats, setBatStats] = useState([]);
  const [bowlStats, setBowlStats] = useState([]);
  
  useEffect(()=>{
    let sessionData = sessionStorage.getItem('fullStats');
    if (sessionData){
    const parsedData = JSON.parse(sessionData);
    setThisOver(parsedData.lThisOver);
    setRuns(parsedData.lruns);
    setWickets(parsedData.lwickets);
    setOver(parsedData.lover);
    setBattingTeam(parsedData.lbattingTeam);
    setBallCount(parsedData.lballCount);
    setCurrentBowler(parsedData.lcurrentBowler);
    setStriker(parsedData.lstriker);
    setNonStriker(parsedData.lnonStriker);
    setBatStats(parsedData.lbatStats);
    setBowlStats(parsedData.lbowlStats);
    }
  },[])
  //set data in session storage
  function setStats(){
   var setFullStat = {lThisOver:thisOver,lruns:runs,lwickets:wickets,lover:over,lbattingTeam:battingTeam,lballCount:ballCount,lcurrentBowler:currentBowler,lstriker:striker,lnonStriker:nonStriker,lbatStats:batStats,lbowlStats:bowlStats}
    sessionStorage.setItem(
      "fullStats",
      JSON.stringify(setFullStat)
    );
  }
  window.onbeforeunload = function(event) {

    setStats();
}
//function tp download pdf
  function generatePDF() {
    showScoreBoard();
    // Choose the element that our invoice is rendered in.
    const element = document.getElementById("stats");
    // Choose the element and save the PDF for our user.
    element.style.display = "inline";
    html2pdf()
      .set({ html2canvas: { scale: 4 }, margin: [10, 10, 5, 10] })
      .from(element)
      .save(`${props.team1} vs ${props.team2}.pdf`);
  }
  // window.onload = () => {
  //   window.location = "/";
  // };

  //functions to disabled button if any condition is not true

  const disableButton = () => {
    if (
      wickets >= 10 ||
      over === props.overs ||
      currentBowler.length === 0 ||
      striker.length === 0 ||
      battingTeam === "Null" ||
      nonStriker.length === 0 ||
      over >= props.overs
    ) {
      return true;
    } else {
      return false;
    }
  };

  //function to select batting team
  const selectBattingTeam = (event) => {
    setBattingTeam(event.target.value);
    
  };
  //selecting of bowler
  const changeBowler = (event) => {
    setCurrentBowler(event.target.value.split(" ")[0]);
    updateBowlStatsArray(event.target.value);
    
  };
  //function to update ball count and update running overs and update other function that flow with every ball//
  const updateBall = (thisOverBalls) => {
    let newBallCount = Number(ballCount) + Number(1);
    if (newBallCount === 6) {
      setThisOver([]);
      setBallCount(0);
      setCurrentBowler("");
      let updateOver = Number(over) + Number(1);
      // setStriker(nonStriker);
      // setNonStriker(striker);
      setOver(updateOver);
    } else {
      setBallCount(newBallCount);
      const newThisOver = [thisOver, thisOverBalls];
      setThisOver(newThisOver);
    }
    updateStriker(thisOverBalls);
  };
  // function to change strikers;
  const updateStriker = (runPerBall) => {
    if (Number(ballCount) + Number(1) !== 6) {
      if (Number(runPerBall) === 1 || Number(runPerBall) === 3) {
        setStriker(nonStriker);
        setNonStriker(striker);
        ;
      }
    }
    // if (
    //   (Number(runPerBall) === 1 && ballCount === 6) ||
    //   (Number(runPerBall) === 3 && ballCount === 6)
    // ) {
    //   const endOverStriker = striker;
    //   setStriker(endOverStriker);
    //   const endOverNonStriker = nonStriker;
    //   setNonStriker(endOverNonStriker);
    // }
  };
  //thisOver array update for wide and no ball;
  const zeroThisOverUpdate = (thisOverBalls) => {
    const newThisOver = [thisOver, thisOverBalls];
    setThisOver(newThisOver);
  };
  //selecting striker
  const onStrike = (event) => {
    if (event.target.value !== nonStriker) setStriker(event.target.value);
    updateBatStatsArray(event.target.value);
    
  };
  //selecting non striker
  const onNonStrike = (event) => {
    if (event.target.value !== striker) {
      setNonStriker(event.target.value);
      updateBatStatsArray(event.target.value);
    }
    
  };
  //updating batStatsArray
  const updateBatStatsArray = (batname) => {
    if (!batStats.some((batName) => batName.name === batname)) {
      const statArray = [
        {
          name: batname,
          batRun: 0,
          ballPlayed: 0,
          fours: 0,
          sixes: 0,
          out: false,
          caughtBy: "",
          bowlBy: "",
        },
      ];
      const newStatsArray = batStats.concat(statArray);
      setBatStats(newStatsArray);
    }
  };
  //function to update batStats
  const updateBatsmanStats = (toUpdate) => {
    for (let x of batStats) {
      if (x.name === striker) {
        if (Number(toUpdate) === 4) {
          x.batRun = x.batRun + Number(toUpdate);
          x.ballPlayed = x.ballPlayed + 1;
          x.fours = x.fours + 1;
        } else if (Number(toUpdate) === 6) {
          x.sixes = x.sixes + 1;
          x.batRun = x.batRun + Number(toUpdate);
          x.ballPlayed = x.ballPlayed + 1;
        } else if (toUpdate === "wk") {
          x.out = true;
          let bowlby = currentBowler;
          x.bowlBy = bowlby;
        } else {
          x.batRun = x.batRun + Number(toUpdate);
          x.ballPlayed = x.ballPlayed + 1;
        }
      }
    }
  };
  //update bowling stats array
  const updateBowlStatsArray = (bowlername) => {
    if (!bowlStats.some((bowlerName) => bowlerName.name === bowlername)) {
      const statArray = [
        {
          name: bowlername,
          bowlRun: 0,
          overByBowler: 0,
          ballInThisOver: 0,
          maiden: 0,
          bowlerWickets: 0,
        },
      ];
      const newStatsArray = bowlStats.concat(statArray);
      setBowlStats(newStatsArray);
    }
  };
  const changeStrike = () => {
    setStriker(nonStriker);
    setNonStriker(striker);
  };
  //function to visible runout select option
  const visibleRunoutOption = () => {
    const runout = document.getElementById("runoutdropdown");
    const runoutOption = document.getElementById("select-run-out");
    runout.style.display = "inline-block";
    runoutOption.style.width = "100%";
    runoutOption.style.height = "30%";
    runoutOption.style.marginTop = "5%";
  };
  // function to update if runout
  const runOut = (event) => {
    const outBatsMan = event.target.value;
    for (let batsman of batStats) {
      if (batsman.name === outBatsMan) {
        batsman.out = true;
      }
      if (outBatsMan === striker) {
        setStriker("");
        document.getElementById("select-run-out").selectedIndex = "-1";
      }
      if (outBatsMan === nonStriker) {
        setNonStriker("");
        document.getElementById("select-run-out").selectedIndex = "-1";
      }
    }
    setWickets(Number(wickets) + Number(1));
    document.getElementById("runoutdropdown").style.display = "none";
  };
  //function to update if caught out
  const caughtOut = () => {
    for (let x of batStats) {
      if (x.name === striker) {
        x.out = true;
        let bowlby = currentBowler;
        x.bowlBy = bowlby;
      }
    }
    setStriker("");
    setWickets(Number(wickets) + Number(1));
    updateBall("C");
    updateBatsmanStats("0");
  };

  //updating bye runs
  const updateByeRuns = () => {
    const byeRuns = document.getElementById("bye-runs").value;
    setRuns(Number(runs) + Number(byeRuns));
    document.getElementById("bye-runs").value = null;
  };
  //updating bowling stats
  const updateBowlingStats = (updateThis) => {
    for (let x of bowlStats) {
      if (x.name === currentBowler) {
        if (x.ballInThisOver + Number(1) === 6) {
          x.ballInThisOver = 0;
          x.overByBowler = x.overByBowler + Number(1);
        } else if (updateThis === "wd" || updateThis === "N") {
          x.ballInThisOver = x.ballInThisOver + Number(0);
        } else {
          x.ballInThisOver = x.ballInThisOver + Number(1);
        }
        if (
          updateThis === "1" ||
          updateThis === "2" ||
          updateThis === "3" ||
          updateThis === "4" ||
          updateThis === "6"
        ) {
          x.bowlRun = Number(x.bowlRun) + Number(updateThis);
        }
        if (updateThis === "wd" || updateThis === "N") {
          x.bowlRun = x.bowlRun + 1;
        }
        if (updateThis === "wk" || updateThis === "c") {
          x.bowlerWickets = x.bowlerWickets + 1;
        }
      }
    }
  };
  //function to display scoreboard or stats
  const showScoreBoard = () => {
    const scoreboardBtn = document.getElementById("scoreboardbtn");
    const scoreBoard = document.getElementById("stats");
    if (scoreBoard.style.display === "none") {
      scoreboardBtn.style.background = "white";
      scoreboardBtn.style.color = "grey";
      scoreBoard.style.display = "inline";
    } else if (scoreBoard.style.display === "inline") {
      scoreboardBtn.style.background = "#095252";
      scoreboardBtn.style.color = "white";
      scoreBoard.style.display = "none";
    } else {
      scoreboardBtn.style.background = "#095252";
      scoreBoard.style.display = "none";
      scoreboardBtn.style.color = "white";
    }
  };
  return (
    <>
      {/*main layout started from here */}

      <div className=" container main app-container"  style={{height:'100%'}}>
        {
          <>
          <h1 className="text-center heading">Cricket Score  Counter</h1>
          <h1 className="heading" style={{ marginTop: "20px" }}>
            {props.team1.toUpperCase()} <i>vs</i> {props.team2.toUpperCase()}
          </h1>
          </>
        }
        {/* //select team for batting and bowler for bowling */}

        <div className="d-flex justify-content-between">
          <div className="form-group">
            <label htmlFor="battingteam">Batting Team</label>
            <select id="battingteam" onChange={selectBattingTeam}>
              <option value="" hidden>
                Select Batting Team
              </option>
              <option value={props.team1}>{props.team1}</option>
              <option value={props.team2}>{props.team2}</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bowlingteam">Bowler</label>
            <select
              id="bowlingteam"
              onChange={changeBowler}
              style={{ color: "white" }}
            >
              <option value="" hidden default>
                Select bowler
              </option>
              {battingTeam === props.team1
                ? props.team2Players.map((players) => (
                    <option
                      key={props.team2Players.indexOf(players)}
                      value={players.trim()}
                    >
                      {players.trim()}
                    </option>
                  ))
                : props.team1Players.map((players) => (
                    <option value={players.trim()}>{players}</option>
                  ))}
            </select>
          </div>
        </div>
        {/* //score card div */}

        <div className="scorecard">
          <div className="score">
            <div
              className="battingteam"
              style={{ width: "33%", textAlign: "center" }}
            >
              <h1>{battingTeam==="NULL"?"Select":battingTeam.slice(0, 3).toUpperCase()}</h1>
            </div>
            <div className="runsover" style={{ width: "33%" }}>
              <h3>
                {runs}/{wickets < 10 ? wickets : "All Out"} ({over}.{ballCount}/
                {props.overs})
              </h3>
            </div>
            <div className="bowler" style={{ width: "33%" }}>
              {currentBowler}(0.{ballCount})<br />
              <span style={{ fontSize: "small" }}>This Over</span>:
              {thisOver.map((thisover) => {
                return (
                  <span style={{ fontSize: "x-small" }}>{thisover + " "}</span>
                );
              })}
            </div>
          </div>
        </div>
        {/* //batting stats */}
        <div className=" container my-4">
          {/* //selecting batsmen */}
          <div className="selecting-batters">
            {/* //on strike */}
            <div className="form-group">
              <label htmlFor="batter-on-strike">On Strike</label>
              <select id="batter-on-strike" onChange={onStrike}>
                <option value="" hidden>
                  Select
                </option>
                {battingTeam === props.team1
                  ? props.team1Players.map((players) => (
                      <option value={players.trim()}>{players}</option>
                    ))
                  : props.team2Players.map((players) => (
                      <option value={players.trim()}>{players}</option>
                    ))}
              </select>
            </div>
            {/* //selecting non striker */}
            <div className="form-group">
              <label htmlFor="batter-on-nonstrike">On Non-Strike</label>
              <select id="batter-on-nonstrike" onChange={onNonStrike}>
                <option hidden default>
                  Select
                </option>
                {battingTeam === props.team1
                  ? props.team1Players.map((players) => (
                      <option value={players.trim()}>{players}</option>
                    ))
                  : props.team2Players.map((players) => (
                      <option value={players.trim()}>{players}</option>
                    ))}
              </select>
            </div>
          </div>
          {/* //batsmen running stats */}
          <div className="d-flex justify-content-between current-batter-card">
            <h6>
              &#127951;{striker.split(" ")[0]}&ensp;
              <span>
                {batStats.map((batter) => {
                  if (batter.name === striker) {
                    return (
                      <span>
                        {batter.batRun}
                        <span>
                          <span>(</span>
                          {batter.ballPlayed}
                          <span>)</span>
                        </span>
                      </span>
                    );
                  } else {
                    return "";
                  }
                })}
              </span>
            </h6>
            <h6>
              {nonStriker.split(" ")[0]}&ensp;
              <span>
                {batStats.map((batter) => {
                  if (batter.name === nonStriker) {
                    return (
                      <span>
                        {batter.batRun}
                        <span>
                          <span>(</span>
                          {batter.ballPlayed}
                          <span>)</span>
                        </span>
                      </span>
                    );
                  } else {
                    return "";
                  }
                })}
              </span>
            </h6>
          </div>
          <h4 style={{ textAlign: "center" }}>
            <button
              className="btn btn-dark"
              onClick={changeStrike}
              style={{ positon: "fixed" }}
            >
              &#x2770;&#x2771;
            </button>
          </h4>
        </div>
        {/* //button to update scorecard */}
        <div id="runoutdropdown" className="my-3">
          <label htmlFor="select-run-out">Select Out Batsman</label> <br />
          <select id="select-run-out" onChange={runOut}>
            <option  hidden></option>
            <option value={striker}>{striker}</option>
            <option value={nonStriker}>{nonStriker}</option>
          </select>
        </div>
        <div className="run-btns">
          <button
            className="btn btn-danger btn-small scoreupdate-btn"
            onClick={() => {
              setRuns(Number(runs) + Number(1));
              zeroThisOverUpdate("wd");
              updateBowlingStats("wd");
              
            }}
            disabled={disableButton()}
          >
            wd
          </button>
          <button
            className="btn btn-danger btn-small scoreupdate-btn"
            onClick={() => {
              setRuns(Number(runs) + Number(1));
              zeroThisOverUpdate("N");
              updateBowlingStats("N");
              
            }}
            disabled={disableButton()}
          >
            N
          </button>
          <button
            className="btn btn-dark btn-small scoreupdate-btn"
            onClick={() => {
              setRuns(Number(runs) + Number(0));
              updateBall("0");
              updateBatsmanStats("0");
              updateBowlingStats("0");
              
            }}
            disabled={disableButton()}
          >
            0
          </button>
          <button
            className="btn btn-primary btn-small scoreupdate-btn"
            onClick={() => {
              setRuns(Number(runs) + Number(1));
              updateBall("1");
              updateBatsmanStats("1");
              updateBowlingStats("1");
              
            }}
            disabled={disableButton()}
          >
            1
          </button>
          <button
            className="btn btn-primary btn-small scoreupdate-btn"
            onClick={() => {
              setRuns(Number(runs) + Number(2));
              updateBall("2");
              updateBatsmanStats("2");
              updateBowlingStats("2");
              
            }}
            disabled={disableButton()}
          >
            2
          </button>
          <button
            className="btn btn-primary btn-small scoreupdate-btn"
            onClick={() => {
              setRuns(Number(runs) + Number(3));
              updateBall("3");
              updateBatsmanStats("3");
              updateBowlingStats("3");
              
            }}
            disabled={disableButton()}
          >
            3
          </button>
          <button
            className="btn btn-warning btn-small scoreupdate-btn"
            onClick={() => {
              setRuns(Number(runs) + Number(4));
              updateBall("4");
              updateBatsmanStats("4");
              updateBowlingStats("4");
              
            }}
            disabled={disableButton()}
          >
            4
          </button>
          <button
            className="btn btn-success btn-small scoreupdate-btn"
            onClick={() => {
              setRuns(Number(runs) + Number(6));
              updateBall("6");
              updateBatsmanStats("6");
              updateBowlingStats("6");
              
            }}
            disabled={disableButton()}
          >
            6
          </button>
          <button
            className="btn btn-danger btn-small scoreupdate-btn"
            onClick={() => {
              setWickets(Number(wickets) + Number(1));
              updateBatsmanStats("wk");
              updateBall("wk");
              updateBowlingStats("wk");
              setStriker("");
              for (let x of batStats) {
                if (x.name === striker) {
                  x.out = true;
                }
              }
              
            }}
            disabled={disableButton()}
          >
            wk
          </button>
          <button
            className="btn btn-danger btn-small scoreupdate-btn"
            onClick={() => {
              caughtOut();
              updateBowlingStats("c");
              
            }}
            disabled={disableButton()}
          >
            C
          </button>
          <button
            className="btn btn-danger btn-small scoreupdate-btn"
            onClick={() => {
              visibleRunoutOption();
              
            }}
            disabled={disableButton()}
          >
            RO
          </button>
        </div>

        <div className="bye d-flex justify-content-center">
          <div className="form-group">
            <label htmlFor="bye-runs">Bye Runs</label>
            <input
              type="number"
              id="bye-runs"
              className="mx-1"
              name="bye-runs"
              min="1"
            />
            <button
              id="updatebyeruns-btn"
              className="btn btn-success btn-small mx-2"
              onClick={updateByeRuns}
              disabled={disableButton()}
            >
              &#43;
            </button>
          </div>
        </div>
        <div
          className="container my-2"style={{ display: "flex", justifyContent: "center",}}
        >
          <button
            id="scoreboardbtn"
            className="btn"
            onClick={() => {
              showScoreBoard();
            }}
          >
            Scoreboard
          </button>
          <button
            id="scoreboardbtn"
            className="btn mx-2"
            onClick={() => {
              generatePDF();
            }}
          >
            Download Scoreboard
          </button>
        </div>
        <div id="stats" className="container">
          <h1 className="heading">
            {props.team1.toUpperCase()} <i>vs</i> {props.team2.toUpperCase()}
          </h1>
          <div id="runoverinstats" className="runsover">
            <h3>
              {runs}/{wickets < 10 ? wickets : "All Out"} ({over}.{ballCount}/
              {props.overs})
            </h3>
          </div>
          <h1>{battingTeam.toUpperCase()} Batting</h1>
          <table id="battingstats" className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="row">Name</th>
                <th scope="row">Runs</th>
                <th scope="row">Balls</th>
                <th scope="row">4s</th>
                <th scope="row">6s</th>
                <th scope="row">StrikeRate</th>
              </tr>
            </thead>
            <tbody>
              {batStats.map((batstats) => (
                <tr>
                  <td>
                    {batstats.name}&ensp;
                    <span style={{ fontSize: "x-small" }}>
                      {!batstats.out === true ? (
                        "Not Out"
                      ) : (
                        <span style={{ color: "red" }}>Out</span>
                      )}
                    </span>
                  </td>
                  <td>{batstats.batRun}</td>
                  <td>{batstats.ballPlayed}</td>
                  <td>{batstats.fours}</td>
                  <td>{batstats.sixes}</td>
                  <td>
                    {batstats.batRun === 0
                      ? 0
                      : parseInt((batstats.batRun / batstats.ballPlayed) * 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <h1>Bowling</h1>
          <table id="battingstats" className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="row">Name</th>
                <th scope="row">Runs</th>
                <th scope="row">Overs</th>
                {/* <th scope="row">M</th> */}
                <th scope="row">W</th>
                <th scope="row">Economy</th>
              </tr>
            </thead>
            <tbody>
              {bowlStats.map((bowlstats) => (
                <tr>
                  <td>{bowlstats.name}</td>
                  <td>{bowlstats.bowlRun}</td>
                  <td>
                    {bowlstats.overByBowler}.{bowlstats.ballInThisOver}
                  </td>
                  {/* <td>{bowlstats.maiden}</td> */}
                  <td>{bowlstats.bowlerWickets}</td>
                  <td>
                    {bowlstats.ballInThisOver === 0 &&
                    bowlstats.overByBowler === 0
                      ? 0
                      : parseFloat(
                          (bowlstats.bowlRun /
                            (bowlstats.overByBowler * 6 +
                              bowlstats.ballInThisOver)) *
                            6
                        ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CountingPage;
