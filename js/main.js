$(document).ready(function(){


    var mode = "3 disks";

    // on click for the game mode selection buttons
    $(".mode").on("click",function(){
        // remove the "selected-node" class from all the buttons with class "mode"
        $(".mode").removeClass("selected-mode");
        // add the "selected-mode" to the clicked button
        $(this).addClass("selected-mode");
        // add the clicked button text to the mode variable
        mode = $(this).text();
    });

    // on click for the play button
    $("#play").on("click",function(){
        // get the number of disks from the mode variable
        var diskNumber = Number(mode[0]);
        // calculate the height for the disks
        var height = 100 / diskNumber;
        // for loop for creating the disks
        for (let index = 1; index <= diskNumber; index++) {
            // calculate the width for the disk
            var width = (100 / diskNumber) * index;
            // append the disk to the first box
            $("#box-A").append("<div class='disk"+index+"' style='width: "+width+"%; height: "+height+"%' ></div>")
        }
        // hide the mode selection area
        $("#mode-selection").hide();
        // show the game to the player
        $("#in-game").show();
    });

    // on click for the player action buttons
    $("#player-moves button").on("click",function(){
        // get the action that the player selected
        var action = $(this).text();
        // get the starting box id (ex. A)
        var current = action[5];
        // get the destination box id (ex .B)
        var destination = action[10];
        // get the top disk from the starting box
        var currentTopDisk = $("#box-"+current+" div").first();

        // check if the starting box is empty or not
        if(currentTopDisk.length == 0){
            // if the starting box is empty, inform the player
            alert("There is nothing to move from "+current);
        }
        else{
            // get the top box from the destination box
            var destinationTopDisk = $("#box-"+destination+" div").first();
            
            // check if the destination box is empty or not
            if(destinationTopDisk.length == 0){
                // remove the top disk of the starting box
                $("#box-"+current).remove(currentTopDisk);
                // add the top box from the starting box to be the top of the destination box
                $("#box-"+destination).prepend(currentTopDisk);
                // get the number of moves the player performed before this one
                var moves = Number($("#number-of-moves").text());
                // increase the number of moves by one
                $("#number-of-moves").text(++moves);
                // call the function to check if the player won
                checkVictory()
            }
            else{
                // check if the top disk from the starting box is smaller than the top disk from the destination box
                if(currentTopDisk.attr("class") < destinationTopDisk.attr("class")){
                    // remove the top disk of the starting box
                    $("#box-"+current).remove(currentTopDisk);
                    // add the top box from the starting box to be the top of the destination box
                    $("#box-"+destination).prepend(currentTopDisk);
                    // get the number of moves the player performed before this one
                    var moves = Number($("#number-of-moves").text());
                    // increase the number of moves by one
                    $("#number-of-moves").text(++moves);
                    // call the function to check if the player won
                    checkVictory()
                }
                else{
                    // remind the player of the rule
                    alert("You can't move a bigger disk on top of a smaller one");
                }
            }  
        }
    });

    // function to check if the player won
    function checkVictory(){
        var boxA = $("#box-A div").first();
        var boxB = $("#box-B div").first();
        if(boxA.length == 0 && boxB.length == 0){
            $("#result").text("Congratulations! You Won!!!");
            $("#player-moves button").attr("disabled", true);
        }
    }

});