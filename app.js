const AppController = (function(){
    // Contain data and function contructor

    const ShapeGenerator = function(id, shape, color, size){
        this.id = id;
        this.shape = shape;
        this.color = color;
        this.size = size;
    };
    //stores shapes
    let data = {
        allShapes:{
            circle: [],
            square: []
        }
    }

    return {
        addShape: function(shape, color, size){
            let newShape, ID;
            // Create new ID
            if(data.allShapes[shape].length > 0){
                ID = data.allShapes[shape][data.allShapes[shape].length - 1].id + 1;
            }else{
                ID = 0;
            }

            // Create new shape based on 'circle' or 'square' 
            if (shape === 'circle'){
                newShape = new ShapeGenerator(ID,shape,color,size);
            }
        }
    }

})();


const UIController = (function(){
    // Contain all DOM strings
    const DOMstrings = {
        shape:'.shape',
        color:'.colors',
        size: '.size',
        squareCol: 'square_col',
        circleCol: 'circle_col'
    }

    const DOMinputs = {
        shapeInput: document.querySelector(DOMstrings.shape),
        colorInput: document.querySelector(DOMstrings.color),
        sizeInput: document.querySelector(DOMstrings.size)
    }

    return {
        getInput: function(){
            return DOMinputs;
        }
    }
})();


const controller = (function(AppCtr,UICtr){
    // contains event handlers
    const setUpEventListeners = function(){

        document.querySelector('button').addEventListener('click', function(){
            console.log('button is working');
        });

            document.addEventListener('keydown',function(e){
                if(e.keyCode === 13 || e.which === 13){
                    console.log('enter is working')
                }
            });
    }

    const ctrlAddShape = function(){
        let input, newShape;
        //1. Get the input data
        input = UICtr.getInput();
        //2. Add the item to the App controller
        newShape = AppCtr.addShape;
        
    }

    return {
        init: function(){
            setUpEventListeners();
        }
    }
})(AppController,UIController);

controller.init();