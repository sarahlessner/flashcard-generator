
function BasicCard(front, back) {
	if (this instanceof BasicCard) {
		this.front = front;
		this.back = back;
	} else {
		return new BasicCard(front, back);
	}
};

BasicCard.prototype.checkAnswer = function(answer){	
	return (this.back.toLowerCase() === answer.toLowerCase());
};

module.exports = BasicCard;