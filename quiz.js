var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");

//quiz function to export
var Quiz = function(callback) {
	//callback for main menu in cli.js
	this.myCallback = callback;
	//to call this within this.
	var self = this;
	//array will store cards created from text file
	var quizArray = [];
	//initiates quiz by reading card data from quiz.txt and pushing to array
	this.runQuiz = function() {

		fs.readFile("quiz.txt", "utf8", function(error, data) {
			if (error) {
				return console.log(error);
			}
			// console.log(data);
			//define card by line break
			var cards = data.split('\n');
			//for each flashcard entry in the log
			for (var i = 0; i < cards.length-1; i++) {
				//split content of individual flashcard - 0 card type & 1-2 args
				var fields = cards[i].split(',');
				//make a new basic card using constructor
				if (fields[0] === 'Basic') {
					//create new flashcard & pass arguments - push to array
					quizArray.push(new BasicCard(fields[1], fields[2]));
				//make a new cloze card using constructor
				} else if (fields[0] === 'Cloze') {
					//create new flashcard & pass arguments - push to array
					quizArray.push(new ClozeCard(fields[1], fields[2]));
				}
			}
			//call flashcard and pass 0 as argument for index
			self.flashcard(0);

		});

	};
	this.flashcard = function(index) {
		//loop through quiz array
		if (index < quizArray.length) {
			//use inquirer to display flashcard front or partial
			inquirer.prompt([
			  {
			  name: 'answer',
				message: quizArray[index].getQuestion()
			  }
			]).then(function(answers) {
				//check user input with checkAnswer method
				var correct = quizArray[index].checkAnswer(answers.answer);
				if (correct) {
					console.log("Correct!");
				} else {
					console.log("Incorrect!");
				}
				//display answer after correct/incorrect message
				 console.log(quizArray[index].getAnswer());
				 //increment index & call flashcard again
				 self.flashcard(index+1);
			});

		//when all flashcards have been displayed in the prompt
		} else {
			console.log("No more questions!");
			//callback to mainMenu()
			self.myCallback();
		}
	};
};


module.exports = Quiz;
