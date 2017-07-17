var Flashcards = require("./flashcards.js")
var Quiz = require("./quiz.js");
var inquirer = require("inquirer");
var fs = require("fs");

mainMenu();
//when this file is run, ask user what they want to do
function mainMenu() {
	var myQuiz = new Quiz(mainMenu);
	var myFlashcards = new Flashcards(mainMenu);
	inquirer.prompt([
	  {
	    type: "list",
		message: "Would you like to create a basic flashcard, create a cloze-deleted flashcard, or take a quiz? Select one.",
		name: "list",
		choices: ['Basic', 'Cloze', 'Quiz', 'Exit']
	  }
	 //run one of 3 functions based on users answer
	]).then(function(answers) {
		if (answers.list === 'Basic') {
			myFlashcards.createBasic();
		} else if (answers.list === 'Cloze') {
			myFlashcards.createCloze();
		} else if (answers.list === 'Quiz') {
			myQuiz.runQuiz();
		} else if (answers.list === 'Exit') {
			console.log('GOODBYE!'); 
			return;
		} else {
			console.log("FAIL!"); //probably not even possible
		}

	});
};



