


import CellInDataElement from "./CellInDataElement.js";


// const myCellData = new CellInDataElement();

//CREATE GRID SACFOLDING & POPULATE WITH CELL OBJECTS
import GameBoardScafolding from "./GameBoardScafolding.js";
const myGameBoardScafolding = new GameBoardScafolding(10,10); //create board scafolding, a 2d array with each location not equal to anything.  
                                                            //create cell objects, a 2d array using same row/column order as scafolding array
myGameBoardScafolding.LinkCellArrayWithScafoldingArray();   //Populate scafolding array with cell array. Each location in scafolding array is equal to a unidue cell object


//INITIAL RENDER OF HTML ELEMENTS (table, tr & tr)
import GameBoardHMTLRender from "./GameBoardHMTLRender.js";
const myGameBoardHTMLRender = new GameBoardHMTLRender(myGameBoardScafolding);
myGameBoardHTMLRender.RenderGameBoardHTMLElements("gameTest");

//USER INPUT
 import UserInput from "./UserInput.js";
 const myUserInput = new UserInput(myGameBoardScafolding);



const myCellData1 = new CellInDataElement(myGameBoardScafolding);



myGameBoardHTMLRender.UpdateCellAppearance_NumFlagClear(0,0);

myGameBoardHTMLRender.RenderGameBoardHTMLElements("gameTest");


