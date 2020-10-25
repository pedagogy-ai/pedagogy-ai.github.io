


/////////////////////////////////////////////////
// HTML Functions

function check_ans() {
    var x = document.getElementById("answer_input").value;
    console.log(x);

    output = html_repeat_input(x);
    console.log(output);
    
    //output
    document.getElementById("output_inp").innerHTML = output[0];
    document.getElementById("output_correct").innerHTML = output[1];
    document.getElementById("final_result").innerHTML = output[2];
}



function html_repeat_input(inp_str) {

    var input = inp_str.split("=");

    if (input[0] == "") {
        // remove first empty element
        input.shift();
    }

    const ANS = 5

    var result_1 = bool_to_output_sting(milestone_1(input, ANS));
    
    var output_1 = display_each_line(input, "= ");
    var output_2 = display_each_line(result_1);
    var output_3 = "The final answer is " + bool_to_output_sting(check_final_answer(input, ANS));

    return [output_1, output_2, output_3];
}



/////////////////////////////////////////////////
// Display functions

function display_each_line(array, prefix = "", sufix = "") {
    // output each line with line break
    var out_string = "";

    for (var i = 0; i < array.length; i++) {
        out_string = out_string + prefix + array[i] + sufix + "<br>";
    }
    
    return out_string;
}



function bool_to_output_sting(inp, true_string = "correct", false_string = "wrong") {
    if (Array.isArray(inp)){
        output = []

        for (var i = 0; i < inp.length; i++) {
            if (inp[i]) {
                output[i] = true_string;
            }
            else {
                output[i] = false_string;
            }
        }

        return output
    }
    else {
        if (inp) {
            return true_string;
        }
        else {
            return false_string;
        }
    }
}


/////////////////////////////////////////////////
// Milestone functions

function check_final_answer(input, ANS) {
    try {
        var inp_ans = parseFloat(input[input.length-1])
    } 
    catch (e) {
        return false;
    }
    
    if (inp_ans == ANS){
        return true;
    }
    else {
        return false;
    }
}



function milestone_1(input, ans) {
    var result = [];

    for (var i = 0; i < input.length; i++) {
        if (string_calculate(input[i]) == ans) {
            result[i] = true;
        }
        else {
            result[i] = false;
        }
    }
    
    return result;
}



/////////////////////////////////////////////////
// Math Functions

function string_calculate(obj) {
    // same as eval
    try{
        return Function('"use strict";return (' + obj + ')')();
    }
    catch (e){
        console.log("Non-numeric input into calculator");
        return 0;
    }
    
}







