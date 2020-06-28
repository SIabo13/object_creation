const AppController = (function () {
    // Contain data and function contructor

    const ShapeGenerator = function (id, shape, color, size) {
        this.id = id;
        this.shape = shape;
        this.color = color;
        this.size = size;
    };
    //stores shapes
    let data = {
        allShapes: {
            circle: [],
            square: []
        }
    }

    return {
        addShape: function (shape, color, size) {
            let newShape, ID;
            // Create new ID
            if (data.allShapes[shape].length > 0) {
                ID = data.allShapes[shape][data.allShapes[shape].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new shape based on 'circle' or 'square' 
            newShape = new ShapeGenerator(ID, shape, color, size);

            data.allShapes[shape].push(newShape);

            return newShape;
        },

        testing: function () {
            console.log(data);
        }

    }

})();


const UIController = (function () {
    // Contain all DOM strings
    const DOMstrings = {
        shape: '#shape',
        color: '#colors',
        size: '#size',
        squareCol: '#square_col',
        circleCol: '#circle_col',
        
    }



    return {
        getInput: function () {
            return {
                shapeInput: document.querySelector(DOMstrings.shape).value,
                colorInput: document.querySelector(DOMstrings.color).value,
                sizeInput: document.querySelector(DOMstrings.size).value
            }
        },

        addShapeItems: function(shape,obj){
            let html, newHtml,element;
            if(shape === 'square'){
                element = DOMstrings.squareCol;
                html = '<div class="%shape% %color% mt-5 %size%" id="%id%"></div>';
            }else if(shape === 'circle'){
                element = DOMstrings.circleCol;
                html = '<div class="%shape% %color% mt-5 %size%" id="%id%"></div>';
            }
            newHtml = html.replace('%shape%', obj.shape);
            newHtml = newHtml.replace('%color%', obj.color);
            newHtml = newHtml.replace('%size%', obj.size)
            newHtml = newHtml.replace('%id%', obj.id);

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

        }
    }
})();


const controller = (function (AppCtr, UICtr) {
    // contains event handlers
    

    const ctrlAddShape = function () {
        let input, newShape;
        //1. Get the input data
        input = UICtr.getInput();
        //2. Add the item to the App controller
        newShape = AppCtr.addShape(input.shapeInput, input.colorInput, input.sizeInput);
        UICtr.addShapeItems(input.shapeInput,newShape)
        // UIController.addShapeItems(newShape.shape,newShape);
        console.log(newShape)
        

    }

    const setUpEventListeners = function () {

        document.querySelector('button').addEventListener('click', ctrlAddShape);

        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                console.log('enter is working')
                ctrlAddShape();
            }
        });
    }

    return {
        init: function () {
            setUpEventListeners();
        }
    }
})(AppController, UIController);

controller.init();