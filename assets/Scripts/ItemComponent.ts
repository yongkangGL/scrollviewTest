
const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemComponent extends cc.Component {
    @property
    contentIndex = 0;
}
