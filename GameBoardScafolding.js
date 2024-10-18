import CellInDataElement from "./CellInDataElement.js";
const region = 
{
    start: "undefined",
    row_Upper: "upper",
    row_Lower: "lower",
    column_Left: "left",
    column_Right: "right",
   
};

class GameBoardScafolding
{
    constructor(InNumOfRows, InNumofColumns)
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

    FindEdgesAroundClickedCell(InRowOfTdPlayerClicked, InColumnOfTdPlayerClicked)
    {
        const startingCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked][InColumnOfTdPlayerClicked];
        const minRow =0;
        const minColumn =0;
        const maxRow = this.numOfRows-1;
        const maxcoumn = this.numOfColumns-1;
        //find middle. Assume game board size is even number and in multiples of 10
        const centerUpperRow = (this.numOfRows/2)-1;
        const centerLowerRow = (this.numOfRows/2);
        const centerLeftColumn = (this.numOfRows/2)-1;
        const centerRightColumn = (this.numOfRows/2);
        //save distance to edge
        let distanceToEdgeRows =0;
        let distanceToEdgeColumns =0;
        //store data in cell object
        startingCellObjectInScafoldArray.centerUpperRow = centerUpperRow;
        startingCellObjectInScafoldArray.centerLowerRow = centerLowerRow;
        startingCellObjectInScafoldArray.centerLeftColumn = centerLeftColumn;
        startingCellObjectInScafoldArray.centerRightColumn = centerRightColumn;
        


        //find closest edge
        if(InRowOfTdPlayerClicked<=centerUpperRow)//row upper region
        {
            startingCellObjectInScafoldArray.startingCellRegionRow = region.row_Upper;
            startingCellObjectInScafoldArray.distanceToEdgeRows = InRowOfTdPlayerClicked;
            // console.log("Row edge dist:  " + startingCellObjectInScafoldArray.distanceToEdgeRows);
            // distanceToEdgeRows = InRowOfTdPlayerClicked;
            // console.log(InRowOfTdPlayerClicked);
            
        }
        if(InRowOfTdPlayerClicked>=centerLowerRow)//row lower region
            {
                startingCellObjectInScafoldArray.startingCellRegionRow = region.row_Lower;
                // console.log(startingCellObjectInScafoldArray.startingCellRegionRow);
                startingCellObjectInScafoldArray.distanceToEdgeRows =  maxRow - InRowOfTdPlayerClicked;
                // distanceToEdgeRows = maxRow - InRowOfTdPlayerClicked;
                // console.log("Row edge dist:  " + startingCellObjectInScafoldArray.distanceToEdgeRows);
            }
         if(InColumnOfTdPlayerClicked<=centerLeftColumn)//column Left region
        {
            startingCellObjectInScafoldArray.startingCellRegionColumn = region.column_Left;
            // console.log(startingCellObjectInScafoldArray.startingCellRegionColumn);
            startingCellObjectInScafoldArray.distanceToEdgeColumns = InColumnOfTdPlayerClicked;
            // distanceToEdgeRows = distanceToEdgeColumns;
            // console.log("Column edge dist:  " + startingCellObjectInScafoldArray.distanceToEdgeColumns);
            
            
        }
        if(InColumnOfTdPlayerClicked>=centerRightColumn)//row Right region
            {
                startingCellObjectInScafoldArray.startingCellRegionColumn = region.column_Right;
                // console.log(startingCellObjectInScafoldArray.startingCellRegionColumn);
                startingCellObjectInScafoldArray.distanceToEdgeColumns =  maxcoumn - InColumnOfTdPlayerClicked;
                // console.log("Column edge dist:  " + startingCellObjectInScafoldArray.distanceToEdgeColumns);
            }

        // console.log("upper " + centerUpperRow);
        // console.log("Lower " + centerLowerRow);
        // console.log("Left " + centerLeftColumn);
        // console.log("Right " + centerRightColumn);

        return startingCellObjectInScafoldArray;

    }

    getRandtomInt(inMax)
    {
        return Math.floor(Math.random()*inMax);
    }

    DefineAreaAroundInitalClickAsCleared(inStartingCellObjectInScafoldArray, InRowOfTdPlayerClicked, InColumnOfTdPlayerClicked)
    {

        const startingCellObjectInScafoldArray = inStartingCellObjectInScafoldArray;

        if(startingCellObjectInScafoldArray.startingCellRegionRow == "upper")                                                                           //UPPER REGIION - cleared cells start where player clicked and generate UPWARDS toward upper bound. Random generates DOWNWARD
        {
            for(let IteratingFromMiddleUpward = startingCellObjectInScafoldArray.distanceToEdgeRows; IteratingFromMiddleUpward >=0; IteratingFromMiddleUpward--)    //clear all cells until reaching the upper bounds - starting cell UPWARD
            {
                const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked - IteratingFromMiddleUpward][InColumnOfTdPlayerClicked];
                adjactentCellObjectInScafoldArray.cellStatusA2_MineVsEmpty = "cleared";
                console.log("cell status" + adjactentCellObjectInScafoldArray.cellStatusA2_MineVsEmpty);
            }

            const maxUpperRange = startingCellObjectInScafoldArray.centerUpperRow+3 - startingCellObjectInScafoldArray.distanceToEdgeRows;
            const RandomIterationToClearUntil = this.getRandtomInt(maxUpperRange);                                                                          //random number provides bound for additional cells to clear beyond the point the player clicked
            
            for(let i = 1; i < RandomIterationToClearUntil; i++)                                                                                            //clear all cells until reaching the upper bounds of random number - starting cell down
            {
                const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked + i][InColumnOfTdPlayerClicked];
            adjactentCellObjectInScafoldArray.cellStatusA2_MineVsEmpty = "cleared";
            }
        }

            if(startingCellObjectInScafoldArray.startingCellRegionRow == "lower")                                                                          //LOWER REGIION - cleared cells start where player clicked and generate DOWNWARDS toward upper bound. Random generates UPWARD
            {
                for(let IteratingFromMiddleDownward = startingCellObjectInScafoldArray.distanceToEdgeRows; IteratingFromMiddleDownward >=0; IteratingFromMiddleDownward--)    //clear all cells until reaching the upper bounds - starting cell DOWNARD
                {
                    const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked + IteratingFromMiddleDownward][InColumnOfTdPlayerClicked];
                    adjactentCellObjectInScafoldArray.cellStatusA2_MineVsEmpty = "cleared";
                    console.log("cell status" + adjactentCellObjectInScafoldArray.cellStatusA2_MineVsEmpty);
                }
                    const maxUpperRange = startingCellObjectInScafoldArray.centerLowerRow+3 - startingCellObjectInScafoldArray.distanceToEdgeRows;
                    const RandomIterationToClearUntil = this.getRandtomInt(maxUpperRange);                                                                          //random number provides bound for additional cells to clear beyond the point the player clicked
                    
                for(let i = 1; i < RandomIterationToClearUntil; i++)                                                                                            //clear all cells until reaching the upper bounds of random number - starting cell UPDWARD
                {
                const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked - i][InColumnOfTdPlayerClicked];
                adjactentCellObjectInScafoldArray.cellStatusA2_MineVsEmpty = "cleared";
                }
            }

        }

    }

 
    





export default GameBoardScafolding;