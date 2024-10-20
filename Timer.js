class Timer
{
    constructor()
    {
         this.timerInterval = null;
        this.timeElapsed = 0;
        this.timerDisplay = document.getElementById("timer");
        // this.timerIDs = []; // Array to store timer IDs
        this.startTime();
    
    }
    

    clearTimerData()
    {
        clearInterval(this.timerInterval);
        clearInterval(this.timerInterval);
        // this.timerIDs.forEach(timerID => clearInterval(timerID));
        // this.timerIDs = [];// Clear the array
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
        // Store the interval ID
        // this.timerIDs.push(this.timerInterval);  
    }

      getTimeElapsed = () =>
    {
        return this.timeElapsed;
    }

    
}
// export function TimeElapsed (inTimerInstance)
//     {
//         return inTimerInstance.getTimeElapsed();
//     }

export default Timer;