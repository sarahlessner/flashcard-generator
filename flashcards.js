var inquirer = require("inquirer");
var fs = require("fs");

//flashcards function to export
var Flashcards = function(callback) {
	//callback for main menu in cli.js
	this.myCallback = callback;
	var self = this;

	//function to get input necessary for making basic flashcard and logging to quiz file
	this.createBasic = function() {
		//use inquirer to get params necessary for creating flashcards
		inquirer.prompt([
		{
		name: "front",
		message: "Enter a Question: "
		}, {
		name: "back",
		message: "Enter the Answer: "
		}
		]).then(function(answers) {	
			//log type of card and answers to quiz.txt
			logFlashCards("Basic"+","+answers.front+","+answers.back+"\n");
			//ask if user wants to create another flashcard
			inquirer.prompt([
			{
			type: "confirm",
			message: "Create another flashcard?",
			name: "anotherBasic",
			default: true
			}
			]).then(function(answers) {
				if (answers.anotherBasic) {
					//if they want to make another flashcard
					self.createBasic();
				} else {
					//if they select 'n' this will execute "mainMenu" function in cli.js
					self.myCallback();
				}
			});
		});
	};
	//function to get input necessary for making cloze flashcard and logging to quiz file
	this.createCloze = function() {
		//use inquirer to get params necessary for creating flashcards
		inquirer.prompt([
		{
		name: "text",
		message: "Enter the full text: "
		}, {
		name: "cloze",
		message: "Enter the portion of the text to be cloze-deleted: "
		}
		]).then(function(answers) {	
			//log type of card and answers to quiz.txt
			logFlashCards("Cloze"+","+answers.text+","+answers.cloze+"\n");
			//ask if user wants to create another flashcard
			inquirer.prompt([
			{
			type: "confirm",
			message: "Create another flashcard?",
			name: "anotherCloze",
			default: true
			}
			]).then(function(answers) {
				//if they want to make another flashcard
				if (answers.anotherCloze) {
					self.createCloze();
				} else {
					//if they select 'n' this will execute "mainMenu function in cli.js"
					self.myCallback();
				}
			});
		});
	};
	
};
//function to run log user input to file which will create flashcards
logFlashCards = function(card) {
	fs.appendFile("quiz.txt",card, function(err) {
		if (err) {
			return console.log(err);
			}
		});
};

module.exports = Flashcards;