// game.js for Perlenspiel 3.2

// The "use strict" directive in the following line is important. Don't alter or remove it!
"use strict";

// The following comment lines are for JSLint/JSHint. Don't alter or remove them!

/*jslint nomen: true, white: true */
/*global PS */

/*
This is a template for creating new Perlenspiel games.
All event-handling functions are commented out by default.
Uncomment and add code to the event handlers required by your project.
*/

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
[system] = an object containing engine and platform information; see API documentation for details.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.init() event handler:



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

    var badArr;

    var change = false;


    var exports = {


        victory : function (decision) {

            if (decision === "GOOD") {
                if (level < 9) {
                    PS.statusColor(0x3FF40);
                    if (timer !== null) {
                        PS.debug("NULL\n");
                        PS.timerStop(timer);
                    }

                    var compliment = PS.random(5);

                    level++;

                    switch (compliment) {
                        case 1:
                            PS.statusText("You are Exemplary. Next Round.");
                            PS.audioPlay("fx_tada");
                            PS.init();
                            break;
                        case 2:
                            PS.statusText("You are Wonderful. Next Round.");
                            PS.audioPlay("fx_tada");
                            PS.init();
                            break;
                        case 3:
                            PS.statusText("You are Amazing. Next Round.");
                            PS.audioPlay("fx_tada");
                            PS.init();
                            break;
                        case 4:
                            PS.statusText("You are Magnificent. Next Round.");
                            PS.audioPlay("fx_tada");
                            PS.init();
                            break;
                        case 5:
                            PS.statusText("You are Sublime. Next Round.");
                            PS.audioPlay("fx_tada");
                            PS.init();
                            break;
                    }


                }
                else {
                    if (timer !== null) {
                        PS.timerStop(timer);
                    }
                    PS.statusColor(PS.COLOR_WHITE);
                    PS.statusText("The Game is over. Well Done. Now go home.");
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

                    PS.audioPlay("fx_tada");
                }
            }
            else if (decision === "BAD") {
                if (levelBad < 4) {
                    if (timer !== null) {
                        PS.timerStop(timer);
                    }
                    level = 0;
                    levelBad++;

                    var anger = PS.random(5);

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
                    if (timer !== null) {
                        PS.timerStop(timer);
                    }
                    PS.statusColor(PS.COLOR_WHITE);
                    PS.statusText("ERRORERRORERRORERROR@#@(*&()~");
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

                    PS.audioPlay("l_piano_eb1");
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
            else {
                // Set glyph to numeral
                PS.audioPlay( "fx_click" );
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
            else {
                // Set glyph to numeral
                PS.audioPlay( "fx_click" );
            }
        },


        /*
        8 3
        11 5
        11 9
        8 12
        5 9
        5 5
        8 3
        */

        randomPlaceBad3 : function () {
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
                    PS.color(8, 12, PS.COLOR_YELLOW);
                    G.setLoc(8, 12);
                    break;
                case 1:
                    PS.color(8, 12, PS.COLOR_RED);
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
                PS.color(x, y, PS.COLOR_WHITE);
            }
            else {
                // Set glyph to numeral
                PS.audioPlay( "fx_click" );
            }
        },


        randomPlaceBad4 : function (x, y) {
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
            else {
                // Set glyph to numeral
                PS.audioPlay( "fx_click" );
            }
        },


        start : function (x, y) {
            PS.debug("x " + x + " y " + y + "\n");
            if ( !timer ) { // null if not running
                if (levelBad === 0 ) {
                    count = 4; // reset count
                    timer = PS.timerStart(60, G.randomPlace, x, y);
                }
                else if (levelBad === 1) {
                    count = 3;
                    PS.color(PS.ALL, PS.ALL, PS.COLOR_RED);
                    timer = PS.timerStart(60, G.randomPlaceBad2, x, y);
                }
                else if (levelBad === 2) {
                    count = 6;
                    PS.color(8, 3, PS.COLOR_RED);
                    PS.color(11, 5, PS.COLOR_RED);
                    PS.color(11, 9, PS.COLOR_RED);
                    PS.color(8, 12, PS.COLOR_RED);
                    PS.color(5, 9, PS.COLOR_RED);
                    PS.color(5, 5, PS.COLOR_RED);
                    timer = PS.timerStart(30, G.randomPlaceBad3);
                }
                else if (levelBad === 3) {
                    count = 6;
                    PS.color(x, y, PS.COLOR_YELLOW);
                    timer = PS.timerStart(60, G.randomPlaceBad4, x, y);
                }
                else if (levelBad === 4) {
                    count = 3;

                    timer = PS.timerStart(60, G.randomPlaceBad5, x, y);
                }
            }

        },

        randGet : function () {

            var xRand = PS.random(13) + 1;
            var yRand = PS.random(13) + 1;

            var randArr = [xRand, yRand];

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



        init : function () {
            PS.gridSize(WIDTH, HEIGHT);


            timer = null; // timer id, null if none


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
                var rands = G.randGet();
                PS.statusText("Welcome. Select the Red Bead.");


                PS.color(8, 7, PS.COLOR_RED);
                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);

            }

            if (level > 0) {
                var rands = G.randGet();
                var rands2 = G.randGet();


                PS.color(rands[0], rands[1], PS.COLOR_RED);
                G.start(rands2[0], rands2[1]);
                G.setLoc(rands2[0], rands2[1]);

            }

            if (levelBad === 1) {

                var rands = G.randGet();

                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);

            }
            if (levelBad === 2) {
                var rands = G.randGet();
                G.start(rands[0], rands[1]);
            }
            if (levelBad === 3) {
                var rands = G.randGet();
                PS.color(PS.ALL, PS.ALL, PS.COLOR_RED);
                G.start(rands[0], rands[1]);

            }

            if (levelBad === 4) {
                PS.statusText("PRESS ANY COLOR ");

                for (var x = 0; x < WIDTH; x += 1) {
                    for (var y = 0; y < HEIGHT; y += 1) {
                        if (selectedBoard[(y * HEIGHT) + x] === 1) {
                            PS.gridPlane(1);
                            PS.color(x, y, COLOR_WALL);
                            PS.alpha(x, y, PS.ALPHA_OPAQUE);
                            PS.border(x, y, PS.COLOR_BLACK);
                            PS.gridPlane(0);
                        }
                        else {
                            PS.debug("NEW COLOR\n");
                            var r, g, b;
                            r = PS.random(255); // random red 0-255
                            g = PS.random(255); // random green
                            b = PS.random(255); // random blue
                            PS.color(x, y, r, g, b);

                        }
                    }
                }

                var rands = G.randGet();
                G.start(rands[0], rands[1]);
                G.setLoc(rands[0], rands[1]);

            }

            PS.audioLoad( "fx_bucket" );
            PS.audioLoad( "fx_squawk" ); //Duck Squak on failure
            PS.audioLoad( "fx_tada" ); //WIN!!!

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

    var badLocation = G.getLoc();

    var level = G.getLevelBad();

    if (level === 3) {
        if ((PS.color(x, y) === PS.COLOR_YELLOW) && level === 3) {
            PS.debug("BAD\n");
            G.victory("BAD");
            G.setChange(false);
        }

    }
    else if(level === 4) {
        PS.debug("TOUCH ELSE\n");
        if (x === badLocation[0] && y === badLocation[1] ) {
            G.victory("BAD");
        }
        else {
            G.victory("GOOD");
        }
    }
    else {
        PS.debug("TOUCH ELSE\n")
        if (x === badLocation[0] && y === badLocation[1] ) {
            G.victory("BAD");
        }
        else if (PS.color(x, y) === PS.COLOR_RED) {
            G.victory("GOOD");
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

/*

PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

*/

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

    var change = G.getChange();

    if ((PS.color(x, y) === PS.COLOR_YELLOW) && (G.getLevelBad() === 3) && change === false) {
        PS.color(x, y, PS.COLOR_RED);
        var rands = G.randGet();
        PS.color(rands[0], rands[1], PS.COLOR_YELLOW);
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

/*

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

*/

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
It doesn't have to do anything.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.exitGrid() event handler:


PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.



};




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

/*

PS.shutdown = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "Daisy, Daisy ...\n" );

	// Add code here for when Perlenspiel is about to close.
};

*/

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
