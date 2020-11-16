


/////////////////////////////////////////////////
// Import TF and model

async function load_tf_model() {
    const m = await tf.loadLayersModel('https://pedagogy-ai.github.io/model2js_new/model.json');
    console.log("tf_loading");

    return m;
}

var model;

function tf_loaded(res) {
    console.log("tf_loaded");
    model = res;
}

load_tf_model().then(tf_loaded);


/////////////////////////////////////////////////
// Conversion dictionary

symbol = {
    '+':1,
    '-':-1,
    '*':2,
    '/':-2,
    '=':5
};

// symbol_s = {
//     1:'+',
//     -1:'-',
//     2:'*',
//     -2:'/',
//     5:'='
// };


/////////////////////////////////////////////////
// Fucntions

// Data pre-processing

const LENGTH = 6;
function tokenize(inp, ans) {
    var sol = [];

    for (var k = 0; k < inp.length; k++) {
        var step = inp[k];
        var s = [];

        i = 0;
        j = 1;

        while (i < step.length && j <= step.length){
            if (step.substring(i, j) == 'x') {
                s.push(ans);
                i++;
                j++;
            }
            else if (step.substring(i, j) in symbol) {
                s.push(symbol[step.substring(i, j)]);
                i++;
                j++;
            }
            else {
                while (!isNaN(step[j-1]) && j <= step.length) {
                    j++;
                }
                var num = parseFloat(step.substring(i, j-1));
                s.push(num);
                i = j-1;
            }
        }

        for (var j = s.length; j < LENGTH; j++){
            s.push(0);
        }

        sol.push(s);
    }

    return sol;
}

////////////////////////////////////////////////
// Tensorflow Functions

function tf_predict(inp, ans) {
    var result = [];
    var prob = [];

    for (var i = 1; i < inp.length; i++) {
        var input_sol = tokenize([inp[i-1], inp[i]], ans)
        console.log(input_sol);
        
        var data = tf.tensor([input_sol]);
        
        const prediction = model.predict(data);
        const pred = Array.from(prediction.dataSync());

        console.log(pred);
        console.log("-------");

        if (pred[0] > 0.5) {
            result.push(false);
            prob.push(pred[0]);
        }
        else {
            result.push(true);
            prob.push(pred[1]);
        }
    }

    return ([result, prob]);
}

