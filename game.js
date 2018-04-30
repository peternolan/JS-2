// game.js for Perlenspiel 3.2

// The "use strict" directive in the following line is important. Don't alter or remove it!
"use strict";

// The following comment lines are for JSLint/JSHint. Don't alter or remove them!

/*jslint nomen: true, white: true */
/*global PS */


//var db = "followtherule_db";
var db = null;
var circumVec = false;

var C = ( function() {

    //Board Configurations


    let board1 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1,
        1, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1,
        1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

    ];

    let board3 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 2, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 2, 0, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 2, 0, 2, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 2, 0, 2, 0, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 0, 0, 2, 0, 2, 0, 4, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

    ];

    let board4 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 3, 1,
        1, 4, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1,
        1, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 1,
        1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 1,
        1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 1,
        1, 2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    let board5 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 3, 3, 3, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1,
        1, 3, 3, 3, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 4, 1,
        1, 3, 3, 3, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1,
        1, 3, 3, 3, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
        1, 3, 3, 3, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 3, 3, 3, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    let board6 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 3, 0, 0, 0, 5, 0, 0, 0, 0, 3, 3, 3, 3, 3, 1,
        1, 3, 0, 0, 0, 5, 2, 2, 0, 0, 3, 3, 3, 3, 3, 1,
        1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    var level = 0;//Current Level

    var started = false;

    //All levels
    let levels = [board1, board3, board4, board5, board6];

    //Total score that player earns.
    let energyScore = 0;


    //Amount of Attempts Player has left.
    let energyLife = 3;


    const WIDTH = 16; // width of grid
    const HEIGHT = 16; // height of grid

    let colorG = 0;//Color of Vector on creation.

    let musicTrack = 0;//Current note being played on vector creation.
    let musicTrackBounce = 0;
    let origMusic = 0;

    let xglobe = 0;//Current Position of edge of vector
    let yglobe = 0;

    //Coordinates where the bounce begins.
    let xB = 0;
    let yB = 0;

    //Starting coordinates of vector
    let xStart = 0;
    let yStart = 0;

    let xTouch = 0;
    let yTouch = 0;

    // Position where the cursor is lifted up from
    let xLift = 0;
    let yLift = 0;



    const COLOR_FLOOR = PS.COLOR_WHITE; // floor color
    const COLOR_WALL = PS.COLOR_BLACK; // wall color
    const COLOR_DEF = PS.COLOR_GRAY; // def color
    const COLOR_AREA = 0x45FFA8; // Area color
    const COLOR_GOAL = PS.COLOR_YELLOW; // Goal color
    const COLOR_RETICLE = 0xA1A7FF;//Retical color
    const COLOR_BOUNCE = PS.COLOR_BLUE;//bounce bead color.


    //Check to see if the first part of the vector has been cleared.
    let firstDone = false;

    //Check to see if the vector will bounce of a blue bead.
    let bounced = false;

    let beadCount = 0;

    let allDone = true;

    let timer = null; // timer id, null if none

    let musicOST = ["xylo_c5", "xylo_db5", "xylo_d5", "xylo_eb5",
        "xylo_f5", "xylo_gb5", "xylo_g5", "xylo_ab5", "xylo_a5",
        "xylo_bb5", "xylo_b5", "xylo_c6", "xylo_db6", "xylo_d6",
        "xylo_eb6"];


    // The 'exports' object is used to define
    // variables and/or functions that need to be
    // accessible outside this function.
    // So far, it contains only one property,
    // an 'init' function with no parameters.

    var exports = {


        /* This function activates when the player reaches the goal.
         * If the player finishes a level that isn't the final level, the board changes to the next level.
         * If the player was on the last level, than a victory message launches.
         */
        victory : function () {

            PS.statusColor(0x3FF40);
            PS.audioPlay("fx_tada");
            if (level < 4) {
                level++;
                PS.init();
            }
            else {
                level = 0;
                PS.statusColor(PS.COLOR_WHITE);
                PS.statusText("YOU'VE DONE IT! Well Done. Now Go Home.");
                PS.borderFade(PS.ALL, PS.ALL, 15);
                PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_GRAY);
                PS.gridFade(15);
                PS.gridColor(PS.COLOR_GRAY);
                PS.gridPlane(1);
                PS.fade(PS.ALL, PS.ALL, 15);
                PS.color (PS.ALL, PS.ALL, PS.COLOR_GRAY);
                PS.gridPlane(0);
                PS.fade(PS.ALL, PS.ALL, 15);
                PS.color (PS.ALL, PS.ALL, PS.COLOR_GRAY);

            }

        },


        /* This function clears out the beads that were created from the bounce.
         * direction: the direction the beads were originally traveling before the bounce.
         * x: original x position of starting bead
         * y: original y position of starting bead
         */
        bounceEnd : function (x, y, direction){

            xglobe = xB;//reset xglobe
            yglobe = yB;//reset yglobe

            bounced = false;//reset bounced so that bounce can occur again.


            if (!timer) {

                //Beads from this point will travel in the opposite direction from "direction" i.e., if direction is
                //East, this function will go West


                //East
                if (direction === "East") {

                    timer = PS.timerStart(15, C.endMove, xglobe, yglobe, 1, 0, direction);
                }
                //SouthEast
                else if (direction === "SouthEast") {

                    timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 1, -1, direction);
                }
                //South
                else if (direction === "South") {

                    timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 0, -1, direction);
                }
                //SouthWest
                else if (direction === "SouthWest") {

                    timer = PS.timerStart(25, C.endMove, xglobe, yglobe, -1, -1, direction);
                }
                //West
                else if (direction === "West") {
                    timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 1, 0, direction);
                }
                //NorthWest
                else if (direction === "NorthWest") {

                    timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 1, -1, direction);
                }
                //North
                else if (direction === "North") {

                    timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 0, 1, direction);
                }
                //NorthEast
                else if (direction === "NorthEast") {

                    timer = PS.timerStart(25, C.endMove, xglobe, yglobe, -1, 1, direction);
                }

            }

        },


        //Function that erases vector. Is put through a timer in "end"
        //x: original x position of starting point
        //y: original y position of starting point
        //h, v: horiz and verticle direction that the vector is moving in each cycle.
        endMove : function (x, y, h, v, dir) {

            xglobe += h; // update grabber's x-pos
            yglobe += v; // update grabber's y-pos
            //Check the color of the next bead. If not a special bead, move on. If it is special, stop.


            if (PS.color(xglobe, yglobe) === COLOR_WALL) {
                PS.timerStop(timer);
                firstDone = true;
                timer = null;

                //If there was a bounce and the first vector has been removed, activate bounceEnd.
                if (bounced === true && firstDone === true) {
                    PS.gridPlane(1);
                    C.bounceEnd(x, y, dir);
                    started = false;


                }
                else {
                    PS.gridPlane(0);
                    firstDone = false;
                    started = false;
                }

            }

            else if (PS.color(xglobe, yglobe) === COLOR_DEF) {

                PS.color(xglobe, yglobe, COLOR_FLOOR);
                PS.timerStop(timer);
                firstDone = true;
                timer = null;

                if (bounced === true && firstDone === true) {
                    PS.audioPlay("fx_blast4");
                    PS.gridPlane(1);
                    C.bounceEnd(x, y, dir);
                    started = false;

                }
                else {
                    PS.audioPlay("fx_blast4");
                    PS.gridPlane(0);
                    firstDone = false;
                    started = false;
                }

            }

            else if (PS.color(xglobe, yglobe) === COLOR_GOAL) {

                PS.color(xglobe, yglobe, COLOR_FLOOR);
                PS.timerStop(timer);
                firstDone = true;
                timer = null;


                if (bounced === true && firstDone === true) {

                    PS.gridPlane(1);
                    C.bounceEnd(x, y, dir);
                    started = false;

                }
                else {
                    C.victory();
                    PS.gridPlane(0);
                    firstDone = false;
                    started = false;
                }

            }


            else if (PS.color(xglobe, yglobe) === COLOR_AREA) {

                PS.audioPlay(musicOST[musicTrack]);
                PS.color(xglobe, yglobe, COLOR_AREA);
                PS.timerStop(timer);
                firstDone = true;
                timer = null;

                if (bounced === true && firstDone === true) {
                    PS.audioPlay(musicOST[musicTrackBounce]);
                    PS.gridPlane(1);
                    C.bounceEnd(x, y, dir);
                    started = false;

                }
                else {
                    PS.audioPlay(musicOST[musicTrack]);
                    PS.gridPlane(0);
                    firstDone = false;
                    started = false;
                }

            }

            else if (PS.color(xglobe, yglobe) === COLOR_BOUNCE) {

                PS.color(xglobe, yglobe, COLOR_BOUNCE);
                PS.timerStop(timer);
                firstDone = true;
                timer = null;

                if (bounced === true && firstDone === true) {
                    PS.audioPlay(musicOST[musicTrackBounce]);
                    PS.gridPlane(1);
                    C.bounceEnd(x, y, dir);

                }
                else {
                    PS.audioPlay(musicOST[musicTrack]);
                    PS.gridPlane(0);
                    firstDone = false;
                }

            }
            else {

                if (bounced === false && firstDone === true) {

                    PS.audioPlay(musicOST[musicTrackBounce]);
                    musicTrackBounce--;

                }
                else {

                    PS.audioPlay(musicOST[musicTrack]);
                    musicTrack--;
                    beadCount--;

                }
                PS.alpha( xglobe, yglobe, PS.ALPHA_TRANSPARENT );
            }



        },


        //Function that erases vector. Is put through a timer in "end"
        //x: original x position of starting point
        //y: original y position of starting point
        end : function (x, y, dir) {


            if (firstDone === false) {
                xglobe = xStart;
                yglobe = yStart;
            }
            else {
                xglobe = x;
                yglobe = y;
            }

            PS.audioPlay(musicOST[musicTrack]);
            musicTrack--;
            PS.alpha( xglobe, yglobe, PS.ALPHA_TRANSPARENT );

            if (!timer) {

                if (firstDone === false) {


                    //East
                    if (xglobe < xLift && yglobe === yLift) {

                        timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 1, 0, dir);
                    }
                    //SouthEast
                    else if (xglobe < xLift && yglobe < yLift) {

                        timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 1, 1, dir);
                    }
                    //South
                    else if (xglobe === xLift && yglobe < yLift) {

                        timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 0, 1, dir);
                    }
                    //SouthWest
                    else if (xglobe > xLift && yglobe < yLift) {

                        timer = PS.timerStart(25, C.endMove, xglobe, yglobe, -1, 1, dir);
                    }
                    //West
                    else if (xglobe > xLift && yglobe === yLift) {
                        timer = PS.timerStart(25, C.endMove, xglobe, yglobe, -1, 0, dir);
                    }
                    //NorthWest
                    else if (xglobe > xLift && yglobe > yLift) {

                        timer = PS.timerStart(25, C.endMove, xglobe, yglobe, -1, -1, dir);
                    }
                    //North
                    else if (xglobe === xLift && yglobe > yLift) {

                        timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 0, -1, dir);
                    }
                    //NorthEast
                    else if (xglobe < xLift && yglobe > yLift) {

                        timer = PS.timerStart(25, C.endMove, xglobe, yglobe, 1, -1, dir);
                    }

                }

            }

            allDone = true;

        },



        //This function activates the bounce on colliding with a blue bead.

        bounce : function (direction){

            bounced = true;

            xB = xglobe;
            yB = yglobe;


            if (!timer) {

                //West
                if (direction === "West") {
                    timer = PS.timerStart(25, C.move, xB, yB, -1, 0, "West");
                }
                //NorthEast
                else if (direction === "NorthEast") {
                    timer = PS.timerStart(25, C.move, xB, yB, 1, -1, "NorthWest");
                }
                //North
                else if (direction === "North") {
                    timer = PS.timerStart(25, C.move, xB, yB, 0, -1, "North");
                }
                //NorthWest
                else if (direction === "NorthWest") {
                    timer = PS.timerStart(25, C.move, xB, yB, 1, -1, "NorthWest");
                }
                //East
                else if (direction === "East") {
                    timer = PS.timerStart(25, C.move, xB, yB, 1, 0, "East");
                }
                //SouthWest
                else if (direction === "SouthWest") {
                    timer = PS.timerStart(25, C.move, xB, yB, 1, 1, "SouthWest");
                }
                //South
                else if (direction === "South") {
                    timer = PS.timerStart(25, C.move, xB, yB, 0, 1, "South");
                }
                //SouthEast
                else if (direction === "SouthEast") {
                    timer = PS.timerStart(25, C.move, xB, yB, 1, -1, "SouthEast");
                }

                musicTrackBounce = 0;
                musicTrack++;

            }

        },


        //Function that erases vector. Is put through a timer in "end"
        //x: original x position of starting point
        //y: original y position of starting point
        //h, v: horiz and verticle direction that the vector is moving in each cycle.
        move : function ( x, y, h, v, dir) {

            xglobe += h; // update grabber's x-pos
            yglobe += v; // update grabber's y-pos



            if (PS.color(xglobe, yglobe) === COLOR_WALL) {
                PS.timerStop(timer);

                PS.audioPlay("fx_bucket");

                timer = null;
                C.end(x, y, dir);

            }
            else if (PS.color(xglobe, yglobe) === COLOR_DEF) {
                PS.timerStop(timer);

                PS.audioPlay("fx_shoot7");

                timer = null;
                C.end(x, y, dir);

            }
            else if (PS.color(xglobe, yglobe) === COLOR_GOAL) {
                PS.timerStop(timer);

                timer = null;
                C.end(x, y, dir);


            }
            else if (PS.color(xglobe, yglobe) === COLOR_BOUNCE) {
                PS.timerStop(timer);
                PS.audioPlay("fx_jump3");
                origMusic = musicTrack;
                timer = null;
                xglobe -= h;
                yglobe -= v;
                C.bounce(dir);

            }
            else {

                if (bounced === true) {
                    PS.audioPlay(musicOST[musicTrackBounce]);
                    musicTrackBounce++;
                }
                else {
                    PS.audioPlay(musicOST[musicTrack]);
                    musicTrack++;
                }
                PS.color(xglobe, yglobe, colorG);
                PS.alpha( xglobe, yglobe, PS.ALPHA_OPAQUE );
                beadCount++;
            }

        },



        //Function that begins the vector. Is put through a timer
        //x: original x position of starting point
        //y: original y position of starting point
        start : function (x, y) {

            xLift = x;
            yLift = y;

            C.firstClickEnd(xglobe, yglobe);
            PS.gridPlane(1);

            started = true;
            allDone = false;

            if (!timer) {

                //West
                if (xglobe < x && yglobe === y) {

                    timer = PS.timerStart(25, C.move, xglobe, yglobe, 1, 0, "West");
                }
                //SouthEast
                else if (xglobe < x && yglobe < y) {

                    timer = PS.timerStart(25, C.move, xglobe, yglobe, 1, 1, "SouthEast");
                }
                //North
                else if (xglobe === x && yglobe < y) {

                    timer = PS.timerStart(25, C.move, xglobe, yglobe, 0, 1, "South");
                }
                //SouthWest
                else if (xglobe > x && yglobe < y) {

                    timer = PS.timerStart(25, C.move, xglobe, yglobe, -1, 1, "NorthWest");
                }
                //East
                else if (xglobe > x && yglobe === y) {

                    timer = PS.timerStart(25, C.move, xglobe, yglobe, -1, 0,"East");
                }
                //NorthWest
                else if (xglobe > x && yglobe > y) {

                    timer = PS.timerStart(25, C.move, xglobe, yglobe, -1, -1, "NorthWest");
                }
                //North
                else if (xglobe === x && yglobe > y) {

                    timer = PS.timerStart(25, C.move, xglobe, yglobe, 0, -1, "North");
                }
                //NorthEast
                else if (xglobe < x && yglobe > y) {

                    timer = PS.timerStart(25, C.move, xglobe, yglobe, 1, -1, "NorthEast");
                }
                else {
                    energyLife++;
                }

                musicTrack = 0;
                musicTrack++;

                PS.audioPlay( "fx_ding" );

            }

        },


        //Function that erases the red aim line.
        //x: original x position of the red bead
        //y: original x position of the red bead
        //v: verticle change of the red bead line.
        //h: horizontal change of the red bead line.
        aimLineGone : function (x, y, v, h) {

            if( x < 16 && x > 0 && y < 16 && y > 0 ) {
                x += v;
                y += h;


                PS.alpha(x, y, PS.ALPHA_TRANSPARENT);
            }


        },

        //Function that erases the red aim line.
        //x: original x position of the red bead
        //y: original x position of the red bead

        aimLineDestroy : function (x, y) {

            if( x < 16 && x > 0 && y < 16 && y > 0 ) {

                //East
                if (xglobe < x && yglobe === y) {
                    C.aimLineGone(xglobe + 1, yglobe, 1, 0);
                }
                //SouthEast
                else if (xglobe < x && yglobe < y) {
                    C.aimLineGone(xglobe + 1, yglobe + 1, 1, 1);
                }
                //South
                else if (xglobe === x && yglobe < y) {
                    C.aimLineGone(xglobe, yglobe + 1, 0, 1);
                }
                //SouthWest
                else if (xglobe > x && yglobe < y) {
                    C.aimLineGone(xglobe - 1, yglobe + 1, -1, 1);
                }
                //West
                else if (xglobe > x && yglobe === y) {
                    C.aimLineGone(xglobe - 1, yglobe, -1, 0);
                }
                //NorthWest
                else if (xglobe > x && yglobe > y) {
                    C.aimLineGone(xglobe - 1, yglobe - 1, -1, -1);
                }
                //North
                else if (xglobe === x && yglobe > y) {
                    C.aimLineGone(xglobe, yglobe - 1, 0, -1);
                }
                //NorthEast
                else if (xglobe < x && yglobe > y) {
                    C.aimLineGone(xglobe + 1, yglobe - 1, 1, -1);
                }
            }

        },

        //Function that Creates the red aim line.
        //x: original x position of the red bead
        //y: original x position of the red bead
        //v: verticle change of the red bead line.
        //h: horizontal change of the red bead line.
        aimLine : function (x, y, h, v) {

            x += h;
            y += v;

            PS.color(x, y, PS.COLOR_RED);
            PS.alpha(x, y, PS.ALPHA_OPAQUE);



        },


        //Function that Creates the red aim line.
        //x: original x position of the red bead
        //y: original x position of the red bead

        aimLineSetup :function (x, y) {

            if( x < 16 && x > 0 && y < 16 && y > 0 ) {
                if (xglobe < x && yglobe === y) {
                    C.aimLine(xglobe + 1, yglobe, 1, 0);
                }
                //NorthEast
                else if (xglobe < x && yglobe < y) {
                    C.aimLine(xglobe + 1, yglobe + 1, 1, 1);
                }
                //North
                else if (xglobe === x && yglobe < y) {
                    C.aimLine(xglobe, yglobe + 1, 0, 1);
                }
                //NorthWest
                else if (xglobe > x && yglobe < y) {
                    C.aimLine(xglobe - 1, yglobe + 1, -1, 1);
                }
                //West
                else if (xglobe > x && yglobe === y) {
                    C.aimLine(xglobe - 1, yglobe, -1, 0);
                }
                //SouthWest
                else if (xglobe > x && yglobe > y) {
                    C.aimLine(xglobe - 1, yglobe - 1, -1, -1);
                }
                //South
                else if (xglobe === x && yglobe > y) {
                    C.aimLine(xglobe, yglobe - 1, 0, -1);
                }
                //SouthEast
                else if (xglobe < x && yglobe > y) {
                    C.aimLine(xglobe + 1, yglobe - 1, 1, -1);
                }
            }

        },


        //Function that creates the retical for the player to use.
        //x: Original x position of the starting point where the player clicked.
        //y: Original y position of the starting point where the player clicked.
        firstClickSetup : function (x, y) {

            xglobe = x;
            yglobe = y;

            PS.gridPlane(2);


            PS.color( x+1, y, COLOR_RETICLE);
            PS.alpha( x+1, y, PS.ALPHA_OPAQUE );
            PS.color( x, y+1, COLOR_RETICLE );
            PS.alpha( x, y+1, PS.ALPHA_OPAQUE );
            PS.color( x+1, y+1, COLOR_RETICLE );
            PS.alpha( x+1, y+1, PS.ALPHA_OPAQUE );
            PS.color( x-1, y-1, COLOR_RETICLE );
            PS.alpha( x-1, y-1, PS.ALPHA_OPAQUE );
            PS.color( x-1, y, COLOR_RETICLE );
            PS.alpha( x-1, y, PS.ALPHA_OPAQUE );
            PS.color( x, y-1, COLOR_RETICLE );
            PS.alpha( x, y-1, PS.ALPHA_OPAQUE );
            PS.color( x+1, y-1, COLOR_RETICLE );
            PS.alpha( x+1, y-1, PS.ALPHA_OPAQUE );
            PS.color( x-1, y+1, COLOR_RETICLE );
            PS.alpha( x-1, y+1, PS.ALPHA_OPAQUE );


        },

        //Function that gets rid of the reticle.
        firstClickEnd : function (x, y) {


            PS.alpha( x+1, y, PS.ALPHA_TRANSPARENT );
            PS.alpha( x, y+1, PS.ALPHA_TRANSPARENT );
            PS.alpha( x+1, y+1, PS.ALPHA_TRANSPARENT );
            PS.alpha( x-1, y-1, PS.ALPHA_TRANSPARENT );
            PS.alpha( x-1, y, PS.ALPHA_TRANSPARENT );
            PS.alpha( x, y-1, PS.ALPHA_TRANSPARENT );
            PS.alpha( x+1, y-1, PS.ALPHA_TRANSPARENT );
            PS.alpha( x-1, y+1, PS.ALPHA_TRANSPARENT );


        },


        //Gets color presets.
        //desiredColor: name of the preset.
        getPreset : function( desiredColor ) {

            if (desiredColor === "COLOR_FLOOR") {
                return COLOR_FLOOR;
            }
            else if (desiredColor === "COLOR_AREA") {
                return COLOR_AREA;
            }
            else if (desiredColor === "COLOR_GOAL") {
                return COLOR_GOAL;
            }
            else if (desiredColor === "COLOR_DEF") {
                return COLOR_DEF;
            }
            else if (desiredColor === "COLOR_RETICLE") {
                return COLOR_RETICLE;
            }
            else if (desiredColor === "COLOR_WALL") {
                return COLOR_WALL;
            }

        },


        //Reduces energy for each touch.
        energyLifeManip : function () {
            if (energyLife > 0) {
                energyLife--;
                energyScore++;
                return true;
            }
            else return false;

        },

        //Sends the energy function.
        energyLifePrint : function () {

            return energyLife;

        },

        energyScorePrint : function () {

            return energyScore;

        },


        //Sets the global color variable to establish the color of the vector
        colorSet : function (colorVar) {

            colorG = colorVar;

        },


        setStartingPoint : function (x, y) {

            xStart = x;
            yStart = y;


        },

        getStarted : function () {

            return started;

        },


        getTimer : function () {

            return timer;

        },

        getAllDone : function () {
            return allDone;
        },


        getXTouch : function () {
            return xTouch;
        },

        getYTouch : function () {
            return yTouch;
        },

        setXTouch : function (xNew) {
            xTouch = xNew;
        },

        setYTouch : function (yNew) {
            yTouch = yNew;
        },


        // C.init()
        // Initializes the game
        //Initializes Game
        init : function () {


            PS.gridSize( WIDTH, HEIGHT ); // init grid
            PS.border( PS.ALL, PS.ALL, 1 ); // no borders

            energyLife = 5;

            PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_BLACK);


            var selectedBoard = levels[level];

            for ( var x = 0; x < 16; x += 1 ) {
                for ( var y = 0; y < 16; y += 1 ) {
                    if ( selectedBoard[(y*16) + x] === 1) {
                        PS.gridPlane(1);
                        PS.color( x, y, COLOR_WALL );
                        PS.alpha( x, y, PS.ALPHA_OPAQUE );
                        PS.gridPlane(0);
                    }
                    else if ( selectedBoard[(y*16) + x] === 2) {
                        PS.gridPlane(1);
                        PS.color( x, y, COLOR_DEF );
                        PS.alpha( x, y, PS.ALPHA_OPAQUE );
                        PS.gridPlane(0);
                    }
                    else if ( selectedBoard[(y*16) + x] === 3) {
                        PS.color( x, y, COLOR_AREA );
                    }
                    else if ( selectedBoard[(y*16) + x] === 4) {
                        PS.gridPlane(1);
                        PS.color( x, y, COLOR_GOAL );
                        PS.alpha( x, y, PS.ALPHA_OPAQUE );
                        PS.gridPlane(0);
                    }
                    else if ( selectedBoard[(y*16) + x] === 5) {
                        PS.gridPlane(1);
                        PS.color( x, y, COLOR_BOUNCE );
                        PS.alpha( x, y, PS.ALPHA_OPAQUE );
                        PS.gridPlane(0);
                    }
                    else {
                        PS.color( x, y, COLOR_FLOOR );
                    }
                }
            }

            PS.audioLoad( "xylo_c5" ); //1
            PS.audioLoad( "xylo_db5" ); //2
            PS.audioLoad( "xylo_d5" ); //3
            PS.audioLoad( "xylo_eb5" ); //4
            PS.audioLoad( "xylo_e5" ); //5
            PS.audioLoad( "xylo_f5" ); //6
            PS.audioLoad( "xylo_gb5" ); //7
            PS.audioLoad( "xylo_g5" ); //8
            PS.audioLoad( "xylo_ab5" ); //9
            PS.audioLoad( "xylo_a5" ); //10
            PS.audioLoad( "xylo_bb5" ); //11
            PS.audioLoad( "xylo_b5" ); //12
            PS.audioLoad( "xylo_c6" ); //13
            PS.audioLoad( "xylo_db6" ); //14
            PS.audioLoad( "xylo_d6" ); //15
            PS.audioLoad( "fx_shoot7" );
            PS.audioLoad( "fx_bucket" );
            PS.audioLoad( "fx_jump3" );
            PS.audioLoad( "fx_squawk" ); //Duck Squak on failure
            PS.audioLoad( "fx_tada" ); //WIN!!!


        }
    };

    // Return the 'exports' object as the value
    // of this function, thereby assigning it
    // to the global G variable. This makes
    // its properties visible to Perlenspiel.

    return exports;


} () );

var G = (function() {


    var board1 = [

        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];


    var level = 0;//Current Level
    var levelBad = 0;

    const COLOR_WALL = PS.COLOR_BLACK; // wall color
    const WIDTH = 16;
    const HEIGHT = 16;

    var count = 0;
    var timer = null;

    let prevX = 0;
    let prevY = 0;

    var badArr;

    var change = false;

    var prevChoice;

    var firstRound = true;

    var inGrid = false;

    var finalize = function () {
        ////////////////
    };



    var exports = {


        victory : function (decision) {

            firstRound = false;

            if (decision === "GOOD") {

                if (level < 4) {
                    PS.statusColor(0x3FF40);
                    if (timer !== null) {
                        PS.timerStop(timer);
                    }

                    var compliment = PS.random(5);

                    if (prevChoice === "BAD") {
                        level = 0;
                        levelBad++;
                    }
                    else {
                        levelBad = 0;
                        level++;
                    }


                    if ( db && PS.dbValid( db ) ) {
                        PS.dbEvent( db, "Good Choice", "GOOD" );
                    }


                    switch (compliment) {
                        case 1:
                            PS.statusText("You are Exemplary. Press Red Again.");
                            PS.audioPlay("fx_coin6");
                            PS.init();
                            break;
                        case 2:
                            PS.statusText("You are Wonderful. Press Red Again.");
                            PS.audioPlay("fx_coin6");
                            PS.init();
                            break;
                        case 3:
                            PS.statusText("You are Amazing. Press Red Again.");
                            PS.audioPlay("fx_coin6");
                            PS.init();
                            break;
                        case 4:
                            PS.statusText("You are Magnificent. Press Red Again.");
                            PS.audioPlay("fx_coin6");
                            PS.init();
                            break;
                        case 5:
                            PS.statusText("You are Sublime. Press Red Again.");
                            PS.audioPlay("fx_coin6");
                            PS.init();
                            break;
                    }


                }
                else {

                    if (timer !== null) {
                        PS.timerStop(timer);
                    }

                    PS.statusColor(PS.COLOR_BLACK);
                    PS.statusText("You followed the rules! Here's your reward!");
                    if ( db && PS.dbValid( db ) ) {
                        PS.dbEvent( db, "endgame", true );
                        PS.dbSend( db, "bmoriarty", { discard : true } );
                        db = null;
                    }

                    circumVec = true;
                    PS.init = C.init;
                    PS.init();

                    PS.audioPlay("fx_tada");
                }
            }
            else if (decision === "BAD") {

                if (levelBad < 8) {
                    if (timer !== null) {

                        PS.timerStop(timer);
                    }

                    if (prevChoice === "GOOD") {
                        levelBad = 0;
                        level = 0;
                    } else {
                        level = 0;
                        levelBad++;
                    }


                    if ( db && PS.dbValid( db ) ) {
                        PS.dbEvent( db, "Bad Choice", "BAD" );
                    }

                    var anger = PS.random(5);

                    if (levelBad !== 6) {
                        switch (anger) {
                            case 1:
                                PS.statusText("NO THE RED PRESS THE RED");
                                PS.audioPlay("l_piano_eb1");
                                PS.init();
                                break;
                            case 2:
                                PS.statusText("YOU NEED TO PRESS THE RED");
                                PS.audioPlay("l_piano_eb1");
                                PS.init();
                                break;
                            case 3:
                                PS.statusText("WHAT ARE YOU DOING PRESS THE RED");
                                PS.audioPlay("l_piano_eb1");
                                PS.init();
                                break;
                            case 4:
                                PS.statusText("RED RED RED PRESS THE RED");
                                PS.audioPlay("l_piano_eb1");
                                PS.init();
                                break;
                            case 5:
                                PS.statusText("STOP THAT JUST PRESS THE RED");
                                PS.audioPlay("l_piano_eb1");
                                PS.init();
                                break;
                        }
                    }
                    else {
                        PS.init();
                        PS.audioPlay("l_piano_eb1");
                    }

                }
                else {
                    levelBad++;
                    if (timer !== null) {
                        PS.timerStop(timer);
                    }
                    PS.statusColor(PS.COLOR_WHITE);
                    PS.statusText("why");
                    PS.borderFade(PS.ALL, PS.ALL, 15);
                    PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_BLACK);
                    PS.gridFade(15);
                    PS.gridColor(PS.COLOR_BLACK);
                    PS.gridPlane(1);
                    PS.fade(PS.ALL, PS.ALL, 15);
                    PS.color (PS.ALL, PS.ALL, PS.COLOR_BLACK);
                    PS.gridPlane(0);
                    PS.fade(PS.ALL, PS.ALL, 15);
                    PS.color (PS.ALL, PS.ALL, PS.COLOR_BLACK);

                    PS.audioPlay("fx_silencer");

                    if ( db && PS.dbValid( db ) ) {
                        PS.dbEvent( db, "endgame", true );
                        PS.dbSend( db, "bmoriarty", { discard : true } );
                        db = null;
                    }
                }
            }

        },

        randomPlace : function (x, y) {

            count -= 1;

            if ( count === 1 ) { // reached zero?

                PS.color(x, y, PS.COLOR_YELLOW);
            }
            else if (count < 1){

                PS.timerStop( timer );
                timer = null; // allows restart

            }

        },

        randomPlaceBad2 : function (x, y) {

            count -= 1;

            if ( count === 1 ) { // reached zero?

                PS.color(x, y, PS.COLOR_YELLOW);
            }
            else if (count < 1){

                PS.timerStop( timer );
                timer = null; // allows restart

            }

        },

        randomPlaceBad3 : function (x, y) {

            PS.statusText("Fine. Click the Yellow Bead.");
            count -= 1;

            if ( count === 1 ) { // reached zero?

                PS.color(x, y, PS.COLOR_RED);
            }
            else if (count < 1){

                PS.timerStop( timer );
                timer = null; // allows restart
            }


        },


        randomPlaceBad4 : function () {

            count -= 1;
            switch (count) {
                case 5:
                    PS.color(5, 5, PS.COLOR_RED);
                    PS.color(8, 3, PS.COLOR_YELLOW);
                    G.setLoc(8, 3);
                    break;
                case 4:
                    PS.color(8, 3, PS.COLOR_RED);
                    PS.color(11, 5, PS.COLOR_YELLOW);
                    G.setLoc(11, 5);
                    break;
                case 3:
                    PS.color(11, 5, PS.COLOR_RED);
                    PS.color(11, 9, PS.COLOR_YELLOW);
                    G.setLoc(11, 9);
                    break;
                case 2:
                    PS.color(11, 9, PS.COLOR_RED);
                    PS.color(8, 11, PS.COLOR_YELLOW);
                    G.setLoc(8, 11);
                    break;
                case 1:
                    PS.color(8, 11, PS.COLOR_RED);
                    PS.color(5, 9, PS.COLOR_YELLOW);
                    G.setLoc(5, 9);
                    break;
                case 0:
                    PS.color(5, 9, PS.COLOR_RED);
                    PS.color(5, 5, PS.COLOR_YELLOW);
                    G.setLoc(5, 5);
                    count = 6;
                    break;

            }

        },


        randomPlaceBad5 : function (x, y) {
            count -= 1;
            if ( count === 1 ) { // reached zero?
                change = true;
                for (var i = 0; i < WIDTH; i += 1) {
                    for (var j = 0; j < HEIGHT; j += 1) {
                        if (board1[(j * HEIGHT) + i] === 1) {
                            PS.gridPlane(1);
                            PS.alpha(i, j, PS.ALPHA_TRANSPARENT);
                            PS.gridPlane(0);
                            PS.color(i, j, PS.COLOR_YELLOW);

                        }
                    }
                }

            }
            else if (count < 1){
                PS.timerStop( timer );
                timer = null; // allows restart

            }

        },

        randomPlaceBad6 : function (x, y) {

            count -= 1;

            if ( count === 0 ) { // reached zero?
                G.victory("BAD");
            }

            if ( count === 3 ) { // reached zero?
                PS.statusText("AAAAAAAAAAAHHHHHHHHHHHHHH");
            }

            else if (count === 7) {
                // Set glyph to numeral
                PS.statusText("Can't...Hold...");
            }

            else if (count === 11) {
                // Set glyph to numeral
                PS.statusText("PRESS RED DAMN YOU");
            }
            else if (count === 15) {
                // Set glyph to numeral
                PS.statusText("Just Press Red!");
            }


        },



        randomPlaceBad7 : function (x, y) {

            count -= 1;
            switch (count) {
                case 12:
                    PS.color(6, 2, PS.COLOR_RED);
                    PS.color(4, 4, PS.COLOR_YELLOW);
                    G.setLoc(4, 4);
                    break;
                case 11:
                    PS.color(4, 4, PS.COLOR_RED);
                    PS.color(4, 6, PS.COLOR_YELLOW);
                    G.setLoc(4, 6);
                    break;
                case 10:
                    PS.color(4, 6, PS.COLOR_RED);
                    PS.color(4, 8, PS.COLOR_YELLOW);
                    G.setLoc(4, 8);
                    break;
                case 9:
                    PS.color(4, 8, PS.COLOR_RED);
                    PS.color(4, 10, PS.COLOR_YELLOW);
                    G.setLoc(4, 10);
                    break;

                case 8:
                    PS.color(4, 10, PS.COLOR_RED);
                    PS.color(6, 12, PS.COLOR_YELLOW);
                    G.setLoc(6, 12);
                    break;
                case 7:
                    PS.color(6, 12, PS.COLOR_RED);
                    PS.color(8, 12, PS.COLOR_YELLOW);
                    G.setLoc(8, 12);
                    break;
                case 6:
                    PS.color(8, 12, PS.COLOR_RED);
                    PS.color(10, 10, PS.COLOR_YELLOW);
                    G.setLoc(10, 10);
                    break;
                case 5:
                    PS.color(10, 10, PS.COLOR_RED);
                    PS.color(10, 8, PS.COLOR_YELLOW);
                    G.setLoc(10, 8);
                    break;
                case 4:
                    PS.color(10, 8, PS.COLOR_RED);
                    PS.color(10, 6, PS.COLOR_YELLOW);
                    G.setLoc(10, 6);
                    break;
                case 3:
                    PS.color(10, 6, PS.COLOR_RED);
                    PS.color(10, 4, PS.COLOR_YELLOW);
                    G.setLoc(10, 4);
                    break;
                case 2:
                    PS.color(10, 4, PS.COLOR_RED);
                    PS.color(8, 2, PS.COLOR_YELLOW);
                    G.setLoc(8, 2);
                    break;
                case 1:
                    PS.color(8, 2, PS.COLOR_RED);
                    PS.color(6, 2, PS.COLOR_YELLOW);
                    G.setLoc(6, 2);
                    count = 13;
                    break;

            }

        },

        randomPlaceBad8 : function (x, y) {

            count -= 1;


            if ( count === 1 ) { // reached zero?

                PS.color(x, y, PS.COLOR_WHITE);
            }

        },

        randomPlaceBad9 : function (x, y) {


            PS.color(x, y, PS.COLOR_YELLOW);


        },

        randomPlaceGood : function (x, y, redx, redy) {

            count -= 1;

            //PS.debug("redx " + redx + " redy " + redy + "\n");
            //PS.debug("prevx " + prevX + " prevy " + prevY + "\n");

            if (prevX === 0 && prevY === 0) {

                prevX = redx;
                prevY = redy;


            }
            else {

                PS.color(prevX, prevY, PS.COLOR_WHITE);
                PS.border(prevX, prevY, 1);
                PS.borderColor(prevX, prevY, PS.COLOR_GRAY);

                var rands3 = G.randGet();
                PS.border(rands3[0], rands3[1], 2);
                PS.borderColor(rands3[0], rands3[1], PS.COLOR_BLUE);
                PS.color(rands3[0], rands3[1], PS.COLOR_RED);

                prevX = rands3[0];
                prevY = rands3[1];

                if (count === 1) { // reached zero?

                    PS.color(x, y, PS.COLOR_YELLOW);

                }


            }



        },


        start : function (x, y, redx, redy) {

            prevX = 0;
            prevY = 0;


            if ( !timer ) { // null if not running
                if (levelBad === 0 && level === 0) {
                    count = 4; // reset count
                    timer = PS.timerStart(60, G.randomPlace, x, y);
                }
                if (levelBad === 0 && level > 0) {

                    var time = 200;

                    var newtime = (time / level) + 10;

                    count = 3;
                    timer = PS.timerStart(newtime, G.randomPlaceGood, x, y, redx, redy)


                }
                else if (levelBad === 1) {
                    count = 3;
                    PS.color(PS.ALL, PS.ALL, PS.COLOR_RED);
                    timer = PS.timerStart(60, G.randomPlaceBad2, x, y);
                }
                else if (levelBad === 2) {
                    count = 3;
                    PS.color(PS.ALL, PS.ALL, PS.COLOR_YELLOW);
                    timer = PS.timerStart(60, G.randomPlaceBad3, x, y);
                }
                else if (levelBad === 3) {
                    count = 6;
                    PS.color(8, 3, PS.COLOR_RED);
                    PS.color(11, 5, PS.COLOR_RED);
                    PS.color(11, 9, PS.COLOR_RED);
                    PS.color(8, 11, PS.COLOR_RED);
                    PS.color(5, 9, PS.COLOR_RED);
                    PS.color(5, 5, PS.COLOR_RED);
                    timer = PS.timerStart(35, G.randomPlaceBad4);
                }
                else if (levelBad === 4) {
                    count = 6;
                    PS.color(x, y, PS.COLOR_YELLOW);
                    timer = PS.timerStart(60, G.randomPlaceBad5, x, y);
                }
                else if (levelBad === 5) {
                    count = 17;

                    timer = PS.timerStart(60, G.randomPlaceBad6, x, y);
                }

                else if (levelBad === 6) {
                    count = 14;
                    PS.color(6, 2, PS.COLOR_RED);
                    PS.color(4, 4, PS.COLOR_RED);
                    PS.color(4, 6, PS.COLOR_RED);
                    PS.color(4, 8, PS.COLOR_RED);
                    PS.color(4, 10, PS.COLOR_RED);
                    PS.color(6, 12, PS.COLOR_RED);
                    PS.color(8, 12, PS.COLOR_RED);
                    PS.color(10, 10, PS.COLOR_RED);
                    PS.color(10, 8, PS.COLOR_RED);
                    PS.color(10, 6, PS.COLOR_RED);
                    PS.color(10, 4, PS.COLOR_RED);
                    PS.color(8, 2, PS.COLOR_RED);

                    timer = PS.timerStart(15, G.randomPlaceBad7);
                }

                else if (levelBad === 7) {
                    count = 3;

                    timer = PS.timerStart(60, G.randomPlaceBad8, x, y);
                }

                else if (levelBad === 8) {

                    G.randomPlaceBad9(8, 6)

                }

            }

        },

        randGet : function () {

            let xRand = PS.random(13) + 1;
            let yRand = PS.random(13) + 1;

            let randArr = [xRand, yRand];

            return randArr;
        },

        setLoc : function(x, y) {

            badArr = [x, y];

        },

        getLoc : function() {

            return badArr;

        },

        getLevelBad : function() {
            return levelBad;
        },

        getChange : function() {
            return change;
        },

        setChange : function(newChange) {
            change = newChange;
        },


        setPrevChoice : function (thePrevChoice) {
            prevChoice = thePrevChoice;
        },



        init : function () {
            PS.gridSize(WIDTH, HEIGHT);

            timer = null; // timer id, null if none


            var rands = G.randGet();

            var selectedBoard = board1;


            for (var x = 0; x < WIDTH; x += 1) {
                for (var y = 0; y < HEIGHT; y += 1) {
                    if (selectedBoard[(y * HEIGHT) + x] === 1) {
                        PS.gridPlane(1);
                        PS.color(x, y, COLOR_WALL);
                        PS.alpha(x, y, PS.ALPHA_OPAQUE);
                        PS.border(x, y, PS.COLOR_BLACK);
                        PS.gridPlane(0);
                    }
                }
            }


            if (level === 0 && levelBad === 0) {

                PS.statusText("Welcome. Select the Red Bead.");


                PS.border(8, 7, 2);
                PS.borderColor(8, 7, PS.COLOR_BLUE);
                PS.color(8, 7, PS.COLOR_RED);

                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);

            }

            if (level > 0) {
                var rands2 = G.randGet();
                PS.border(rands[0], rands[1], 2);
                PS.borderColor(rands[0], rands[1], PS.COLOR_BLUE);
                PS.color(rands[0], rands[1], PS.COLOR_RED);
                G.start(rands2[0], rands2[1], rands[0], rands[1]);
                G.setLoc(rands2[0], rands2[1]);

            }

            if (levelBad === 1) {

                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);

            }
            if (levelBad === 2) {

                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);

            }

            if (levelBad === 3) {

                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);


            }

            if (levelBad === 4) {

                PS.color(PS.ALL, PS.ALL, PS.COLOR_RED);
                G.start(rands[0], rands[1]);

            }

            if (levelBad === 5) {

                PS.statusColor(PS.COLOR_WHITE);
                PS.statusText("Press Red.");
                PS.borderFade(PS.ALL, PS.ALL, 15);
                PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_RED);
                PS.gridFade(15);
                PS.gridColor(PS.COLOR_RED);
                PS.gridPlane(1);
                PS.fade(PS.ALL, PS.ALL, 15);
                PS.color(PS.ALL, PS.ALL, PS.COLOR_RED);
                PS.gridPlane(0);
                PS.fade(PS.ALL, PS.ALL, 15);
                PS.color(PS.ALL, PS.ALL, PS.COLOR_RED);
                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);
            }

            if (levelBad === 6) {

                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);

            }

            if (levelBad === 7) {

                for (var i = 0; i < WIDTH; i += 1) {
                    for (var j = 0; j < HEIGHT; j += 1) {
                        if (selectedBoard[(j * HEIGHT) + i] === 1) {
                            PS.gridPlane(1);
                            PS.color(i, j, COLOR_WALL);
                            PS.alpha(i, j, PS.ALPHA_OPAQUE);
                            PS.border(i, j, PS.COLOR_BLACK);
                            PS.gridPlane(0);
                        }
                        else {
                            var r, g, b;
                            r = PS.random(255); // random red 0-255
                            g = PS.random(255); // random green
                            b = PS.random(255); // random blue
                            PS.color(i, j, r, g, b);

                        }
                    }
                }

                PS.statusText("ju^%$#t pre$$ @ny c010r. p1e@$e.");

                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);

            }
            if (levelBad === 8) {

                PS.statusColor(PS.COLOR_BLACK);
                PS.statusText("red");
                PS.borderFade(PS.ALL, PS.ALL, 15);
                PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_BLACK);
                PS.gridFade(15);
                PS.gridColor(PS.COLOR_RED);
                PS.gridPlane(1);
                PS.fade(PS.ALL, PS.ALL, 15);
                PS.color(PS.ALL, PS.ALL, PS.COLOR_BLACK);
                PS.gridPlane(0);
                PS.fade(PS.ALL, PS.ALL, 15);
                PS.color(PS.ALL, PS.ALL, PS.COLOR_BLACK);
                PS.color(8,7,PS.COLOR_RED);

                G.start(8, 6);
                G.setLoc(8, 6);


            }

            PS.audioLoad( "fx_bucket" );
            PS.audioLoad( "fx_squawk" ); //Duck Squak on failure
            PS.audioLoad( "fx_tada" ); //WIN!!!
            PS.audioLoad( "fx_coin6");

            if (firstRound) {
                if (db) {
                    db = PS.dbInit(db, {login: finalize});
                    if (db === PS.ERROR) {
                        db = null;
                    }
                }
                else {
                    finalize();
                }
            }

        }

    };

    return exports;

} () );


PS.init = G.init;



/*
PS.touch ( x, y, data, options )
Called when the mouse button is clicked on a bead, or when a bead is touched.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value assigned to this bead by a call to PS.data(); default = 0.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.touch() event handler:



PS.touch = function ( x, y, data, options ) {


    if (!circumVec) {

        let badLocation = G.getLoc();

        let level = G.getLevelBad();



        if (level === 2) {
            if (x === badLocation[0] && y === badLocation[1]) {

                G.victory("BAD");
            }
            else {

                G.victory("GOOD");
            }
        }

        else if (level === 4) {
            if (PS.color(x, y) === PS.COLOR_YELLOW) {

                G.victory("BAD");
            }
            else if (PS.color(x, y) === PS.COLOR_RED) {

                G.victory("GOOD");
            }

        }
        else if (level === 5) {
            G.victory("GOOD");
        }

        else if (level === 6) {
            if (x === badLocation[0] && y === badLocation[1]) {

                G.victory("BAD");
            }
            else {

                G.victory("GOOD");
            }
        }

        else if (level === 7) {

            if (x === badLocation[0] && y === badLocation[1]) {

                G.victory("BAD");
            }
            else {
                G.victory("GOOD");
            }
        }
        else if (level === 8) {

            if (x === badLocation[0] && y === badLocation[1]) {
                G.victory("BAD");
            }
            else {
                G.victory("GOOD");
            }
        }

        else if (level > 8) {


            var despair = PS.random(5);

            switch (despair) {
                case 1:
                    PS.statusText("it hurts");

                    break;
                case 2:
                    PS.statusText("there's nothing");

                    break;
                case 3:
                    PS.statusText("i warned you");

                    break;
                case 4:
                    PS.statusText("its all dark");

                    break;
                case 5:
                    PS.statusText("you could have stopped");

                    break;
            }

        }

        else {

            if (x === badLocation[0] && y === badLocation[1]) {

                G.victory("BAD");
            }
            else if (PS.color(x, y) === PS.COLOR_RED) {
                G.victory("GOOD");
            }

        }


    }
    else {

        if (!C.getStarted() && !C.getTimer() && C.getAllDone()) {

            let r, g, b;
            r = PS.random(256) - 1; // random red 0-255
            g = PS.random(256) - 1; // random green
            b = PS.random(256) - 1; // random blue

            if (PS.color(x, y) === C.getPreset("COLOR_AREA")) {

                if (C.energyLifePrint() > 0) {
                    PS.gridPlane(1);

                    C.setXTouch(x);
                    C.setYTouch(y);

                    C.setStartingPoint(x, y);

                    var color = PS.color(x, y, r, g, b); // set bead color
                    PS.alpha(x, y, PS.ALPHA_OPAQUE);
                    PS.gridPlane(0);

                    C.colorSet(color);
                    C.firstClickSetup(x, y);
                }
                else {
                    PS.statusColor(PS.COLOR_RED);
                    PS.statusText("OUT OF CHANCES");
                    PS.audioPlay("fx_squawk");
                }

            }
        }
    }

};



/*
PS.release ( x, y, data, options )
Called when the mouse button is released over a bead, or when a touch is lifted off a bead
It doesn't have to do anything
[x] = zero-based x-position of the bead on the grid
[y] = zero-based y-position of the bead on the grid
[data] = the data value assigned to this bead by a call to PS.data(); default = 0.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.release() event handler:



PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.

    let xTouch = C.getXTouch();
    let yTouch = C.getYTouch();

    let currentPos = [x, y];
    let touchPos = [xTouch, yTouch];

    if (circumVec && !C.getTimer() && C.getAllDone()) {
        if (PS.color(x, y) === C.getPreset("COLOR_RETICLE") && currentPos !== touchPos ) {
            if (C.energyLifeManip()) {

                PS.statusColor(PS.COLOR_BLUE);
                PS.statusText("Chances: " + C.energyLifePrint() + " Total Score is " + C.energyScorePrint());

                // Add code here for mouse clicks/touches over a bead.

                C.start(x, y);

            }
            PS.gridPlane(2);
            C.aimLineDestroy(x, y);
            PS.gridPlane(1);

        }

    }



};



/*
PS.enter ( x, y, button, data, options )
Called when the mouse/touch enters a bead.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value assigned to this bead by a call to PS.data(); default = 0.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.enter() event handler:


PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.

    if (!circumVec) {

        var change = G.getChange();
        var rands = G.randGet();

        if ((PS.color(x, y) === PS.COLOR_YELLOW) && (G.getLevelBad() === 4) && change === false) {

            PS.color(x, y, PS.COLOR_RED);

            PS.color(rands[0], rands[1], PS.COLOR_YELLOW);
        }
        else if ((PS.color(x, y) === PS.COLOR_YELLOW) && (G.getLevelBad() === 4)) {

            if (x !== 0 && y !== 0 && x !== 15 && y !== 15) {

                PS.color(x, y, PS.COLOR_RED);
                PS.color(rands[0], rands[1], PS.COLOR_YELLOW);
            }
        }
    }
    else {
        if ( (x + 1) < 16 && (x - 1) > 0 && (y + 1) < 16 && (y - 1) > 0 && (y + 1) > 0 && (x + 1) > 0 && !C.getTimer() && C.getAllDone()) {
            if (PS.color(x, y) === C.getPreset("COLOR_RETICLE")) {
                C.aimLineSetup(x, y);
            }
        }
    }

};



/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits a bead.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value associated with this bead, 0 if none has been set.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.exit() event handler:

PS.exit = function( x, y, data, options ) {


    if (circumVec && !C.getTimer() && C.getAllDone()) {
        if ((x + 1) < 16 && (x - 1) > 0
            && (y + 1) < 16 && (y - 1) > 0
            && (y + 1) > 0 && (x + 1) > 0) {
            if (PS.color(x, y) === C.getPreset("COLOR_RETICLE")) {
                C.aimLineDestroy(x, y);
            }
        }
    }


};



/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
It doesn't have to do anything.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.exitGrid() event handler:

/*
PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.


};
*/



/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
It doesn't have to do anything.
[key] = ASCII code of the pressed key, or one of the PS.KEY constants documented at:
http://users.wpi.edu/~bmoriarty/ps/constants.html
[shift] = true if shift key is held down, else false.
[ctrl] = true if control key is held down, else false.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.keyDown() event handler:


/*
PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.

};
*/

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
It doesn't have to do anything.
[key] = ASCII code of the pressed key, or one of the PS.KEY constants documented at:
http://users.wpi.edu/~bmoriarty/ps/constants.html
[shift] = true if shift key is held down, else false.
[ctrl] = true if control key is held down, else false.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.keyUp() event handler:

/*

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

*/

/*
PS.input ( sensors, options )
Called when an input device event (other than mouse/touch/keyboard) is detected.
It doesn't have to do anything.
[sensors] = an object with sensor information; see API documentation for details.
[options] = an object with optional parameters; see API documentation for details.
NOTE: Mouse wheel events occur ONLY when the cursor is positioned over the grid.
*/

// Uncomment the following BLOCK to expose PS.input() event handler:

/*

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

*/

/*
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
It doesn't have to do anything.
[options] = an object with optional parameters; see API documentation for details.
NOTE: This event is only used for applications utilizing server communication.
*/

// Uncomment the following BLOCK to expose PS.shutdown() event handler:


PS.shutdown = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "Daisy, Daisy ...\n" );

	// Add code here for when Perlenspiel is about to close.


    if ( db && PS.dbValid( db ) ) {
        PS.dbEvent( db, "shutdown", true );
        PS.dbSend( db, "bmoriarty", { discard : true } );
    }


};


/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-17 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.
*/
