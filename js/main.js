// variables:

var vid = document.getElementById('video1');
var dataOrderCounter = -1;
var questionCounter = 0;
var srcMapCounter = 0;
var gameScore = 0;
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
var correct = document.querySelector('.correct');
var incorrect = document.querySelector('.incorrect');
var game = document.getElementById('game');
var questionPicSrc = document.querySelector('#questionpic').src;

var questions = [
	{
		questionpic: "./media/questionpics/q1.png",
		answer: "10",
		help: "Hint: Make sure to count ALL the tally marks!"
	},
	{
		questionpic: "./media/questionpics/q2.png",
		answer: "4",
		help: "Hint: What can you add to 1 to make a total of 5?"
	},
	{
		questionpic: "./media/questionpics/q3.png",
		answer: "12",
		help: "Hint: Count the stars carefully, you can do it!"
	},
	{
		questionpic: "./media/questionpics/q4.png",
		answer: "17",
		help: "Hint: Make sure to count ALL the tally marks!"
	},
	{
		questionpic: "./media/questionpics/q5.png",
		answer: "6",
		help: "Hint: Are you missing any sides?"
	},
	{
		questionpic: "./media/questionpics/q6.png",
		answer: "6",
		help: "Hint: Count the stars carefully, you can do it!"
	},
	{
		questionpic: "./media/questionpics/q7.png",
		answer: "12",
		help: "Hint: Take it one step at a time!"
	},
	{
		questionpic: "./media/questionpics/q8.png",
		answer: "10",
		help: "Hint: Can you figure out what the watermelons are equal to first?"
	},
	{
		questionpic: "./media/questionpics/q9.png",
		answer: "18",
		help: "Hint: What's the pattern before you get to the last space?"
	},
	{
		questionpic: "./media/questionpics/q10.png",
		answer: "13",
		help: "Hint: Count carefully, don't give up!"
	},
	{
		questionpic: "./media/questionpics/q11.png",
		answer: "8",
		help: "Hint: Are you missing any sides? Count carefully!"
	},
	{
		questionpic: "./media/questionpics/q12.png",
		answer: "23",
		help: "Hint: Count carefully, don't give up!"
	},
	{
		questionpic: "./media/questionpics/q13.png",
		answer: "40",
		help: "Hint: What's the pattern before you get to the last space?"
	},
	{
		questionpic: "./media/questionpics/q14.png",
		answer: "17",
		help: "Hint: Can you figure out what each fruit is equal to?"
	},
	{
		questionpic: "./media/questionpics/q15.png"
	}
];

var srcMap = [
	["./media/brainimages/c1s0.png", "./media/brainimages/c1s1.png", "./media/brainimages/c1s2.png", "./media/brainimages/c1s3.png"],
	["./media/brainimages/c2s0.png", "./media/brainimages/c2s1.png", "./media/brainimages/c2s2.png", "./media/brainimages/c2s3.png"],
	["./media/brainimages/c3s0.png", "./media/brainimages/c3s1.png", "./media/brainimages/c3s2.png", "./media/brainimages/c3s3.png"],
	["./media/brainimages/c4s0.png", "./media/brainimages/c4s1.png", "./media/brainimages/c4s2.png", "./media/brainimages/c4s3.png"],
	["./media/brainimages/c5s0.png", "./media/brainimages/c5s1.png", "./media/brainimages/c5s2.png", "./media/brainimages/c5s3.png"],
	["./media/brainimages/c6s0.png", "./media/brainimages/c6s1.png", "./media/brainimages/c6s2.png", "./media/brainimages/c6s3.png"]
];
// state rep. connection type 0,1,2
// 0 = no connection
// 1 = blocked
// 2 = connection
// 3 = super connection


// functions:

function getImg(orderNum) {
	var selector = '[data-order="' + orderNum + '"]';
	return document.querySelector(selector);
}

function changeImg(imgEl, arrayNum, state){
	imgEl.src = srcMap[arrayNum][state];
}

function showArrowBtn() {
	vid.pause();
	document.querySelector('.arrowBtn').classList.remove('hide');
}

function showInstructions(){
	document.querySelector('.arrowBtn').classList.add('hide');
	game.classList.remove('hide');
}

function startGame(){
	document.querySelector('#instructions').classList.add('hide');
	document.getElementById('startGameBtn').classList.add('hide');
	document.getElementById('gamequestions').classList.remove('hide');
	displayQuestion(questions, questionCounter, "questionpic");
}

function updateScore(increment) {
	gameScore = gameScore + increment;
	document.getElementById('gameScore').innerText = gameScore;
}

function displayQuestion(questionsArray, questionCount, questionpic) {
	questionPicSrc = questionsArray[questionCount][questionpic];
	document.querySelector('#questionpic').src = questionPicSrc;
	dataOrderCounter = dataOrderCounter + 1;
}

function displayHelp(questionsArray, questionCount) {
	document.querySelector('.questionhelp').innerHTML =  questionsArray[questionCount].help;
}

function setUserAnswer(){
	userAnswer = userAnswerEl.value;
	checkAnswer(userAnswer, questionCounter);
}

function checkAnswer(userAns, questionNumber) {
	document.querySelector('.questionhelp').innerText = "";
	var rightAnswer = questions[questionNumber].answer;
	if (userAns === rightAnswer){
		// alert("You got the right answer!");
		correct.classList.remove('hide');
		checkAnswerBtn.classList.add('hide');
		skipBtn.classList.add('hide');
		furtherQuestions();
		userAnswerEl.disabled = true;
		// OPTIONS FOR TWO FURTHER QUESTIONS
	} else {
		// alert("That's not the right answer!");
		// TRY AGAIN OR SKIP
		incorrect.classList.remove('hide');
		checkAnswerBtn.classList.add('hide');
		userAnswerEl.disabled = true;
		tryOrSkip();
		displayHelp(questions, questionCounter);
	}
}

function furtherQuestions() {
	if (dataOrderCounter < 6) {
		sameLevelBtn.classList.remove('hide');
		harderLevelBtn.classList.remove('hide');
	} else {
		// hideQuestion();
		// document.querySelector('#questionpic').src = "";
		document.querySelector('.userAnswer').classList.add('hide');
		endGameBtn.classList.remove('hide');
		finalChallengeBtn.classList.remove('hide');
	}
}

function tryOrSkip() {
	if (dataOrderCounter < 6) {
		tryAgainBtn.classList.remove('hide');
		checkAnswerBtn.classList.add('hide');
	} else if (dataOrderCounter === 6) {
		tryAgainBtn.classList.remove('hide');
		checkAnswerBtn.classList.add('hide');
	} else {
		document.querySelector('#questionpic').src = "";
		document.querySelector('.userAnswer').classList.add('hide');
		endGameBtn.classList.remove('hide');
		finalChallengeBtn.classList.remove('hide');
	}
}

function endGame() {
	alert("Game finished! Your score was " + gameScore + " brain points, and a stronger and smarter brain!");
	document.location.reload(true);
}


// event listeners with their associated actions & functions

vid.addEventListener("ended", showArrowBtn);
document.querySelector('.arrowBtn').addEventListener('click', showInstructions);
startGameBtn.addEventListener('click', startGame);

sameLevelBtn.addEventListener('click', function (){
	correct.classList.add('hide');
	incorrect.classList.add('hide');
	userAnswerEl.disabled = false;
	sameLevelBtn.classList.add('hide');
	harderLevelBtn.classList.add('hide');
	questionCounter = questionCounter + 1;
	document.querySelector('.userAnswer').value = "";
	displayQuestion(questions, questionCounter, "questionpic");
	skipBtn.classList.remove('hide');
	checkAnswerBtn.classList.remove('hide');
	changeImg(getImg(dataOrderCounter), srcMapCounter, 2);
	srcMapCounter = srcMapCounter + 1;
	updateScore(1);
});

harderLevelBtn.addEventListener('click', function (){
	correct.classList.add('hide');
	incorrect.classList.add('hide');userAnswerEl.disabled = false;
	sameLevelBtn.classList.add('hide');
	harderLevelBtn.classList.add('hide');
	questionCounter = questionCounter + 2;
	userAnswerEl.value = "";
	displayQuestion(questions, questionCounter, "questionpic");
	skipBtn.classList.remove('hide');
	checkAnswerBtn.classList.remove('hide');
	changeImg(getImg(dataOrderCounter), srcMapCounter, 3);
	srcMapCounter = srcMapCounter + 1;
	updateScore(2);
});

skipBtn.addEventListener('click', function (){
	document.querySelector('.questionhelp').innerText = "";
	userAnswerEl.value = "";
	userAnswerEl.disabled = false;
	if (dataOrderCounter < 6) {
		correct.classList.add('hide');
		incorrect.classList.add('hide');
		sameLevelBtn.classList.add('hide');
		harderLevelBtn.classList.add('hide');
		tryAgainBtn.classList.add('hide');
		questionCounter = questionCounter + 1;
		displayQuestion(questions, questionCounter, "questionpic");
		skipBtn.classList.remove('hide');
		checkAnswerBtn.classList.remove('hide');
		changeImg(getImg(dataOrderCounter), srcMapCounter, 1);
		srcMapCounter = srcMapCounter + 1;
	} else {
		document.querySelector('#questionpic').src = "";
		document.querySelector('.userAnswer').classList.add('hide');
		skipBtn.classList.add('hide');
		checkAnswerBtn.classList.add('hide');
		endGameBtn.classList.remove('hide');
		finalChallengeBtn.classList.remove('hide');
	}
});

tryAgainBtn.addEventListener('click', function(){
	correct.classList.add('hide');
	incorrect.classList.add('hide');
	userAnswerEl.disabled = false;
	userAnswerEl.value = "";
	tryAgainBtn.classList.add('hide');
	checkAnswerBtn.classList.remove('hide');
	updateScore(2);
});

checkAnswerBtn.addEventListener('click', setUserAnswer);
userAnswerEl.addEventListener('keydown', function(e) {
    if(e.which == 13) {
        setUserAnswer();
    }
});

endGameBtn.addEventListener('click', endGame);

finalChallengeBtn.addEventListener('click', function() {
	correct.classList.add('hide');
	incorrect.classList.add('hide');
	finalChallengeBtn.classList.add('hide');
	displayQuestion(questions, 14, "questionpic");
	updateScore(5);
});
