import GlobalComponent from "./GlobalComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DisplayContentItemSystem extends cc.Component {
    itemComponent = null;
    scrollViewComponent = null;
    label = null;

    actualContentIndex = null;

    onLoad(){
        this.itemComponent = this.getComponent("ItemComponent");
        this.scrollViewComponent = GlobalComponent.instance.scrollViewComponent;
        this.label = this.getComponent(cc.Label);
    }
    update(){
        if(this.actualContentIndex == this.itemComponent.contentIndex) return;
        this.actualContentIndex = this.itemComponent.contentIndex;
        if(this.actualContentIndex < 0 || this.actualContentIndex >= this.scrollViewComponent.contentArray.length){
            this.label.string = "";
        }
        else{
            this.label.string = this.scrollViewComponent.contentArray[this.actualContentIndex];
        }
    }
}
