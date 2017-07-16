
function ClozeCard(text, cloze) {
	//cloze deleted part of text
	this.cloze = cloze;
	this.text = text;
	if (this.text.includes(this.cloze) === false) {
		console.log("cloze not found");
		return;
	}
}

//directions say to use prototypes
ClozeCard.prototype.partial = function() {
	//finds cloze in text and displays text with cloze removed
		var partialText = this.text.replace(this.cloze, '...')
		console.log(partialText);
};


var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States.
console.log(firstPresidentCloze.partial);
firstPresidentCloze.partial(); 

// "George Washington was the first president of the United States.
console.log(firstPresidentCloze.text);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");


module.exports = ClozeCard;

