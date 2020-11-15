


/////////////////////////////////////////////////
// Import TF and model

//import * as tf from '@tensorflow/tfjs';
const model = tf.loadLayersModel('https://pedagogy-ai.github.io/model_js/model.json');


/////////////////////////////////////////////////
// Conversion dictionary

symbol = {
    '+':1,
    '-':2,
    '*':3,
    '/':4
};

symbol_s = {
    1:'+',
    2:'-',
    3:'*',
    4:'/'
};


/////////////////////////////////////////////////
// Fucntions

// Data pre-processing

function tokenize(inp) {
    var out = [];

    for (var i = 0; i < inp.length; i++) {
        if (inp[i] == ''){
            out[i] = 0;
        }
        else if (isNaN(inp[i])) {
            out[i] = symbol[inp[i]];
        }
        else {
            out[i] = parseFloat(inp[i]);
        }
    }

    return out;
}

const LENGTH = 9
function standardize(inp) {
    var sol = [];

    for (var i = 0; i < inp.length; i++) {
        var step = [];
        
        var line = inp[i];
        var len = line.length;
        var start = 0;
        var end = 0;
        var e = 0;


        while (end < len) {
            //find next index of next sign

            while (!(line[end] in symbol)){
                end = end + 1;
                if (end >= len){
                    break;
                }
            }

            //append the previous number
            step.push(line.substring(start, end));
            if (end >= len){
                break;
            }

            //append spaces to fit in position
            sym = line[end];
            if (sol.length > 0){
                e = step.length + 1;
                while (sym != sol[0][e]) {
                    step.push('')
                    e++;
                }
            }

            //append sign
            step.push(sym);


            start = end + 1;
            end = end + 1;
        }

        for (var j = step.length; j < LENGTH; j++){
            step.push('');
        }

        sol.push(step);
    }

    return (sol);
}


////////////////////////////////////////////////
// Tensorflow Functions

function tf_predict(inp) {
    var sol = Standardize(inp);

    var result = [];

    for (var i = 1; i < sol.length; i++) {
        var input_sol = [tokenize(sol[i-1]), tokenize(sol[i])]
        const prediction = model.predict(input_sol);

        console.log(input_sol);
        console.log(prediction);
    }

}

