//BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }


    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //create a new unique id
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            
            //creating a new id 
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //pushing into our data structure
            data.allItems[type].push(newItem);

            return newItem;
        },
        testing: function() {
            console.log(data);
        }
    }

})();

//UI Controller
var UIController = (function () {
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function() {
            return{
                type:  document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
                description:  document.querySelector(DOMStrings.inputDescription).value,
                value:  document.querySelector(DOMStrings.inputValue).value
            }; 
        },
        getDOMStrings: function() {
            return DOMStrings;
        }
    }

})();

//Global APP Controller
var controller = (function(budgetCtrl, UICntrl) {

    var setupEventsListeners = function() {
        var DOM = UICntrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13 ) {
                ctrlAddItem();
            }
        });
    
    }

    var ctrlAddItem = function () {
        var input, newItem;

        //1. get the data on the input
        input = UICntrl.getInput();

        //2. add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //3. add item to UI

        //4. calculate budget
        
        //5. display budget on UI
    }


    return {
        init: function() {
            console.log('Aplication has been started sucssesfully');
            setupEventsListeners();
        }
    };

})(budgetController, UIController); 

controller.init();