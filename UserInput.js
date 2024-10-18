class UserInput
{
    constructor()
    {
        this.AddEventListenersLeftClick(); //flag cell
        this.AddEventListenersRightClick();//reveal cell
    }

    AddEventListenersLeftClick()
    {
        const gameBoardContainerElement = document.getElementById("gameTest");          //stores gameboard element as variable
        gameBoardContainerElement.addEventListener("click", function (event)            //note change "click" to "contextmenu"
        {
            const dataElementInTable = event.target.closest("td");
            if(dataElementInTable)
            {
                const rowAttribute = parseInt(dataElementInTable.dataset.rowAttribute);
                const columnAttribute = parseInt(dataElementInTable.dataset.columnAttribute);
            }

        })
    }

    AddEventListenersRightClick()
    {

    }
}