import ItemComponent from "./ItemComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrollViewComponent extends cc.Component {
    topSpawn = 225.8;
    topBorder = 276.2;
    bottomSpawn = -177.4;
    bottomBorder = -227.8;
    textHeight = 50.4;

    @property([ItemComponent])
    itemArray = [];

    contentArray = [
        "hello 1",
        "hello 2",
        "hello 3",
        "hello 4",
        "hello 5",
        "hello 6",
        "hello 7",
        "hello 8",
        "hello 9",
        "hello 10",
        "hello 1",
        "hello 2",
        "hello 3",
        "hello 4",
        "hello 5",
        "hello 6",
        "hello 7",
        "hello 8",
        "hello 9",
        "hello 10",
        "hello 1",
        "hello 2",
        "hello 3",
        "hello 4",
        "hello 5",
        "hello 6",
        "hello 7",
        "hello 8",
        "hello 9",
        "hello 10",
        "hello 1",
        "hello 2",
        "hello 3",
        "hello 4",
        "hello 5",
        "hello 6",
        "hello 7",
        "hello 8",
        "hello 9",
        "hello 10",
        "hello 1",
        "hello 2",
        "hello 3",
        "hello 4",
        "hello 5",
        "hello 6",
        "hello 7",
        "hello 8",
        "hello 9",
        "hello 10",
        "hello 1",
        "hello 2",
        "hello 3",
        "hello 4",
        "hello 5",
        "hello 6",
        "hello 7",
        "hello 8",
        "hello 9",
        "hello 10",
        "hello 1",
        "hello 2",
        "hello 3",
        "hello 4",
        "hello 5",
        "hello 6",
        "hello 7",
        "hello 8",
        "hello 9",
        "hello 10",
    ];
}