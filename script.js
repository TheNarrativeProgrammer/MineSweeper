


import CellInDataElement from "./CellInDataElement.js";
import Timer from "./Timer.js";
import GameBoardScafolding from "./GameBoardScafolding.js";
import GameBoardHMTLRender from "./GameBoardHMTLRender.js";
import UserInput from "./UserInput.js";

//Variables for objects
let myGameBoardScafolding;
let myGameBoardHTMLRender;
let myTimer;
let myUserInput;



function initializeGame()
{
    //CREATE GRID SACFOLDING & POPULATE WITH CELL OBJECTS
    myGameBoardScafolding = new GameBoardScafolding(10,10); //set variable to board scafolding object, a 2d array with each location not equal to anything (null) on initialization.  
    //create cell objects, a 2d array using same row/column order as scafolding array
    myGameBoardScafolding.LinkCellArrayWithScafoldingArray();   //Populate scafolding array with cell array. Each location in scafolding array is equal to a unidue cell object

    //INITIAL RENDER OF HTML ELEMENTS (table, tr & tr)
    myGameBoardHTMLRender = new GameBoardHMTLRender(myGameBoardScafolding); //set variable to render object. Scafolding holds array used to set up table,td and tr elements, and holds Cells objects in each array location which contain data on game state (hasmine, cleared, numberofAdjacentMines)
    myGameBoardHTMLRender.RenderGameBoardHTMLElements("gameTest");          //Render empty table. Table, td and tr elements created, with Text content and Class dependent on Cell object properies. Text content displays number of adjacent mines. Class determines color based on css.
    //TIMER
    myTimer = new Timer();                                                  //set variable to Timer object. Counts seconds since player clicked start and stops when game ends.
    //USER INPUT
    myUserInput = new UserInput(myGameBoardScafolding, myGameBoardHTMLRender); //set varialbe to UserInput Object. AddsListeners to right click and left click of player, sending td row and column clicked to myGameBoardScafolding to process game status and updates.
    //Re-Render table with Updates
    myGameBoardHTMLRender.RenderGameBoardHTMLElements("gameTest");
}


export function restartGameRestoreSettings() // exported function is called from GBScafolding
{
    myTimer.clearTimerData();
    //Reset Variables for objects
    myGameBoardScafolding=null;
    myGameBoardHTMLRender=null;
    myTimer=null;
    myUserInput=null;
    //REINITIALIZE THE GAME
    initializeGame();
    console.log("restart game called")

}

//INITIALIZE GAME ON FIRST RUN
function addEventList()
    {
        const attcheButtonListnerTimer = document.getElementById("start").addEventListener("click", ()=>{
            initializeGame();
            console.log("event list");
        });

    }

    addEventList();


