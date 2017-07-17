var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");

//quiz function to export
var Quiz = function(callback) {
	//callback for main menu in cli.js
	this.myCallback = callback;
	var self = this;
	var quizArray = [];	
	this.runQuiz = function() {
	
		fs.readFile("quiz.txt", "utf8", function(error, data) {
			if (error) {
				return console.log(error);
			}
			console.log(data);
			var cards = data.split('\n');
			for (var i = 0; i < cards.length-1; i++) {
				var fields = cards[i].split(',');
				console.log(fields[0]);
				console.log(fields[1], fields[2]);
				if (fields[0] === 'Basic') {
					console.log('push basic');
					quizArray.push(new BasicCard(fields[1], fields[2]));

				} else if (fields[0] === 'Cloze') {
					console.log('push cloze');
					var newCard = new ClozeCard(fields[1], fields[2]);
					quizArray.push(newCard);
				}
			}
			console.log(quizArray.length);
			self.flashcard(0);
			
		});
		
	};
	this.flashcard = function(index) {
		if (index < quizArray.length) {
			/*
			if(quizArray[index] instanceof BasicCard)
				console.log("I'm a BasicCard");
			else if(quizArray[index] instanceof ClozeCard)
				console.log("I'm a ClozeCard");
			else
				console.log("We have a problem");
			*/

			inquirer.prompt([
			  {
			    name: 'answer',
				message: quizArray[index].getQuestion()
			  }

			]).then(function(answers) {
				var correct = quizArray[index].checkAnswer(answers.answer);
				if (correct) {
					console.log("Correct!");
				} else {
					console.log("Incorrect!");
				}
				 console.log(quizArray[index].getAnswer());
				 self.flashcard(index+1);
			});
			

		} else {
			console.log("No more questions! Take the quiz again or create more flashcards.");
			self.myCallback();
		}
	};
};



module.exports = Quiz;