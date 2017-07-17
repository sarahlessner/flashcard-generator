var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");

var Quiz = function(callback) {
	this.myCallback = callback;
	this.runQuiz = function() {
		var quizArray = [];
		fs.readFile("quiz.txt", "utf8", function(error, data) {
			if (error) {
				return console.log(error);
			}
			console.log(data);
			var cards = data.split('\n');
			console.log(cards.length);
			for (var i = 0; i < cards.length-1; i++) {
				console.log(cards[i]);
				var fields = cards[i].split(',');
				if (fields[0] === 'Basic') {
					quizArray.push(new BasicCard(fields[1], fields[2]));

				} else if (fields[0] === 'Cloze') {
					quizArray.push(new ClozeCard(fields[1], fields[2]));
				}
			}
		});
	};
};

module.exports = Quiz;