function displayDate(date) {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${day}/${month+1}/${year}`
}

function getInput(input, key) {
    if (input){
        if (input[key]) {
            return input[key];
        } else return ''
    } else return ''
}

function getError(error, key) {
    if (error) {
        if (error.path[0] === key) {
            return error.message;
        } else return ''
    } else return ''
}


exports.displayDate = displayDate;
exports.getInput = getInput;
exports.getError = getError;
