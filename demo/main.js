var vid = document.getElementById('video1');
var dataOrderCounter = -1;
var questionCounter = 0;
var srcMapCounter = 0;
var checkAnswerBtn = document.querySelector('.checkAnswerBtn');
var sameLevelBtn = document.querySelector('#sameLevelBtn');
var harderLevelBtn = document.querySelector('#harderLevelBtn');
var tryAgainBtn = document.querySelector('#tryAgainBtn');
var skipBtn = document.querySelector('.skipBtn');
var endGameBtn = document.querySelector('#endGameBtn');
var finalChallengeBtn = document.querySelector('#finalChallengeBtn');
var userAnswer;
var template = document.getElementById('gameTMPL');
var userAnswerEl = document.querySelector('.userAnswer');
var game = document.getElementById('game');



var questions = [
	{
		questiontext: "lorem ipsum 1+1 = ",
		answer: "2"
	},
	{
		questiontext: "lorem ipsum 2+2 = ",
		answer: "4"
	},
	{
		questiontext: "lorem ipsum 3+3 = ",
		answer: "6"
	},
	{
		questiontext: "lorem ipsum 4+4 = ",
		answer: "8"
	},
	{
		questiontext: "lorem ipsum 5+5 = ",
		answer: "10"
	},
	{
		questiontext: "lorem ipsum 6+6 = ",
		answer: "12"
	},
	{
		questiontext: "lorem ipsum 7+7 = ",
		answer: "14"
	},
	{
		questiontext: "lorem ipsum 8+8 = ",
		answer: "16"
	},
	{
		questiontext: "lorem ipsum 9+9 = ",
		answer: "18"
	},
	{
		questiontext: "lorem ipsum 10+10 = ",
		answer: "20"
	},
	{
		questiontext: "lorem ipsum 11+11 = ",
		answer: "22"
	},
	{
		questiontext: "lorem ipsum 12+12 = ",
		answer: "24"
	},
	{
		questiontext: "lorem ipsum 13+13 = ",
		answer: "26"
	},
	{
		questiontext: "lorem ipsum 14+14 = ",
		answer: "28"
	},
	{
		questiontext: "Open-ended question"
	}
];

// var srcMap = {
// 	C1: ["./brainimages/c1s0.jpg", "./brainimages/c1s1.jpg", "./brainimages/c1s2.jpg", "./brainimages/c1s3.jpg"],
// 	C2: ["./brainimages/c2s0.jpg", "./brainimages/c2s1.jpg", "./brainimages/c2s2.jpg", "./brainimages/c2s3.jpg"],
// 	C3: ["./brainimages/c3s0.jpg", "./brainimages/c3s1.jpg", "./brainimages/c3s2.jpg", "./brainimages/c3s3.jpg"],
// 	C4: ["./brainimages/c4s0.jpg", "./brainimages/c4s1.jpg", "./brainimages/c4s2.jpg", "./brainimages/c4s3.jpg"],
// 	C5: ["./brainimages/c5s0.jpg", "./brainimages/c5s1.jpg", "./brainimages/c5s2.jpg", "./brainimages/c5s3.jpg"],
// 	C6: ["./brainimages/c6s0.jpg", "./brainimages/c6s1.jpg", "./brainimages/c6s2.jpg", "./brainimages/c6s3.jpg"]
// };

var srcMap = [
	["./brainimages/c1s0.jpg", "./brainimages/c1s1.jpg", "./brainimages/c1s2.jpg", "./brainimages/c1s3.jpg"],
	["./brainimages/c2s0.jpg", "./brainimages/c2s1.jpg", "./brainimages/c2s2.jpg", "./brainimages/c2s3.jpg"],
	["./brainimages/c3s0.jpg", "./brainimages/c3s1.jpg", "./brainimages/c3s2.jpg", "./brainimages/c3s3.jpg"],
	["./brainimages/c4s0.jpg", "./brainimages/c4s1.jpg", "./brainimages/c4s2.jpg", "./brainimages/c4s3.jpg"],
	["./brainimages/c5s0.jpg", "./brainimages/c5s1.jpg", "./brainimages/c5s2.jpg", "./brainimages/c5s3.jpg"],
	["./brainimages/c6s0.jpg", "./brainimages/c6s1.jpg", "./brainimages/c6s2.jpg", "./brainimages/c6s3.jpg"]
];
// state rep. connection type 0,1,2
// 0 = no connection
// 1 = blocked
// 2 = connection
// 3 = super connection

// get image from data-order number
function getImg(orderNum) {
	var selector = '[data-order="' + orderNum + '"]';
	return document.querySelector(selector);
}

function changeImg(imgEl, arrayNum, state){
	imgEl.src = srcMap[arrayNum][state];
}

function showArrowBtn() {
	document.querySelector('.arrowBtn').classList.remove('hide');
}

function showInstructions(){
	document.querySelector('.arrowBtn').classList.add('hide');
	game.classList.remove('hide');
}

function startGame(){
	document.getElementById('instructions').classList.add('hide');
	document.getElementById('startGameBtn').classList.add('hide');
	document.getElementById('gamequestions').classList.remove('hide');
	displayQuestion(questions, questionCounter, "questiontext");
}

vid.addEventListener("ended", showArrowBtn);
document.querySelector('.arrowBtn').addEventListener('click', showInstructions);
startGameBtn.addEventListener('click', startGame);




function displayQuestion(questionsArray, questionCount, questiontext) {
	template.content.querySelector('.questiontext').innerHTML = questionsArray[questionCount][questiontext];
	var clone = document.importNode(template.content, true);
	document.querySelector('.templateInput').appendChild(clone);
	dataOrderCounter = dataOrderCounter + 1;
}



function hideQuestion() {
	document.querySelector('.userAnswer').value = "";
	document.querySelector('.templateInput').removeChild(document.querySelector('.questiontext'));
}


sameLevelBtn.addEventListener('click', function (){
	userAnswerEl.disabled = false;
	hideQuestion();
	sameLevelBtn.classList.add('hide');
	harderLevelBtn.classList.add('hide');
	questionCounter = questionCounter + 1;
	displayQuestion(questions, questionCounter, "questiontext");
	skipBtn.classList.remove('hide');
	checkAnswerBtn.classList.remove('hide');
	changeImg(getImg(dataOrderCounter), srcMapCounter, 2);
	srcMapCounter = srcMapCounter + 1;
});

harderLevelBtn.addEventListener('click', function (){
	userAnswerEl.disabled = false;
	hideQuestion();
	sameLevelBtn.classList.add('hide');
	harderLevelBtn.classList.add('hide');
	questionCounter = questionCounter + 2;
	displayQuestion(questions, questionCounter, "questiontext");
	skipBtn.classList.remove('hide');
	checkAnswerBtn.classList.remove('hide');
	changeImg(getImg(dataOrderCounter), srcMapCounter, 3);
	srcMapCounter = srcMapCounter + 1;
});

skipBtn.addEventListener('click', function (){
	userAnswerEl.disabled = false;
	if (dataOrderCounter < 6) {
		hideQuestion();
		sameLevelBtn.classList.add('hide');
		harderLevelBtn.classList.add('hide');
		tryAgainBtn.classList.add('hide');
		questionCounter = questionCounter + 1;
		displayQuestion(questions, questionCounter, "questiontext");
		skipBtn.classList.remove('hide');
		checkAnswerBtn.classList.remove('hide');
		changeImg(getImg(dataOrderCounter), srcMapCounter, 1);
		srcMapCounter = srcMapCounter + 1;
	} else {
		hideQuestion();
		document.querySelector('.userAnswer').classList.add('hide');
		skipBtn.classList.add('hide');
		checkAnswerBtn.classList.add('hide');
		endGameBtn.classList.remove('hide');
		finalChallengeBtn.classList.remove('hide');
	}
});

tryAgainBtn.addEventListener('click', function(){
	userAnswerEl.disabled = false;
	document.querySelector('.userAnswer').value = "";
	tryAgainBtn.classList.add('hide');
	checkAnswerBtn.classList.remove('hide');
});


checkAnswerBtn.addEventListener('click', setUserAnswer);
userAnswerEl.addEventListener('keydown', function(e) {
    if(e.which == 13) {
        setUserAnswer();
    }
});

function setUserAnswer(){
	userAnswer = document.querySelector('.userAnswer').value;
	checkAnswer(userAnswer, questionCounter);
}

// how can we make this flexible for all the questions?
function checkAnswer(userAns, questionNumber) {
	var rightAnswer = questions[questionNumber].answer;
	if (userAns === rightAnswer){
		alert("You got the right answer!");
		checkAnswerBtn.classList.add('hide');
		skipBtn.classList.add('hide');
		furtherQuestions();
		userAnswerEl.disabled = true;
		// OPTIONS FOR TWO FURTHER QUESTIONS
	} else {
		alert("That's not the right answer!");
		// TRY AGAIN OR SKIP
		checkAnswerBtn.classList.add('hide');
		userAnswerEl.disabled = true;
		tryOrSkip();
	}
}


function furtherQuestions() {
	if (dataOrderCounter < 6) {
		sameLevelBtn.classList.remove('hide');
		harderLevelBtn.classList.remove('hide');
	} else {
		hideQuestion();
		document.querySelector('.userAnswer').classList.add('hide');
		endGameBtn.classList.remove('hide');
		finalChallengeBtn.classList.remove('hide');
	}
}

function tryOrSkip() {
	if (dataOrderCounter < 6) {
		tryAgainBtn.classList.remove('hide');
		checkAnswerBtn.classList.add('hide');
	} else {
		hideQuestion();
		document.querySelector('.userAnswer').classList.add('hide');
		endGameBtn.classList.remove('hide');
		finalChallengeBtn.classList.remove('hide');
	}
}

function endGame() {
	alert("Game finished.");
}

endGameBtn.addEventListener('click', endGame);

finalChallengeBtn.addEventListener('click', function() {
	finalChallengeBtn.classList.add('hide');
	displayQuestion(questions, 14, "questiontext");
	// something that ends game
});
