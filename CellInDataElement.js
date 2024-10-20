// varialbes
const cellStatusAttribute = 
{
    a1_Hidden: "hidden",
    a1_Flagged: "flagged",
    a1_Revealed: "revealed",
    a1_Cleared: "cleared",
    a2_HasMine: "hasmine",
    a2_Empty: "empty",
    a2_StartingCleared: "cleared",
    a3_NumSurroundingMines: "",
};





class CellInDataElement
{
    
    constructor()
    {
        this.cellStatusA1_Visibility = "hidden";
        this.cellStatusA2_MineVsEmpty= "empty";
        this.cellStatusA2_AdjacentMines = cellStatusAttribute.a3_NumSurroundingMines;
        this.cellStatusA2_TotalMines = 0;
    }
    
    
}



export default CellInDataElement;