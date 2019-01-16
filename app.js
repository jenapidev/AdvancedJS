//BUDGET CONTROLLER
var budgetController = (function () {

    //some code

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

    var DOM = UICntrl.getDOMStrings();

    var ctrlAddItem = function () {
        
        //1. get the data on the input
        var input = UICntrl.getInput();
        console.log(input);

        //2. add item to budget controller

        //3. add item to UI

        //4. calculate budget

        //5. display budget on UI
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which === 13 ) {
            ctrlAddItem();
        }
    });


})(budgetController, UIController); 