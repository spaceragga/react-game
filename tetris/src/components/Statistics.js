import React from "react"

import { StyledSettingHeader } from './styles/StyledSettings';

function Statistics() {

    let allScore = JSON.parse(localStorage.getItem('saveStatistics'));

    if (allScore && allScore.length > 0) {

        allScore.sort((a, b) => (
            (b[0] + b[1] + b[2]) - (a[0] + a[1] + a[2])
        ));
        allScore = allScore.slice(0, 10);

    } else {

        allScore = new Array(10).fill(new Array(3).fill(0));
        localStorage.setItem('saveStatistics', JSON.stringify(allScore));
    }

  return (
    <div style={{ display: "inline-block"}}>
        {allScore.map((item, i) => (
            <StyledSettingHeader key={i}>{i+1}. Score: {
            allScore[i][0]} Rows: {
            allScore[i][1]} Lvl: {
            allScore[i][2]
            }
            </StyledSettingHeader>
      ))}
    </div>
  );
}

export default Statistics;