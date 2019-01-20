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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput: function() {
            return{
                type:  document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
                description:  document.querySelector(DOMStrings.inputDescription).value,
                value:  parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }; 
        },

        addListItem: function(obj, type) {
            var html, newHTML, element;
            //create html string with placeholders tags

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i></button></div> </div> </div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';  
            }
            
            

            //replace the placeholder text with some data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            //insert the html into the DOM
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },


        clearPanel: function() {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

           fieldsArray.forEach( function (current, index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();
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


    var updateBudget = function() {
        //1. calculate budget

        //2. return the budget

        //3. display budget on UI

    }

    var ctrlAddItem = function () {
        var input, newItem;

        //1. get the data on the input
    
        input = UICntrl.getInput();

        //2. add item to budget controller
    
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //3. add item to UI
    
        UICntrl.addListItem(newItem, input.type);
    
        //4. Clear the fields
    
        UICntrl.clearPanel(); 
    
        //5. calculate and display budget

    }


    return {
        init: function() {
            console.log('Aplication has been started sucssesfully');
            setupEventsListeners();
        }
    };

})(budgetController, UIController); 

controller.init();