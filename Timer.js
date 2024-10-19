class Timer
{
    constructor()
    {
         this.timerInterval;
        this.timeElapsed = 0;
        this.timerDisplay = document.getElementById("timer");
        this.addEventList();
        
    }
    

    addEventList()
    {
        const attcheButtonListnerTimer = document.getElementById("start").addEventListener("click", ()=>{
            this.startTime();
            console.log("event list");
        });

    }
    
    startTime = () =>
    {
        this.timerInterval = setInterval(() => {
            this.timeElapsed++
            this.timerDisplay.textContent = "Time:" + this.timeElapsed;
            console.log("time");
        }, 1000);
    }

    
}

export default Timer;