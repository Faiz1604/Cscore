import React from "react";
import "./style/guide.css";
const Guide = () => {
  return (
    <div className="container">
      <div className="container content">
        <h1>Quick Guide</h1>
        <ol className="list-group list-group-flush">
            <li>click on given buttons to update scoreboard</li>
          <li>
            to start counting first select batting team then go for other option
          </li>
          <li>Change striker after every over</li>
          <li>for run out update score as follow</li>
          <ul className="list-group list-group-flush">
            <li>
              click on 0 if batsman running for 1st run <br />
              click 1 if batsman running for 2nd run and so on.
            </li>
            <li>click on RO button then select batsman to update to wicket</li>
          </ul>
          <li>
            click on ScoreBoard to see scoreboard <br />
            you can also hide it again
          </li>
          <li>DownloadScoreboard to download in PDF for further</li>
        </ol>
      </div>
    </div>
  );
};

export default Guide;
