var inquirer = require("inquirer");
var fs = require("fs");

var Flashcards = function(callback) {
	this.myCallback = callback;
	var self = this;

	//function to create basic flashcard from constructor + log to quiz file
	this.createBasic = function() {
		inquirer.prompt([
		{
		name: "front",
		message: "Enter a Question: "
		}, {
		name: "back",
		message: "Enter the Answer: "
		}
		]).then(function(answers) {	
			logFlashCards("Basic"+","+answers.front+","+answers.back+"\n");
			inquirer.prompt([
			{
			type: "confirm",
			message: "Create another question?",
			name: "anotherBasic",
			default: true
			}
			]).then(function(answers) {
				if (answers.anotherBasic) {
					self.createBasic();
				} else {
					self.myCallback();
				}
			});
		});
	};
	//function to create cloze flashcard from constructor + log to quiz file
	this.createCloze = function() {
		inquirer.prompt([
		{
		name: "text",
		message: "Enter a Question: "
		}, {
		name: "cloze",
		message: "Enter the portion of the Question to be cloze-deleted: "
		}
		]).then(function(answers) {	
			logFlashCards("Cloze"+","+answers.text+","+answers.cloze+"\n");
			// logFlashCards(newClozeCard);
			inquirer.prompt([
			{
			type: "confirm",
			message: "Create another question?",
			name: "anotherCloze",
			default: true
			}
			]).then(function(answers) {
				if (answers.anotherCloze) {
					self.createCloze();
				} else {
					self.myCallback();
				}
			});
		});
	};
	//function to run log file containing created flashcards and display as quiz

	
};

logFlashCards = function(card) {
	fs.appendFile("quiz.txt",card, function(err) {
		if (err) {
			return console.log(err);
			}
		});
};

module.exports = Flashcards;