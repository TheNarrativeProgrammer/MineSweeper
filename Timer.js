class Timer
{
    constructor()
    {
         this.timerInterval = null;
        this.timeElapsed = 0;
        this.timerDisplay = document.getElementById("timer");
        this.startTime();
        
    }
    

    clearTimerData()
    {
        clearInterval(this.timerInterval);
        console.log("clear timer called");
        this.timeElapsed = 0;
    }
    
    startTime = () =>
    {
        this.clearTimerData();
      
        this.timeElapsed = 0;
        this.timerInterval = setInterval(() => {
            this.timeElapsed++
            this.timerDisplay.textContent = "Time:" + this.timeElapsed;
            console.log("time");
        }, 1000);
    }

    
}

export default Timer;