import ItemScript from "ItemScript";
cc.Class({
    extends: cc.Component,

    properties: {
        //Nodes
        itemTemplate: {
            default: null,
            type: cc.Prefab
        },
        itemParent: {
            default: null,
            type: cc.Node
        },
        targetScrollView: {
            default: null,
            type: cc.ScrollView,
            visible: false
        },

        //Values
        itemParentDefaultY: {
            default: 0,
            type: cc.Integer
        },
        itemsToInit: {
            default: 0,
            type: cc.Integer
        },
        previousPos: {
            default: -1,
            type: cc.Integer,
            visible: false
        },
        currentTopIndex: {
            default: 0,
            type: cc.Integer,
            visible: false
        },
        currentBottomIndex: {
            default: 0,
            type: cc.Integer,
            visible: false
        },

        //Arrays
        itemArray: {
            default: [],
            type: ItemScript,
            visible: false
        },
    },

    onLoad() {
        this.targetScrollView = this.node.getComponent(cc.ScrollView);
        this.itemArray = [];

        //create itemArray
        for(var i = 0; i < 50; i++){
            var newItemScript = new ItemScript;
            newItemScript.pos = cc.v2(this.itemTemplate.data.x, i * -30);
            newItemScript.nodeIndex = i;
            newItemScript.displayString = "prefab " + i;
            this.itemArray.push(newItemScript);
        }

        this.itemParent.height = this.itemArray.length * 30;

        for (var i = 0; i < this.itemsToInit; i++) {
            var newItem = cc.instantiate(this.itemTemplate);
            newItem.parent = this.itemParent;
            newItem.getComponent(cc.Label).string = this.itemArray[i].displayString;
            newItem.position = this.itemArray[i].pos;
            this.itemArray[i].nodeIndex = i;
        }
        this.currentBottomIndex = this.itemsToInit - 1;

        var self = this;
        var difference = 0;
        
        var nexts = 0;
        var prevs = 0;
        // this.node.on("scroll-began", function () {
        //     cc.log("");
        // });

        this.node.on("scroll-ended", function () {
            cc.log("nexts", nexts);
            cc.log("prevs", prevs);
            nexts = 0;
            prevs = 0;
        });

        this.node.on("scrolling", function () {
            //cc.log("scroll");
            difference += self.targetScrollView.content.y - self.previousPos;
            self.previousPos = self.targetScrollView.content.y;

            while (difference >= 30) {
                difference -= 30;
                self.scrollDOWN();
                nexts++;
            }
            while (difference <= -30) {
                difference += 30;
                self.scrollUP();
                prevs++;
            }
        });
        cc.log(this.node);

        this.previousPos = this.targetScrollView.content.y;
    },
    
    scrollUP() {
        if (this.currentTopIndex > 0 && this.itemParent.position.y < (this.itemParent.height - this.itemParentDefaultY)) {
            cc.log("prev");
            //update index
            this.currentTopIndex--;

            //reuse existing index
            //var existingTopIndex = this.currentTopIndex % this.itemsToInit;
            var existingBottomIndex = this.currentBottomIndex % this.itemsToInit;
            
            //get position & string from item array, assign to children of itemParent
            this.itemParent.children[existingBottomIndex].position = this.itemArray[this.currentTopIndex].pos;
            this.itemParent.children[this.itemArray[existingBottomIndex].nodeIndex].getComponent(cc.Label).string = this.itemArray[this.currentTopIndex].displayString;
            
            this.currentBottomIndex--;
        }
    },

    scrollDOWN() {
        cc.log("next");
        if (this.currentBottomIndex < this.itemArray.length - 1 && this.itemParent.position.y >= this.itemParentDefaultY) {
            //update index
            this.currentBottomIndex++;

            //reuse existing index
            var existingTopIndex = this.currentTopIndex % this.itemsToInit;
            //var existingBottomIndex = this.currentBottomIndex % this.itemsToInit;
            
            //get position & string from item array, assign to children of itemParent
            this.itemParent.children[existingTopIndex].position = this.itemArray[this.currentBottomIndex].pos;
            this.itemParent.children[existingTopIndex].getComponent(cc.Label).string = this.itemArray[this.currentBottomIndex].displayString;
            
            //update index
            this.currentTopIndex++;
        }
    },
});