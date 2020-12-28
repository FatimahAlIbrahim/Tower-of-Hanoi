$(document).ready(function(){

    // global variables
    var mode = "3 disks";
    var timer;

    // on click for the game mode selection buttons
    $(".mode").on("click",function(){
        $(".mode").removeClass("selected-mode"); // remove the "selected-node" class from all the buttons with class "mode"
        $(this).addClass("selected-mode"); // add the "selected-mode" to the clicked button
        mode = $(this).text(); // add the clicked button text to the mode variable
    });

    // on click for the play button
    $("#play").on("click",function(){
        var diskNumber = Number(mode[0]); // get the number of disks from the mode variable
        var height = 100 / diskNumber; // calculate the height for the disks

        for (let index = 1; index <= diskNumber; index++) { // for loop for creating the disks
            var width = (100 / diskNumber) * index; // calculate the width for the disk
            $("#box-A").append("<div class='disk"+index+"' style='width: "+width+"%; height: "+height+"%' ></div>"); // append the disk to the first box
        }
        $("#mode-selection").hide(); // hide the mode selection area
        $("#in-game").show(startTimer()); // show the game to the player
    });

    // on click for the player action buttons
    $("#player-moves button").on("click",function(){
        var action = $(this).text(); // get the action that the player selected
        var current = action[5]; // get the starting box id (ex. A)
        var destination = action[10]; // get the destination box id (ex .B)
        var currentTopDisk = $("#box-"+current+" div").first(); // get the top disk from the starting box

        if(currentTopDisk.length == 0){ // check if the starting box is empty or not
            $("#custom-alert").html("<p>There is nothing to move from "+current+"</p>"); // if the starting box is empty, inform the player
            $("#custom-alert").dialog({classes: {"ui-dialog-titlebar": "dialog-title"}}); //open the dialog with "dialog-title" class for the title
        }
        else{
            var destinationTopDisk = $("#box-"+destination+" div").first(); // get the top box from the destination box
            if(destinationTopDisk.length == 0){ // check if the destination box is empty or not
                $("#box-"+current).remove(currentTopDisk); // remove the top disk of the starting box
                $("#box-"+destination).prepend(currentTopDisk); // add the top box from the starting box to be the top of the destination box
                var moves = Number($("#number-of-moves").text()); // get the number of moves the player performed before this one
                $("#number-of-moves").text(++moves); // increase the number of moves by one
                checkVictory(); // call the function to check if the player won
            }
            else{
                if(currentTopDisk.attr("class") < destinationTopDisk.attr("class")){ // check if the top disk from the starting box is smaller than the top disk from the destination box
                    $("#box-"+current).remove(currentTopDisk); // remove the top disk of the starting box
                    $("#box-"+destination).prepend(currentTopDisk); // add the top box from the starting box to be the top of the destination box
                    var moves = Number($("#number-of-moves").text()); // get the number of moves the player performed before this one
                    $("#number-of-moves").text(++moves); // increase the number of moves by one
                    checkVictory(); // call the function to check if the player won
                }
                else{
                    $("#custom-alert").html("<p>You can't move a bigger disk on top of a smaller one</p>"); // remind the player of the rule
                    $("#custom-alert").dialog({classes: {"ui-dialog-titlebar": "dialog-title"}}); //open the dialog with "dialog-title" class for the title
                }
            }  
        }
    });

    // on click for the go back to mode selection button
    $("#back").on("click", function(){
        location.reload(); // rereash the page
    });

    // on click for the restart button
    $("#restart").on("click", function(){
        $("#box-A div").remove(); // empty box A
        $("#box-B div").remove(); // empty box B
        $("#box-C div").remove(); // empty box C
        $("#number-of-moves").text("0"); // return the number of moves back to zero
        $("#minutes").text("0"); // return the minutes bak to zero
        $("#seconds").text("0"); // return the seconds back to zero
        $("#result").text(""); // return the result text to empty string
        $("#player-moves button").attr("disabled", false); // make the buttons enabled
        clearInterval(timer); // stop the timer

        var diskNumber = Number(mode[0]); // get the number of disks from the mode variable
        var height = 100 / diskNumber; // calculate the height for the disks

        for (let index = 1; index <= diskNumber; index++) { // for loop for creating the disks
            var width = (100 / diskNumber) * index; // calculate the width for the disk
            $("#box-A").append("<div class='disk"+index+"' style='width: "+width+"%; height: "+height+"%' ></div>"); // append the disk to the first box
        }
        startTimer(); // start the timer
    });

    // function to check if the player won
    function checkVictory(){
        var boxA = $("#box-A div").first(); // get the top disk of box A
        var boxB = $("#box-B div").first(); // get the top disk of box B
        if(boxA.length == 0 && boxB.length == 0){ // check if both box A and B are empty or not
            if($("#minutes").text() == "0"){ // check the timer to see if it reached 1 minute or not
                var time = $("#seconds").text()+" seconds!";
            }
            else{
                var time =$("#minutes").text()+":"+$("#seconds").text()+" minutes!";
            }
            var moves = $("#number-of-moves").text()+" moves"; // get the number of moves the player performed to win
            $("#result").text("Congratulations!!! You Won with "+moves+" in "+time); // congratulate the player
            $("#player-moves button").attr("disabled", true); // disable the player action buttons bacause the game ended
            clearInterval(timer); // stop the timer
            $("audio")[0].play();
        }
    }

    // function to calculate the duration of the game
    function startTimer(){
        timer = setInterval(function(){ // start the timer and update it every 1 second
            var seconds = Number($("#seconds").text()); // get the seconds that passed
            $("#seconds").text(++seconds); // increase the seconds by 1
           
            if(seconds == 60){ // check if 60 seconds passed, increase the minutes by one and return the seconds to 0
                var minutes = Number($("#minutes").text()); // get the minutes that passed
                $("#minutes").text(++minutes); // increase the minutes by 1
                $("#seconds").text("0"); // return the seconds back to zero
            }
        }, 1000);
    }

});