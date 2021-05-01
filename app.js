const getMatches = () => {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            getData(this.responseText)
         
        }
    });

    xhr.open("GET", "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php?upcomingLimit=30&inprogresslimit=5&completedlimit=50");
    xhr.setRequestHeader("x-rapidapi-key", "49835d9c44msh21d22218a4ce348p184696jsnb30ba800d849");
    xhr.setRequestHeader("x-rapidapi-host", "dev132-cricket-live-scores-v1.p.rapidapi.com");

    xhr.send(data);
}

addEventListener('load',e=>{
    getMatches();
})
const getData = (data) => {
    let jsonData = JSON.parse(data);
    console.log(jsonData);
    let matches = jsonData.matchList.matches;
    for (var i = 0; i < matches.length; i++) {
               if (matches[i].status == "LIVE" && matches[i].series.id === 2780) {
            builthtmlLive(matches[i])
        } else if (matches[i].status == "COMPLETED" && matches[i].series.id === 2780) {
            buildHtmlHighlights(matches[i])
        }else if((matches[i].status == "UPCOMING" && matches[i].series.id===2780) && (matches[i].matchSummaryText!=0) ){
    buildtosshtml(matches[i]);
}else if(matches[i].status == "UPCOMING" && matches[i].series.id===2780){
    buildHtmlUpcoming(matches[i]);   
         }
     
     

    }
}

const builthtmlLive = (data) => {
    let liveHtml="";
    let awayTeamBatting="";
    let homeTeamBatting="";
    if(data.awayTeam.isBatting){
        awayTeamBatting=true
    }else if(data.homeTeam.isBatting){
        homeTeamBatting=true;
    }

    if(awayTeamBatting){
        liveHtml=
        `
        <div class="matchno">${data.name}</div>
        <div class="team">${data.awayTeam.shortName}&nbsp;<span>${data.scores.awayScore}(${data.scores.awayOvers})</span>
        <div>${data.homeTeam.shortName}</div>
        <div class="status">${data.matchSummaryText}</div>
        `
    }else if(homeTeamBatting){
        liveHtml=`
        <div class="team">${data.homeTeam.shortName}&nbsp;<span>${data.scores.homeScore}(${data.scores.homeOvers})</span>
        <div>${data.awayTeam.shortName}</div>
        `
    }
   if(data==undefined){
       document.querySelector('.live').innerHTML="No IPL matches are being played right now, <br> check upcoming matches section"
   }else{
       document.querySelector('.live').innerHTML=liveHtml;
   }
}



const buildHtmlHighlights = (data) => {
    let html=`<br>
    <div class="match">
    <div class="matchName">${data.name}</div><br>

<div class="homeScores">
${data.homeTeam.shortName}:- ${data.scores.homeScore}(${data.scores.homeOvers})</div>
<div class="awayScores">${data.awayTeam.shortName} :- ${data.scores.awayScore}(${data.scores.awayOvers})</div>
    <div class="venue">Venue : ${data.venue.name}</div>
    <div class="matchResult">
    ${data.matchSummaryText}</div>
    </div>
    `
        document.querySelector('.completed').innerHTML+=html;
    
    
}

function buildHtmlUpcoming(data){
const startdateTime=new Date(data.startDateTime);
const hours=startdateTime.getHours();
const minutes=startdateTime.getMinutes();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
const day=weekday[startdateTime.getDay()];
const date=startdateTime.getDate();
const month=new Array(12);
month[0]="January"
month[1]="February"
month[2]="March"
month[3]="April"
month[4]="May"
month[5]="June"
month[6]="July"
month[7]="August"
month[8]="September"
month[9]="October"
month[10]="November"
month[11]="December"
const month1=month[startdateTime.getMonth()];
html=`
<div class="upcomingMatchName">
${data.name}

<div class="upcomingTeams">${data.homeTeam.name} <span> V/S </span> ${data.awayTeam.name}</div>
<div class="time">${day},${date}-${month1} ${hours}:${minutes}</div><br>
</div>
`
document.querySelector('.upcoming').innerHTML+=html;
}

const pointsTable = () => {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            buildhtmlPtsTable(this.responseText)
        }
    });

    xhr.open("GET", "https://dev132-cricket-live-scores-v1.p.rapidapi.com/seriesstandings.php?seriesid=2780");
    xhr.setRequestHeader("x-rapidapi-key", "49835d9c44msh21d22218a4ce348p184696jsnb30ba800d849");
    xhr.setRequestHeader("x-rapidapi-host", "dev132-cricket-live-scores-v1.p.rapidapi.com");

    xhr.send(data);
}


function buildhtmlPtsTable(ptsData) {
    const data=JSON.parse(ptsData);
    teamData=data.teams;
    console.log(teamData)
   let html=` <tr class="table">
    <th>Team</th>
    <th>Played</th>
<th>Won</th>
<th>Points</th>
<th>Nrr</th>
<th>Logo</th>
</tr>
<div class="tableData">
<tr>
<td>${teamData[0].shortName}</td>
<td>${teamData[0].played}</td>
<td>${teamData[0].won}</td>
<td>${teamData[0].points}</td>
<td>${teamData[0].netRunRate}</td>
<td><img class="img" src=${teamData[0].logoUrl} alt=""></td>
</tr>
<tr>
<td>${teamData[1].shortName}</td>
<td>${teamData[1].played}</td>
<td>${teamData[1].won}</td>
<td>${teamData[1].points}</td>
<td>${teamData[1].netRunRate}</td>
<td><img class="img" src=${teamData[1].logoUrl} alt=""></td>
</tr>
<tr>
<td>${teamData[2].shortName}</td>
<td>${teamData[2].played}</td>
<td>${teamData[2].won}</td>
<td>${teamData[2].points}</td>
<td>${teamData[2].netRunRate}</td>
<td><img class="img" src=${teamData[2].logoUrl} alt=""></td>
</tr>
<tr>
<td>${teamData[3].shortName}</td>
<td>${teamData[3].played}</td>
<td>${teamData[3].won}</td>
<td>${teamData[3].points}</td>
<td>${teamData[3].netRunRate}</td>
<td><img class="img" src=${teamData[3].logoUrl} alt=""></td>
</tr>
<tr>
<td>${teamData[4].shortName}</td>
<td>${teamData[4].played}</td>
<td>${teamData[4].won}</td>
<td>${teamData[4].points}</td>
<td>${teamData[4].netRunRate}</td>
<td><img class="img" src=${teamData[4].logoUrl} alt=""></td>
</tr>
<tr>
<td>${teamData[5].shortName}</td>
<td>${teamData[5].played}</td>
<td>${teamData[5].won}</td>
<td>${teamData[5].points}</td>
<td>${teamData[5].netRunRate}</td>
<td><img class="img" src=${teamData[5].logoUrl} alt=""></td>
</tr>
<tr>
<td>${teamData[6].shortName}</td>
<td>${teamData[6].played}</td>
<td>${teamData[6].won}</td>
<td>${teamData[6].points}</td>
<td>${teamData[6].netRunRate}</td>
<td><img class="img" src=${teamData[6].logoUrl} alt=""></td>
</tr>

<tr>
<td>${teamData[7].shortName}</td>
<td>${teamData[7].played}</td>
<td>${teamData[7].won}</td>
<td>${teamData[7].points}</td>
<td>${teamData[7].netRunRate}</td>
<td><img class="img" src=${teamData[7].logoUrl} alt=""></td>
</tr>
</div>
`


document.querySelector('.tbl').innerHTML=html;

}

let menu1=document.querySelector('.menu1');
let menu2=document.querySelector('.menu2');


let menu1count=0;
let menu2count=0;
let menu3count=0;
menu1.addEventListener('click',e=>{
    if(menu1count==0){
        document.querySelector('.completed').style.display="flex";
        document.querySelector('.upcoming').style.display="none";
        document.querySelector('.ptsTbl').style.display="none";
        menu1count++;
    }else{
        document.querySelector('.completed').style.display="none";
menu1count=0;
    }
    

})

menu2.addEventListener('click',e=>{
    if(menu2count==0){
        document.querySelector('.completed').style.display="none";
        document.querySelector('.upcoming').style.display="flex";
        document.querySelector('.ptsTbl').style.display="none";
        menu2count++;
    }else{
        document.querySelector('.upcoming').style.display="none";
menu2count=0;
    }
})


function buildtosshtml(data){
    html=`
    <div class="teams">
   ${data.awayTeam.shortName} VS ${data.homeTeam.shortName}
   <div class="toss">${data.matchSummaryText}</div> 
    </div>
    `
document.querySelector('.live').innerHTML=html;
}


let menu3=document.querySelector('.menu3');
menu3.addEventListener('click',e=>{
    if(menu3count==0){
        document.querySelector('.ptsTbl').style.display="flex"
        document.querySelector('.completed').style.display="none";
        document.querySelector('.upcoming').style.display="none";
        menu3count++;
    }else{
        document.querySelector('.ptsTbl').style.display="none";
menu3count=0;
    }
})


pointsTable();