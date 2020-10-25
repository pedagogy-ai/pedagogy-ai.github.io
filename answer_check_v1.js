

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
    document.getElementById("step_result").innerHTML = output[3];
}



function html_repeat_input(inp_str) {

    var input = inp_str.split("\n");

    input.trim_head_tail();
    input.trim_spaces();
    input.trim_equals();
    input.remove_empty_element();

    while (input[0] == "") {
        // remove leading empty element
        input.shift();
    }
    while (input[input.length-1] == "") {
        // remove leading empty element
        input.pop();
    }

    const ANS = 5

    var result_1 = milestone_1(input, ANS);

    var output_1 = display_each_line(input, "= ");
    var output_2 = display_each_line(bool_to_output_sting(result_1[0]));
    var output_3 = "The final answer is " + bool_to_output_sting(check_final_answer(input, ANS));
    var output_4 = bool_to_output_sting(result_1[1], 
        "All steps are correct",
        "Some steps are wrong"
        );

    return [output_1, output_2, output_3, output_4];
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
    var all_correct = true;

    if (input.length) {
        all_correct = false;
    }

    for (var i = 0; i < input.length; i++) {
        if (string_calculate(input[i]) == ans) {
            result[i] = true;
        }
        else {
            result[i] = false;
            all_correct = false;
        }
    }
    
    return [result, all_correct];
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


/////////////////////////////////////////////////
// Utility Functions

String.prototype.trim_head_tail = function() {
    return String(this).replace(/^\s+|\s+$/g, '');
};

Array.prototype.trim_head_tail = function() {
    for (var i = 0; i < this.length; i++){
        this[i] = this[i].trim_head_tail();
    }
}

String.prototype.trim_spaces = function() {
    return String(this).replace(/ /g, '');
};

Array.prototype.trim_spaces = function() {
    for (var i = 0; i < this.length; i++){
        this[i] = this[i].trim_spaces();
    }
}

String.prototype.trim_equals = function() {
    return String(this).replace(/=/g, '');
};

Array.prototype.trim_equals = function() {
    for (var i = 0; i < this.length; i++){
        this[i] = this[i].trim_equals();
    }
}

Array.prototype.remove_empty_element = function() {
    for (var i = 0; i < this.length; i++){
        if(this[i] == ""){
            this.splice(i,1);
        }
    }
}






