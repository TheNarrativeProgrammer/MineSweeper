class UserInput
{
    constructor(inGameBoardScafolding, inMyGameBoardHTMLRender)
    {
        this.gameBoardScafolding = inGameBoardScafolding;
        this.gameBoardHTMLRender = inMyGameBoardHTMLRender;
        console.log(this.gameBoardScafolding); // Check if it's defined
        console.log("User input created"); // Check if it's defined
        this.AddEventListenersLeftClick(); //flag cell
        this.AddEventListenersRightClick();//reveal cell
        this.countClicks=0;
    }

    AddEventListenersLeftClick()
    {
        let rowAttribute=0;
        let columnAttribute=0;
        const gameBoardContainerElement = document.getElementById("gameTest");          //stores gameboard element as variable
        gameBoardContainerElement.addEventListener("click", (event) =>           //note change "click" to "contextmenu"
        {
            const dataElementInTable = event.target.closest("td");
            if(dataElementInTable)
            {
                rowAttribute = parseInt(dataElementInTable.dataset.rowAttribute);
                columnAttribute = parseInt(dataElementInTable.dataset.columnAttribute);
                console.log(rowAttribute + " & " +columnAttribute);

                if(this.countClicks===0)
                {
                    
                    const startingCellObjectInScafoldArray = this.gameBoardScafolding.FindEdgesAroundClickedCell(rowAttribute,columnAttribute);
                    // console.log("Column edge dist:  " + startingCellObjectInScafoldArray.distanceToEdgeColumns);
                    // console.log("Row edge dist:  " + startingCellObjectInScafoldArray.distanceToEdgeRows);
                    this.gameBoardScafolding.DefineAreaAroundInitalClickAsCleared(startingCellObjectInScafoldArray, rowAttribute, columnAttribute);
                    this.countClicks++;
                    this.gameBoardScafolding.GenerateMines();
                    this.gameBoardScafolding.GenerateAdjectMineCount();

                    this.gameBoardHTMLRender.RenderGameBoardHTMLElements("gameTest"); 
                    
                }

        
            }

        })
    }

    AddEventListenersRightClick()
    {

        const gameBoardContainerElement = document.getElementById("gameTest");          //stores gameboard element as variable
        gameBoardContainerElement.addEventListener("contextmenu", (event) =>           //note change "click" to "contextmenu"
        {
            event.preventDefault();
            const dataElementInTable = event.target.closest("td");
            if(dataElementInTable)
            {
                let rowAttribute = parseInt(dataElementInTable.dataset.rowAttribute);
                let columnAttribute = parseInt(dataElementInTable.dataset.columnAttribute);
                console.log("right click : " + rowAttribute + " & " +columnAttribute);

                if(this.countClicks>0)
                {
                    this.gameBoardScafolding.FlagCell(rowAttribute, columnAttribute);
                    console.log("RIght click called and in if")

                    this.gameBoardHTMLRender.RenderGameBoardHTMLElements("gameTest"); 
                    
                }

        
            }

        })

    }
}

export default UserInput;