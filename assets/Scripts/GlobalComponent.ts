import ScrollViewComponent from "./ScrollViewComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GlobalComponent extends cc.Component {
    static instance: GlobalComponent;
    onLoad(){
        if(GlobalComponent.instance == null){
            GlobalComponent.instance = this;
        }else{
            this.destroy();
        }
    }

    @property(cc.Node)
    canvasNode = null;
    @property(ScrollViewComponent)
    scrollViewComponent = null;
}
