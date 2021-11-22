cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: ''
    },

    // use this for initialization
    onLoad: function () {
        console.log("on load called");
        //console.log("data", this.data);
    },

    someFunction(){
        cc.log("function called");
    },

    // called every frame
    update: function (dt) {

    },
});
