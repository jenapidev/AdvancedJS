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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
                data.totals[type] = sum;
        });
    }


    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        deleteItem: function(type, id) {
            var ids, index;
            ids = data.allItems[type].map(function(current) {
                return current;
            }); 

            index = ids.indexOf(id);

            if (index) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            //calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            //calculate the budget: income-expenses
            data.budget = data.totals.inc - data.totals.exp;

            //Calculate the percentage
             data.percentage =((data.totals.exp / data.totals.inc) * 100).toFixed(2);
        },

        getBudget: function() {
            return {
                budget: data.budget,
                inc: data.totals.inc,
                exp: data.totals.exp,
                percentage: data.percentage
            }
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incLabel: '.budget__income--value',
        expLabel: '.budget__expenses--value',
        expPercentage: '.budget__expenses--percentage',
        container: '.container'
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
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i></button></div> </div> </div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">&21%&</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';  
            }
            
            

            //replace the placeholder text with some data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);
            
            //insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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

        displayBudget: function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent ='+ ' + obj.budget;
            document.querySelector(DOMStrings.incLabel).textContent = '+ ' + obj.inc;
            document.querySelector(DOMStrings.expLabel).textContent = '- ' + obj.exp;
            
            var percentage = obj.percentage;

            if (percentage === true) {
                document.querySelector(DOMStrings.expPercentage).textContent = percentage + '%';
            } else {
                document.querySelector(DOMStrings.expPercentage).textContent = '---';
            }
                        
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
    
    }


    var updateBudget = function() {
        //1. calculate budget
        budgetCtrl.calculateBudget();

        //2. return the budget
        var budget = budgetCtrl.getBudget();

        //3. display budget on UI
        UICntrl.displayBudget(budget);

    }

    var ctrlAddItem = function () {
        var input, newItem;

        //1. get the data on the input
    
        input = UICntrl.getInput();


        //Fixing conflicts

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //1. add item to budget controller
    
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //2. add item to UI
        
            UICntrl.addListItem(newItem, input.type);
        
            //3. Clear the fields
        
            UICntrl.clearPanel(); 
        
            //4. calculate and display budget
            updateBudget();
        }

        

    }

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID =   itemID.split('-');
            type = splitID[0];
            ID = splitID[1];

            // 1. delete the item from UI
            UICntrl.deleteListItem(itemID);
            // 2. delet the item from data structure
            budgetCtrl.deleteItem(type, ID);
            // 3. update the total
            updateBudget();
        }


    }

    return {
        init: function() {
            console.log('Aplication has been started sucssesfully');
            UICntrl.displayBudget({
                budget: 0,
                inc: 0,
                exp: 0
            })
            setupEventsListeners();
        }
    };

})(budgetController, UIController); 

controller.init();