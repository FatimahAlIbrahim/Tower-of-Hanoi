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
        var action = $(this).text();
        var current = action[5];
        var destination = action[10];
        var currentTopDisk = $("#box-"+current+" div").first();

        if(currentTopDisk.length == 0){
            alert("There is nothing to move from "+current);
        }
        else{
            var destinationTopDisk = $("#box-"+destination+" div").first();
            if(destinationTopDisk.length == 0){
                $("#box-"+current).remove(currentTopDisk);
                $("#box-"+destination).prepend(currentTopDisk);
                var moves = Number($("#number-of-moves").text());
                $("#number-of-moves").text(++moves);
            }
            else{
                if(currentTopDisk.attr("class") < destinationTopDisk.attr("class")){
                $("#box-"+current).remove(currentTopDisk);
                $("#box-"+destination).prepend(currentTopDisk);
                var moves = Number($("#number-of-moves").text());
                $("#number-of-moves").text(++moves);
                }
                else{
                    alert("You can't move a bigger disk on top of a smaller one");
                }
            }  
        }
    });

});