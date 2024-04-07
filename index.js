let doB;
let isDOBOpen = false;
const settingIconEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialEl = document.getElementById("initial");
const afterDOBButtonEl = document.getElementById("afterDOBButton");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const makeTwoDigitNumber=(number)=>{
    return number>9? number : `0${number}`;
};

const toggleDetector =() =>{
    if(isDOBOpen){
        settingContentEl.classList.add("hide");
    }
    else{
        settingContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen
    console.log("Toggle",isDOBOpen);
};
const updateAge = () =>{
    const currentDate = new Date();
    const dateDiff = currentDate - doB;
    
    const year = Math.floor(dateDiff / (1000*60*60*24*365));
    const month = Math.floor((dateDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.4375));
    const days = Math.floor(dateDiff / (1000*60*60*24))%30;
    const hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor(dateDiff / (1000*60))%60;
    const seconds = Math.floor(dateDiff / 1000)%60;
    yearEl.innerHTML = makeTwoDigitNumber(year);
    monthEl.innerHTML = makeTwoDigitNumber(month);
    dayEl.innerHTML = makeTwoDigitNumber(days);
    hourEl.innerHTML = makeTwoDigitNumber(hours);
    minuteEl.innerHTML = makeTwoDigitNumber(minutes);
    secondEl.innerHTML = makeTwoDigitNumber(seconds);
};

const setDobHandler = () => {
    const dateString = dobInputEl.value
    doB = dateString? new Date(dateString) : null;
    const year = localStorage.getItem('year');
    const month = localStorage.getItem('month');
    const date = localStorage.getItem('date');
    if(year && month && date){
        doB= new Date(year,month,date);

    }

    if(doB){
        localStorage.setItem("year",doB.getFullYear());
        localStorage.setItem("month",doB.getMonth());
        localStorage.setItem("days",doB.getDate());
        initialEl.classList.add("hide");
        afterDOBButtonEl.classList.remove("hide");
        setInterval(()=>updateAge(),1000);
    }
    else{
       afterDOBButtonEl.classList.add("hide");
       initialEl.classList.remove("hide");
       
    }
};
setDobHandler();



settingIconEl.addEventListener("click",toggleDetector);
dobButtonEl.addEventListener("click",setDobHandler);