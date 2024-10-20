import CellInDataElement from "./CellInDataElement.js";
import { restartGameRestoreSettings } from "./script.js";
// import { TimeElapsed } from "./Timer.js";
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
        // this.scafoldTimer;
        
        
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
        //ROW REGION (UPPER AND LOWER)

        if(startingCellObjectInScafoldArray.startingCellRegionRow == "upper")                                                                           //UPPER REGIION - cleared cells start where player clicked and generate UPWARDS toward upper bound. Random generates DOWNWARD
        {
            for(let IteratingFromMiddleUpward = startingCellObjectInScafoldArray.distanceToEdgeRows; IteratingFromMiddleUpward >=0; IteratingFromMiddleUpward--)    //clear all cells until reaching the upper bounds (row 0)- generate UPWARD of starting cell
            {
                const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked - IteratingFromMiddleUpward][InColumnOfTdPlayerClicked];
                adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                console.log("cell status" + adjactentCellObjectInScafoldArray.cellStatusA1_Visibility);
            }

            const maxUpperRange = startingCellObjectInScafoldArray.centerUpperRow+3 - startingCellObjectInScafoldArray.distanceToEdgeRows;
            const RandomIterationToClearUntil = this.getRandtomInt(maxUpperRange);                                                                          //random number provides bound for additional cells to clear beyond the point the player clicked
            
            for(let i = 1; i < RandomIterationToClearUntil; i++)                                                                                            //clear all cells until reaching the bounds of random number - generate  DOWNWARD of starting cell
            {
                const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked + i][InColumnOfTdPlayerClicked];
            adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
            }
        }

            if(startingCellObjectInScafoldArray.startingCellRegionRow == "lower")                                                                          //LOWER REGIION - cleared cells start where player clicked and generate DOWNWARDS toward upper bound. Random generates UPWARD
            {
                for(let IteratingFromMiddleDownward = startingCellObjectInScafoldArray.distanceToEdgeRows; IteratingFromMiddleDownward >=0; IteratingFromMiddleDownward--)    //clear all cells until reaching the lower bounds (row = Total#Row)- generate  DOWNWARD of starting cell
                {
                    const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked + IteratingFromMiddleDownward][InColumnOfTdPlayerClicked];
                    adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                    console.log("cell status" + adjactentCellObjectInScafoldArray.cellStatusA1_Visibility);
                }
                    const maxUpperRange = startingCellObjectInScafoldArray.centerLowerRow+3 - startingCellObjectInScafoldArray.distanceToEdgeRows;
                    const RandomIterationToClearUntil = this.getRandtomInt(maxUpperRange);                                                                          //random number provides bound for additional cells to clear beyond the point the player clicked
                    
                for(let i = 1; i < RandomIterationToClearUntil; i++)                                                                                            //clear all cells until reaching the bounds of random number - generate UPWARD of starting cell
                {
                const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked - i][InColumnOfTdPlayerClicked];
                adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                }
            }

            //COLUMN REGION (LEFT AND RIGHT)

            //LEFT


            if(startingCellObjectInScafoldArray.startingCellRegionColumn == "left")                                                                    //LEFT REGIION - cleared cells start where player clicked and generate LEFTWARD toward left bound . Random generates RIGHTWARD
            {
                for(let IteratingFromMiddleLeftward = startingCellObjectInScafoldArray.distanceToEdgeColumns; IteratingFromMiddleLeftward >=0; IteratingFromMiddleLeftward--)    //clear all cells until reaching the left bounds (column 0)- generate LEFTWARD of starting cell
                {
                    const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked][InColumnOfTdPlayerClicked  - IteratingFromMiddleLeftward];
                    adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                    console.log("cell status column" + adjactentCellObjectInScafoldArray.cellStatusA1_Visibility);
                }

                const maxUpperRange = startingCellObjectInScafoldArray.centerLeftColumn+3 - startingCellObjectInScafoldArray.distanceToEdgeColumns;
                const RandomIterationToClearUntil = this.getRandtomInt(maxUpperRange);                                                                          //random number provides bound for additional cells to clear beyond the point the player clicked
                
                for(let i = 1; i < RandomIterationToClearUntil; i++)                                                                                            //clear all cells until reaching the bounds of random number - generate RIGHTWARD of starting cell
                {
                    console.log("in loop 1");
                    const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked][InColumnOfTdPlayerClicked + i];
                adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                }
                                                                                                                                                //LEFT FILL OUT
                if(startingCellObjectInScafoldArray.startingCellRegionRow == "upper")                                                                               //FILL OUT - LEFT UPPER - makes random assortment of cells cleared making cleared area more square sharped.
                {
                    for(let IteratingFromMiddleLeftward = startingCellObjectInScafoldArray.distanceToEdgeColumns; IteratingFromMiddleLeftward >=0; IteratingFromMiddleLeftward--)    
                    {
                        
                        let columnIteration = InColumnOfTdPlayerClicked  - IteratingFromMiddleLeftward 
                        let columnIterationAtZero = 1;
                        if(InColumnOfTdPlayerClicked==0)                                                                                                            //if player clicks column 0, extend coumns to right by 1
                        {
                            columnIteration = columnIterationAtZero;
                        }
                        if(InColumnOfTdPlayerClicked>=(this.numOfColumns/2)+1)                                                                                                            //if player clicks column closer to center, select random number to see if cells in iteration are cleared
                        {
                            columnIteration = this.getRandtomInt(5);
                        }
                        
                        for(let IteratingFromMiddleUpward = startingCellObjectInScafoldArray.distanceToEdgeRows; IteratingFromMiddleUpward >=0; IteratingFromMiddleUpward--)    //iterate th
                        {
                            
                            const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked - IteratingFromMiddleUpward][columnIteration];
                            adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                            console.log("FILL OUT - left upper");
                            columnIterationAtZero++;
                        }
                    }
                }

                if(startingCellObjectInScafoldArray.startingCellRegionRow == "lower")                                                                          //FILL OUT - LEFT LOWER - makes random assortment of cells cleared making cleared area more square sharped.
                {
                    for(let IteratingFromMiddleLeftward = startingCellObjectInScafoldArray.distanceToEdgeColumns; IteratingFromMiddleLeftward >=0; IteratingFromMiddleLeftward--)    
                    {
                        
                        let columnIteration = InColumnOfTdPlayerClicked  - IteratingFromMiddleLeftward
                        let columnIterationAtZero = 1; 
                        if(InColumnOfTdPlayerClicked==0)                                                                                            //if player clicks column = Total#column, extend coumns to left by 1
                        {
                            columnIteration = columnIterationAtZero;
                        }
                        if(InColumnOfTdPlayerClicked>=(this.numOfColumns/2)+1)                                                                                                            //if player clicks column closer to center, select random number to see if cells in iteration are cleared
                        {
                            columnIteration = this.getRandtomInt(5);
                        }
                        
                        for(let IteratingFromMiddleDownward = startingCellObjectInScafoldArray.distanceToEdgeRows; IteratingFromMiddleDownward >=-1; IteratingFromMiddleDownward--)    //iterate th
                        {
                            const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked + IteratingFromMiddleDownward][columnIteration];
                            adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                            console.log("FILL OUT - left upper");
                            columnIterationAtZero++;
                        }
                    }
                }
            }

            //Right

            if(startingCellObjectInScafoldArray.startingCellRegionColumn == "right")                                                                          //RIGHT REGIION - cleared cells start where player clicked and generate DOWNWARDS toward right bound. Random generates LEFTWARD
            {console.log("in right upper 1")
                for(let IteratingFromMiddleRightward = startingCellObjectInScafoldArray.distanceToEdgeColumns; IteratingFromMiddleRightward >=0; IteratingFromMiddleRightward--)    //clear all cells until reaching the right bounds (column = total#Columns) - generate RIGHTWARD of starting cell
                {
                    const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked][InColumnOfTdPlayerClicked  + IteratingFromMiddleRightward];
                    adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                    console.log("cell status" + adjactentCellObjectInScafoldArray.cellStatusA1_Visibility);
                }
                    const maxUpperRange = startingCellObjectInScafoldArray.centerRightColumn+3 - startingCellObjectInScafoldArray.distanceToEdgeColumns;
                    const RandomIterationToClearUntil = this.getRandtomInt(maxUpperRange);                                                                          //random number provides bound for additional cells to clear beyond the point the player clicked
                    
                for(let i = 1; i < RandomIterationToClearUntil; i++)                                                                                            //clear all cells until reaching the bounds of random number - generate LEFTWARD of starting cell
                {
                    console.log("in loop 2");
                const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked][InColumnOfTdPlayerClicked  - i];
                adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                }

                                                                                                                                                                //RIGHT FILL OUT
                if(startingCellObjectInScafoldArray.startingCellRegionRow == "upper")                                                                               //FILL OUT - RIGHT UPPER - makes random assortment of cells cleared making cleared area more square sharped.
                {
                    for(let IteratingFromMiddleRIGHTward = startingCellObjectInScafoldArray.distanceToEdgeColumns; IteratingFromMiddleRIGHTward >=0; IteratingFromMiddleRIGHTward--)    
                    {
                        
                        let columnIteration = InColumnOfTdPlayerClicked  - IteratingFromMiddleRIGHTward 
                        let columnIterationAtZero = this.numOfColumns-2;
                        if(InColumnOfTdPlayerClicked==this.numOfColumns-1)                                                                                                            //if player clicks column 0, extend coumns to right by 1
                        {
                            console.log("True player clicked corner")
                            columnIteration = columnIterationAtZero;
                        }
                        else if(InColumnOfTdPlayerClicked<=(this.numOfColumns/2)+1)                                                                                                            //if player clicks column closer to center, select random number to see if cells in iteration are cleared
                        {
                            columnIteration =  this.numOfColumns - startingCellObjectInScafoldArray.distanceToEdgeRows - this.getRandtomInt(2);
                        }
                        
                        for(let IteratingFromMiddleUpward = startingCellObjectInScafoldArray.distanceToEdgeRows; IteratingFromMiddleUpward >=0; IteratingFromMiddleUpward--)    //iterate th
                        {
                            
                            const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked - IteratingFromMiddleUpward][columnIteration];
                            adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                            console.log("FILL OUT - RIGHT upper");
                            columnIterationAtZero--;
                        }
                    }
                }

                if(startingCellObjectInScafoldArray.startingCellRegionRow == "lower")                                                                          //FILL OUT - RIGHT LOWER - makes random assortment of cells cleared making cleared area more square sharped.
                {
                    for(let IteratingFromMiddleRIGHTward = startingCellObjectInScafoldArray.distanceToEdgeColumns; IteratingFromMiddleRIGHTward >=0; IteratingFromMiddleRIGHTward--)    
                    {
                        
                        let columnIteration = InColumnOfTdPlayerClicked  - IteratingFromMiddleRIGHTward
                        let columnIterationAtZero = this.numOfColumns-2;
                        let rowIteration =  startingCellObjectInScafoldArray.distanceToEdgeRows;
                        if(InColumnOfTdPlayerClicked==this.numOfColumns-1)                                                                                            //if player clicks column = Total#column, extend coumns to RIGHT by 1
                        {
                            columnIteration = columnIterationAtZero;
                            rowIteration =  startingCellObjectInScafoldArray.distanceToEdgeRows+2;
                            
                        }
                        if(InRowOfTdPlayerClicked==this.numOfRows-1)                                                                                            //if player clicks column = Total#column, extend coumns to RIGHT by 1
                        {
                            columnIteration = columnIterationAtZero;
                            rowIteration =  startingCellObjectInScafoldArray.distanceToEdgeRows+2;
                            
                        }
                        else if(InColumnOfTdPlayerClicked<=(this.numOfColumns/2)+1)                                                                                                            //if player clicks column closer to center, select random number to see if cells in iteration are cleared
                        {
                            columnIteration = this.numOfColumns - startingCellObjectInScafoldArray.distanceToEdgeRows - this.getRandtomInt(3);
                        }
                        
                        for(let IteratingFromMiddleDownward = rowIteration; IteratingFromMiddleDownward >=1; IteratingFromMiddleDownward--)    //iterate th
                        {
                            const adjactentCellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked - IteratingFromMiddleDownward][columnIteration];
                            adjactentCellObjectInScafoldArray.cellStatusA1_Visibility = "cleared";
                            console.log("FILL OUT - RIGHT upper");
                            columnIterationAtZero--;
                        }
                    }
                }

               
            }

        }



        GenerateMines()
        {
            let totalNumOfMines = 0;
            
            for(let row = 0; row < this.numOfRows; row++)
                {
                    
                    for(let column = 0; column < this.numOfColumns; column++)
                    {
                        const CellObjectInScafoldArray = this.scafoldingGridArray[row][column];
                        if(CellObjectInScafoldArray.cellStatusA1_Visibility== "cleared")
                        {
                            continue;

                        }
                        const chanceOfMine = this.getRandtomInt(6);
                         if(chanceOfMine>=4)
                        {
                            CellObjectInScafoldArray.cellStatusA2_MineVsEmpty="hasmine";
                            totalNumOfMines++

                        }
                        else 
                        {
                            CellObjectInScafoldArray.cellStatusA2_MineVsEmpty="empty";
                        }
                        
                    }
                }
                return totalNumOfMines;
        }

        GenerateAdjectMineCount()
        {
            
            for(let row = 0; row < this.numOfRows; row++)
                {
                    for(let column = 0; column < this.numOfColumns; column++)
                    {
                        const CellObjectInScafoldArray = this.scafoldingGridArray[row][column];
                        let neighbourIsCleared = false;
                        let mineCount = 0;

                        //array of neighbouring cells. Current cell in iteration (CellObjectInScafoldArray) is in center. 
                        const neighours = 
                        [
                            [row -1, column -1],             //top left
                            [row -1, column],                //top mid
                            [row -1, column +1],             //top right
                            [row, column -1],                //center left
                            [row, column +1],               //center right
                            [row +1, column -1],             //bottom left
                            [row +1, column],                //bottom mid
                            [row +1, column +1],             //bottom right

                        ];
                       
                        for(const [r,c] of neighours)
                        {
                            if(r>=0 && r < this.numOfRows && c >= 0 && c < this.numOfColumns)                               //check neighbouring cell to see if it's out of bounds. Lower bound of row and column is 0, upper bound of row is numOfRows, and column is numOfColumns
                            {
                                const neighourCellObject = this.scafoldingGridArray[r][c];
                                if(neighourCellObject.cellStatusA1_Visibility == "cleared")                 //check if at least one neighbour is a cleared cell. This changes if the number of mines is shown or hidden
                                {
                                    neighbourIsCleared = true;
                                }
                                else if(neighourCellObject.cellStatusA2_MineVsEmpty == "hasmine")            //checks if neighbour has mine and iterates count up if true.
                                {
                                    mineCount++
                                }

                            }
                        }

                        if(neighbourIsCleared==true && CellObjectInScafoldArray.cellStatusA1_Visibility == "cleared")
                        {
                            CellObjectInScafoldArray.cellStatusA2_AdjacentMines=mineCount;
                            neighbourIsCleared = false;
                        }

                        
                    }
                }
        }

        FlagCell(InRowOfTdPlayerClicked, InColumnOfTdPlayerClicked)
        {

            const CellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked][InColumnOfTdPlayerClicked];
            const cellVisibility = CellObjectInScafoldArray.cellStatusA1_Visibility

            if(cellVisibility=="flagged")
            {
                CellObjectInScafoldArray.cellStatusA1_Visibility = "hidden";
                // console.log("change to hidden");
            }

            if(cellVisibility=="hidden")
                {
                    CellObjectInScafoldArray.cellStatusA1_Visibility = "flagged";
                    // console.log("change to flag");
                }

            if(cellVisibility=="cleared")
                {
                    console.log("can't flagged a cleared cell");
                }
                
            
        }


        RevealCell(InRowOfTdPlayerClicked, InColumnOfTdPlayerClicked)
        {
            const CellObjectInScafoldArray = this.scafoldingGridArray[InRowOfTdPlayerClicked][InColumnOfTdPlayerClicked];
            const cellVisibility = CellObjectInScafoldArray.cellStatusA1_Visibility

            if(cellVisibility=="flagged")
                {
                    console.log("can't clear a flagged cell");
                }
                else if(cellVisibility=="hidden")
                {
                    if(CellObjectInScafoldArray.cellStatusA2_MineVsEmpty == "empty")
                        {
                            CellObjectInScafoldArray.cellStatusA1_Visibility="cleared"
                            return false;
                        }
                        // let elaspedTime = TimeElapsed(this.scafoldTimer);
                        let elaspedTime =0 ;

                        if(CellObjectInScafoldArray.cellStatusA2_MineVsEmpty == "hasmine")
                            {
                                CellObjectInScafoldArray.cellStatusA1_Visibility="revealed"
                                console.log("GAME OVER");
                                return true;
                                
                                
                                //  alert("Game Over");
                            }
                }
        }



        ShowGameOverModal(inMessage)
        {
        const modalElement = document.getElementById("gameOverModal");
        const messageElement = document.getElementById("gameOverMessage");
        const restartButton = document.getElementById("restartButton");

        //Default message is "Game Over". inMessage overrides the default
        messageElement.textContent = "Game over. You Played for " + inMessage;
        modalElement.style.display = "block"; //change visibility of modal to visible

        //RESTART BUTTON
        restartButton.addEventListener("click", (event) => {
            // this.Timer=null;
            modalElement.style.display = "none"; //change visibility of modal to hidden
            console.log("clear timer called");
            restartGameRestoreSettings();

            
            });
        }

        

    }

 
    





export default GameBoardScafolding;