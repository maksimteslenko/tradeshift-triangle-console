'use strict';

//Dependencies
const readline = require('readline');
const async = require('async');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Prompting the user
rl.setPrompt('Please enter triangle side lengths separated by a semicolon: ');
rl.prompt();
  
rl.on('line', line => {
	const sidesArray = line.split(';');
	verifyConsoleInput(sidesArray, (err, verifiedArr) => {
		//Error handling
		if (err) {
			rl.setPrompt(`Error: Incorrect input: ${err}`);
			rl.prompt();
			rl.close();
		} else {
			console.log(`\nThank you. You've entered: ${line}`);
			getTriangleType(verifiedArr, (err, result) => {
				if (err) {
					console.log(err);
					return;
				} else {
					console.log(`Your type of triangle is: ${result}`);
					rl.close();
				}
			});
		}
	});
}).on('close', () => {
	console.log('\nHave a great day!');
	process.exit();
});

//Verifying triangle sides
function verifyConsoleInput(sidesArray, callback) {
	//Make sure there are three values for the sides
	if (sidesArray.length<3 || sidesArray.length>3) {
		callback('There have to be three sides in a triangle.', null);
	} else {
		async.eachSeries(sidesArray, (side, asyncCallback) => {
			//Make sure that there are no negative values
			if (parseInt(side) <= 0) {
				callback('Side cannot be less than zero', null);
			//Make sure that input ahd no empty values
			} else if (side == '') {
				callback('Side must have a length', null);
			//Make sure that input value is a number
			} else if (isNaN(side)) {
				callback('Side must be a number', null);
			//Process next element in the array
			} else {
				process.nextTick(() => asyncCallback());
			}
		}, () => {
			callback(null, sidesArray);
		});
	}
}

//Get triangle type based on sides
function getTriangleType(sides, callback) {
	const a = sides[0];
	const b = sides[1];
	const c = sides[2];
	if (a != b && b != c && c != a) {
		callback(null, 'scalene');
	} else if (a == b && b == c && c == a ) {
		callback(null, 'equilateral');

	} else {
		callback(null, 'isosceles ');
	}
}