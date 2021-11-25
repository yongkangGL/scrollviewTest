import * as global from "Global";
cc.Class({
    extends: cc.Component,
    properties: {
        pos: {
            default: null,
            type: cc.Vector2
        },
        nodeIndex: {
            default: -1,
            type: cc.Integer
        },
        displayString: {
            default: "",
            type: cc.String
        },
    },

});