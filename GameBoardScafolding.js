import CellInDataElement from "./CellInDataElement.js";
class GameBoardScafolding
{
    constructor(InNumOfRows, InNumofColumns,  inCells)
    {
        //member varialbes
        this.numOfRows = InNumOfRows;
        this.numOfColumns = InNumofColumns;
        this.scafoldingGridArray = this.CreateScafoldingGrid(null);
        this.CellsGridArray = this.CreateScafoldingGrid("instance of Cell");
    }

    CreateScafoldingGrid(inDataToPush = null)
    {
        const scafoldingGridArray = [];                             //varibale holds 2d array of 
                                                                            //rows#[column#, column#], 
                                                                            //rows#[column#, column#]
        for(let row = 0; row < this.numOfRows; row++)               //iterate through row# (outter array)
        {
            let rowArray = [];
            for(let column = 0; column < this.numOfColumns; column++)    //iterate through column# (inner array) 
            {
                if(inDataToPush == "instance of Cell")
                {
                    console.log("render cell")
                    rowArray.push(new CellInDataElement());
                }
                else
                {
                    rowArray.push(inDataToPush);
                }
                                //A)scafoldingGridArray is for HMTL - Inpush = null - Assign "null" value to current column#. Push null column# to row#
                                                            //B)CellsGridArray is for cells - Inpush creates new instance of cell in a column, pushes it to row
            }
            scafoldingGridArray.push(rowArray);                         //once row is filled with proper number of columns, push the row to the ScafoldingGrid
        }
        return scafoldingGridArray;                                     //once all rows are filled, return ScafoldingGridArray to the constructor and assign to member variable.
    }

    LinkCellArrayWithScafoldingArray()
    {
        for(let row = 0; row < this.numOfRows; row++)
        {
            for(let column = 0; column < this.numOfColumns; column++)
            {
                this.scafoldingGridArray[row][column] = this.CellsGridArray[row][column];
            }
        }
    }

 
    
}




export default GameBoardScafolding;