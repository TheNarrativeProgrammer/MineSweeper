GAME COMPLETE

to make the contents of the cells visible undo the comment //dataElementInTable.textContent = cellObjectInScafoldArray.cellStatusA2_MineVsEmpty; on line 28 of the GameBoardHMTLRender.js file

To change the difficulty, change lines 364 and 365. getRandtomInt(4); with if(chanceOfMine>=2) means mines will appear in roughly 40% of the cells.                        

const chanceOfMine = this.getRandtomInt(4);
                         if(chanceOfMine>=2)