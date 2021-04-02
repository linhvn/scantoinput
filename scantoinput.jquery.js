//
$("#scanInput").keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        e.stopPropagation();

        if ($("#scanInput").val().length >= minChars) {
            userFinishedEntering = true; // incase the user pressed the enter key
            inputComplete();
        }
    }
});

/*
This code will determine when a code has been either entered manually or
entered using a scanner.
It assumes that a code has finished being entered when one of the following
events occurs:
    • The enter key (keycode 13) is input
    • The input has a minumum length of text and loses focus
    • Input stops after being entered very fast (assumed to be a scanner)
*/

var inputStart, inputStop, firstKey, lastKey, timing, userFinishedEntering;
var minChars = 1;

var inputClass = '.sti-input'
var inputHiddenId = '#sti-hidden-id'
var manualBtnClass = '.sti-manual-click'

// handle a key value being entered by either keyboard or scanner
$("body").keypress(function (e) {
    // restart the timer
    if (timing) {
        clearTimeout(timing);
    }
    
    // handle the key event
    if (e.which == 13) {
        // Enter key was entered
        
        // don't submit the form
        e.preventDefault();
        
        // has the user finished entering manually?
        if ($(inputHiddenId).val().length >= minChars){
            userFinishedEntering = true; // incase the user pressed the enter key
            inputComplete();
        }
    }
    else {
        // some other key value was entered

        // could be the last character
        inputStop = performance.now();
        lastKey = e.which;
        
        // don't assume it's finished just yet
        userFinishedEntering = false;
        
        // is this the first character?
        if (!inputStart) {
            firstKey = e.which;
            inputStart = inputStop;
        }

        $(inputHiddenId).val($(inputHiddenId).val() + String.fromCharCode(e.keyCode));
        
        // start the timer again
        timing = setTimeout(inputTimeoutHandler, 500);
    }
});


// Assume that it is from the scanner if it was entered really fast
function isScannerInput() {
    return (((inputStop - inputStart) / $(inputHiddenId).val().length) < 32);
}

// Determine if the user is just typing slowly
function isUserFinishedEntering(){
    return !isScannerInput() && userFinishedEntering;
}

function inputTimeoutHandler(){
    // stop listening for a timer event
    clearTimeout(timing);
    // if the value is being entered manually and hasn't finished being entered
    if (!isUserFinishedEntering() || $(inputClass).val().length < 3) {
        // keep waiting for input
        return;
    }
}

// here we decide what to do now that we know a value has been completely entered
function inputComplete(){
    // if it is scanner, set input value
    if (!isScannerInput()) {
        $(inputClass).val($(inputHiddenId).val())

        if ($(inputClass).val() && $(inputClass).val().length > 0) {
            // click button
            $(manualBtnClass).click();
        }    
    }

    if ($(inputClass).val() && $(inputClass).val().length > 0) {
        // call api
        // callUpdateApi();
    }

    // clean the form
    $(inputHiddenId).val("")
    inputStart = null;
}

$(document).ready(function () {
    var hiddenElement = $("<input>", {id: inputHiddenId.replace('#', ''), "class": "", "type": "hidden"});
    $("body").append(hiddenElement);
});
