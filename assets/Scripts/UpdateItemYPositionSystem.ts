import GlobalComponent from "./GlobalComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UpdateItemYPositionSystem extends cc.Component {
    itemComponent = null;
    scrollViewComponent = null;

    onLoad(){
        this.itemComponent = this.getComponent("ItemComponent");
        this.scrollViewComponent = GlobalComponent.instance.scrollViewComponent;
    }
    update(){
        let globalPosition = this.getGlobalPosition();
        if(globalPosition.y >= this.scrollViewComponent.topBorder){ // reached top border
            this.node.y -= (this.scrollViewComponent.topBorder - this.scrollViewComponent.bottomSpawn);
            let indexOfHighestContentIndex = this.getIndexOfItemArrayWhereHighestContentIndex();
            this.itemComponent.contentIndex = this.scrollViewComponent.itemArray[indexOfHighestContentIndex].contentIndex + 1;
        }
        else if(globalPosition.y <= this.scrollViewComponent.bottomBorder){ // reached bottom border
            this.node.y += (this.scrollViewComponent.topSpawn - this.scrollViewComponent.bottomBorder);
            let indexOfLowestContentIndex = this.getIndexOfItemArrayWhereLowestContentIndex();
            this.itemComponent.contentIndex = this.scrollViewComponent.itemArray[indexOfLowestContentIndex].contentIndex - 1;
        }
    }
    getGlobalPosition(){
        return GlobalComponent.instance.canvasNode.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
    }
    getIndexOfItemArrayWhereHighestContentIndex(){
        let index = 0;
        for (let i = 0; i < this.scrollViewComponent.itemArray.length; i++){
            if(this.scrollViewComponent.itemArray[i].contentIndex > this.scrollViewComponent.itemArray[index].contentIndex){
                index = i;
            }
        }
        return index;
    }
    getIndexOfItemArrayWhereLowestContentIndex(){
        let index = 0;
        for (let i = 0; i < this.scrollViewComponent.itemArray.length; i++){
            if(this.scrollViewComponent.itemArray[i].contentIndex < this.scrollViewComponent.itemArray[index].contentIndex){
                index = i;
            }
        }
        return index;
    }
}
