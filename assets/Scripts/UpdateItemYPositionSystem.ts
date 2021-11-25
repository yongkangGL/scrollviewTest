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
            this.itemComponent.contentIndex += this.scrollViewComponent.itemArray.length;
        }
        else if(globalPosition.y <= this.scrollViewComponent.bottomBorder){ // reached bottom border
            this.node.y += (this.scrollViewComponent.topSpawn - this.scrollViewComponent.bottomBorder);
            this.itemComponent.contentIndex -= this.scrollViewComponent.itemArray.length;
        }
    }
    getGlobalPosition(){
        return GlobalComponent.instance.canvasNode.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
    }
}
