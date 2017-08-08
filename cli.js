var Flashcards = require("./flashcards");
var Quiz = require("./quiz");
var inquirer = require("inquirer");


mainMenu();
//when this file is run, ask user what they want to do
function mainMenu() {
	//create variables for accessing Quiz and Flashcards & pass callback so user can return to main menu
	var myQuiz = new Quiz(mainMenu);
	var myFlashcards = new Flashcards(mainMenu);
	//find out if user wants to run quiz or create cards
	inquirer.prompt([
	  {
	    type: "list",
		message: "What would you like to do? Select one: ",
		name: "list",
		choices: ['Create Basic Flashcards', 'Create Cloze-Deleted Flashcards', 'Take a Quiz', 'Exit']
	  }
	 //run one of 3 functions based on users answer, or quit app
	]).then(function(answers) {

		if (answers.list === 'Create Basic Flashcards') {
			myFlashcards.createBasic();vs
		} else if (answers.list === 'Create Cloze-Deleted Flashcards') {
			myFlashcards.createCloze();
		} else if (answers.list === 'Take a Quiz') {
			myQuiz.runQuiz();
			//option to return(quit) if user is done with program
		} else if (answers.list === 'Exit') {
			console.log('GOODBYE!'); 
			return;
		} else {
			console.log("FAIL!"); //this condition should never be reached
		}

	});
};



