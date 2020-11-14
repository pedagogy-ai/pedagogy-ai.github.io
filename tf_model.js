


/////////////////////////////////////////////////
//import TF and model

//import * as tf from '@tensorflow/tfjs';
//const model = await tf.loadLayersModel('https://pedagogy-ai.github.io/model/model_1.json');


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
    var step = [];

    len = inp.length;
    start = 0;
    end = 0;
    e = 0;


    while (end < l) {
        //find next index of next sign

        while (!(id in symbol)){
            end = end + 1;
            if (end >= len){
                break;
            }
        }

        //append the previous number
        step.push(inp.substring(start, end));
        if (end >= len){
            break;
        }

        //append spaces to fit in position
        sym = inp[end];
        if (len(step) > 0){
            
        }

        //append sign
        step.push(sym);


        start = end + 1;
        end = end + 1;
    }

    for (var i = step.length; i < LENGTH; i++){
        step.push('');
    }

    

}



// Tensorflow Functions

//model_input = 1;
//const prediction = model.predict(model_input);




