class GameBoardHMTLRender
{ 

    constructor(inGameBoardScafolding)
    {
        this.gameBoardScafolding = inGameBoardScafolding;
        console.log("constructed");
    }

    RenderGameBoardHTMLElements(inGameBoardContainerID) //GameTableWrapper"
    {        
    console.log("render called");                                                               //GET GAME BOARD ELEMENT
        const gameBoardContainerElement = document.getElementById(inGameBoardContainerID);          //stores gameboard element as variable
        gameBoardContainerElement.innerHTML = "";                                                   //resets inner child elements of parent gameBoardContainerElement to blank (can't have class)
                                                                                                //CREATE NEW ELEMENT OF TYPE TABLE 
        const tableElementinGB = document.createElement("table");
        tableElementinGB.classList.add("someBoard");                                                //add class "container_game_table" to table element. Used for lookup and CSS

        for(let row = 0;  row < this.gameBoardScafolding.numOfRows; row++)                          //iterate through row# (outter array)
        {
            const rowElementInTable = document.createElement("tr");                                 //create tr element in table. Store as var

            for(let column = 0; column < this.gameBoardScafolding.numOfColumns; column++)                       //iterate through column# (inner array) 
            {
                const dataElementInTable = document.createElement("td");                                        //create td element in tr. Store as var
                dataElementInTable.id = ((row*100) + column);                                                   //assign unique ID
                const cellObjectInScafoldArray = this.gameBoardScafolding.scafoldingGridArray[row][column];     //store cell object located at current position of scafoldingGridArray as variable
                //dataElementInTable.textContent = cellObjectInScafoldArray.cellStatusA2_MineVsEmpty;
                // dataElementInTable.textContent = cellObjectInScafoldArray.cellStatusAttribute2;

                if(cellObjectInScafoldArray.cellStatusA1_Visibility=="cleared")
                {
                    dataElementInTable.classList.add("cleared");
                    dataElementInTable.textContent = cellObjectInScafoldArray.cellStatusA2_AdjacentMines;
                }

                if(cellObjectInScafoldArray.cellStatusA1_Visibility=="flagged")
                    {
                        dataElementInTable.classList.remove("cleared");
                        dataElementInTable.classList.add("flagged");
                    }
                    
                if(cellObjectInScafoldArray.cellStatusA1_Visibility=="revealed" && cellObjectInScafoldArray.cellStatusA2_MineVsEmpty == "hasmine")
                    {
                        dataElementInTable.classList.add("boom");
                    }

                
                
                //  //if array location has value, attach it to the textContent
                                                            //within the dataElementInTable  <td>textContent</td>. If array loc is null, then make textContent empty ""
                                                            //UpdateCellAppearance_NumFlagClear changes the textContent of the array location. Render updates the HMTL to show change
                dataElementInTable.dataset.rowAttribute = row;                                              //Creates attribute named "rowAttribute" within td element w/ value = row 
                dataElementInTable.dataset.columnAttribute = column;                                        //                         "columnAttribute"                        = column 
                rowElementInTable.appendChild(dataElementInTable);                                          //puts td elemnent within the tr element
                // console.log(this.gameBoardScafolding.scafoldingGridArray[row][column]);
            }
            tableElementinGB.appendChild(rowElementInTable);                                                //puts tr elemnent within the table element
        }
        gameBoardContainerElement.appendChild(tableElementinGB);                                            //puts table elemnent within the GB container element
    }


    

  


   
}



export default GameBoardHMTLRender;