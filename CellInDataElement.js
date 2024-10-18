// varialbes
const cellStatusAttribute = 
{
    HIDDEN: "hidden",
    HASMINE: "Hasmine",
    Num: "1",
}



class CellInDataElement
{
    
    constructor()
    {
        this.cellStatusAttribute1 = cellStatusAttribute.HIDDEN;
        this.cellStatusAttribute2 = cellStatusAttribute.Num;
        this.surroundingmines = "fore";
    }

    
}



export default CellInDataElement;