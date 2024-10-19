class Timer
{
    constructor()
    {
         this.timerInterval;
        this.timeElapsed = 0;
        this.timerDisplay = document.getElementById("timer");
        this.startTime();
        
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