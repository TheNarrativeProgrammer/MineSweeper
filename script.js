import GameBoardScafolding from "./GameBoardScafolding.js";

import GameBoardHMTLRender from "./GameBoardHMTLRender.js";
import CellInDataElement from "./CellInDataElement.js";

const myCellData = new CellInDataElement();
const myGameBoardScafolding = new GameBoardScafolding(3,3,myCellData);
const myGameBoardHTMLRender = new GameBoardHMTLRender(myGameBoardScafolding);
const myCellData1 = new CellInDataElement(myGameBoardScafolding);
myGameBoardScafolding.LinkCellArrayWithScafoldingArray();
myGameBoardHTMLRender.RenderGameBoardHTMLElements("gameTest");

myGameBoardHTMLRender.UpdateCellAppearance_NumFlagClear(0,0);

myGameBoardHTMLRender.RenderGameBoardHTMLElements("gameTest");


