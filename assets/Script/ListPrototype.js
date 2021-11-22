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
            type: cc.Integer
        },
        currentBottomIndex: {
            default: 0,
            type: cc.Integer
        },

        //Arrays
        itemArray: {
            default: [],
            type: ItemScript,
            visible: false
        },
        itemArrayLength: {
            default: 0,
            type: cc.Integer,
            visible: false
        },
    },

    onLoad() {
        this.targetScrollView = this.node.getComponent(cc.ScrollView);
        this.itemArray = [];
        for (var i = 0; i < this.itemsToInit; i++) {
            var newItem = cc.instantiate(this.itemTemplate);
            var newString = "prefab " + i;

            newItem.getComponent(cc.Label).string = newString;
            newItem.parent = this.itemParent;
            newItem.position = cc.v2(newItem.position.x, i * -30);

            var newItemScript = new ItemScript;
            newItemScript.pos = newItem.position;
            newItemScript.nodeIndex = i;
            newItemScript.displayString = newString;
            this.itemArray.push(newItemScript);
        }
        this.currentBottomIndex = this.itemsToInit;
        var self = this;

        this.node.on("scrolling", function () {
            if(self.itemParent.position.y >= self.itemParentDefaultY){
                if (self.targetScrollView.content.y - self.previousPos >= 30) {  //scrolled up, showing content lower in the list
                    self.previousPos = self.targetScrollView.content.y; //for detect scroll next item  
                    self.scrollDOWN();
                    //cc.log("Down");
                }
                else if (self.targetScrollView.content.y - self.previousPos <= -30) {
                    self.previousPos = self.targetScrollView.content.y;
                    self.scrollUP();
                    //cc.log("Up");
                }
            }
        });
        this.previousPos = this.targetScrollView.content.y;
    },

    scrollUP() {
        if (this.currentTopIndex >= 0) {
            this.currentTopIndex--;
            this.currentBottomIndex--;
            var existingBottomIndex = this.currentBottomIndex;
            if (this.currentBottomIndex >= 10) {
                existingBottomIndex = this.currentBottomIndex % 10;
            }
            //reuse existing index
            var existingBottomIndex = this.currentBottomIndex;

            if (this.currentBottomIndex >= 10) {
                existingBottomIndex = this.currentBottomIndex % 10;
            }

            //CALCULATE Y FOR NEW ITEM
            var newItemPos = cc.v2(this.itemParent.children[0].position.x, -(this.itemArray[this.currentTopIndex].nodeIndex * 30));

            //move bottom item to top
            this.itemParent.children[existingBottomIndex].position = newItemPos;

            //change "new" item's string
            var newString = "prefab " + (this.itemArray[this.currentTopIndex].nodeIndex);
            this.itemParent.children[this.itemArray[existingBottomIndex].nodeIndex].getComponent(cc.Label).string = newString;
        }
        //cc.log("showing previous item", this.itemArray[this.currentTopIndex]);
    },

    scrollDOWN() {
        //reuse existing index 
        var existingTopIndex = this.currentTopIndex;
        cc.log(this.currentTopIndex);
        if (this.currentTopIndex >= 10) {
            existingTopIndex = this.currentTopIndex % 10;
        }
        
        //CALCULATE Y FOR NEW ITEM
        var newItemPos = cc.v2(this.itemParent.children[0].position.x, -(this.currentBottomIndex * 30));   
        
        //move top item to bottom
        this.itemParent.children[existingTopIndex].position = newItemPos;
        var newString = "prefab ";
        //update item script of existing node with new values
        var currentItemScript = this.itemParent.children[existingTopIndex].getComponent(ItemScript);

        if(this.currentBottomIndex >= this.itemArray.length){   //if creating new item
            //change "new" item's string
            newString += this.itemArray.length;
            
            //lengthen content height
            this.itemParent.height += 30;

            //add new item script into item array
            var newItemScript = new ItemScript;
            newItemScript.pos = newItemPos;
            newItemScript.nodeIndex = this.currentBottomIndex;
            newItemScript.displayString = newString;
            cc.log(newItemScript);
            this.itemArray.push(newItemScript);
        }
        else{
            newString = this.itemArray[this.currentBottomIndex].displayString;

            currentItemScript.pos = newItemPos;
            currentItemScript.nodeIndex = this.currentBottomIndex;
            currentItemScript.displayString = newString;
        }
        this.itemParent.children[existingTopIndex].getComponent(cc.Label).string = newString;
        
        

        this.currentTopIndex++;
        this.currentBottomIndex++;
        cc.log("showing next item");
    },

    // update(){
    //     if(this.itemArray.length != this.itemArrayLength){
    //         this.itemArrayLength = this.itemArray.length;
    //         cc.log("total items:", this.itemArrayLength);
    //     }
    // }
});