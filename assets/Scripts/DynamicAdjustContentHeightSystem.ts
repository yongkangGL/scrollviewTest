import GlobalComponent from "./GlobalComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DynamicAdjustContentHeightSystem extends cc.Component {
    scrollViewComponent = null;
    actualContentArrayLength = null;

    onLoad(){
        this.scrollViewComponent = GlobalComponent.instance.scrollViewComponent;
    }
    update(){
        if(this.actualContentArrayLength == this.scrollViewComponent.contentArray.length) return;
        this.actualContentArrayLength = this.scrollViewComponent.contentArray.length;
        this.node.height = this.actualContentArrayLength * this.scrollViewComponent.textHeight;
    }
}
