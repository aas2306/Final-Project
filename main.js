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

var gameScore = 0;

var questionPicSrc = document.querySelector('#questionpic').src;




function updateScore(increment) {
	gameScore = gameScore + increment;
	document.getElementById('gameScore').innerText = gameScore;
}


var questions = [
	{
		questionpic: "./media/questionpics/q1.png",
		answer: "10",
		help: "Make sure to count ALL the tally marks!"
	},
	{
		questionpic: "./media/questionpics/q2.png",
		answer: "4",
		help: "What can you add to 1 to make a total of 5?"
	},
	{
		questionpic: "./media/questionpics/q3.png",
		answer: "12",
		help: "Count the stars carefully, you can do it!"
	},
	{
		questionpic: "./media/questionpics/q4.png",
		answer: "17",
		help: "Make sure to count ALL the tally marks!"
	},
	{
		questionpic: "./media/questionpics/q5.png",
		answer: "6",
		help: "Are you missing any sides?"
	},
	{
		questionpic: "./media/questionpics/q6.png",
		answer: "6",
		help: "Count the stars carefully, you can do it!"
	},
	{
		questionpic: "./media/questionpics/q7.png",
		answer: "12",
		help: "Take it one step at a time!"
	},
	{
		questionpic: "./media/questionpics/q8.png",
		answer: "10",
		help: "Can you figure out what the watermelons are equal to first?"
	},
	{
		questionpic: "./media/questionpics/q9.png",
		answer: "18",
		help: "What's the pattern before you get to the last space?"
	},
	{
		questionpic: "./media/questionpics/q10.png",
		answer: "13",
		help: "Count carefully, don't give up!"
	},
	{
		questionpic: "./media/questionpics/q11.png",
		answer: "8",
		help: "Are you missing any sides? Count carefully!"
	},
	{
		questionpic: "./media/questionpics/q12.png",
		answer: "23",
		help: "Count carefully, don't give up!"
	},
	{
		questionpic: "./media/questionpics/q13.png",
		answer: "40",
		help: "What's the pattern before you get to the last space?"
	},
	{
		questionpic: "./media/questionpics/q14.png",
		answer: "17",
		help: "Can you figure out what each fruit is equal to?"
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

// get image from data-order number
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

vid.addEventListener("ended", showArrowBtn);
document.querySelector('.arrowBtn').addEventListener('click', showInstructions);
startGameBtn.addEventListener('click', startGame);



function displayQuestion(questionsArray, questionCount, questionpic) {
	questionPicSrc = questionsArray[questionCount][questionpic];
	document.querySelector('#questionpic').src = questionPicSrc;
	// template.content.querySelector('.questionpic').innerHTML = questionsArray[questionCount][questionpic];
	// var clone = document.importNode(template.content, true);
	// document.querySelector('.templateInput').appendChild(clone);
	dataOrderCounter = dataOrderCounter + 1;
}

function displayHelp(questionsArray, questionCount) {
	// console.log("TEST: ", questionsArray[questionCount]['help']);
	// console.log(questionsArray, questionsArray[questionCount], questionsArray[questionCount]['help']);
	// template.content.querySelector('.questionhelp').innerHTML = questionsArray[questionCount].help;
	document.querySelector('.questionhelp').innerHTML =  questionsArray[questionCount].help;
	// var x = document.importNode(template.content, true);
	// document.querySelector('.templateInput').appendChild(x);
}

// function hideQuestion() {
// 	alert('hideQuestion');
// 	document.querySelector('.userAnswer').value = "";
// 	document.querySelector('.templateInput').innerHTML = "";
// 	// document.querySelector('.templateInput').removeChild(document.querySelector('.questionpic'));
// }

sameLevelBtn.addEventListener('click', function (){
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
	userAnswerEl.disabled = false;
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
	hideHelp();
	userAnswerEl.value = "";
	userAnswerEl.disabled = false;
	if (dataOrderCounter < 6) {
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
		document.querySelector('.userAnswer').classList.add('hide');
		skipBtn.classList.add('hide');
		checkAnswerBtn.classList.add('hide');
		endGameBtn.classList.remove('hide');
		finalChallengeBtn.classList.remove('hide');
	}
});

function hideHelp() {
	document.querySelector('.questionhelp').innerText = "";
}

tryAgainBtn.addEventListener('click', function(){
	userAnswerEl.disabled = false;
	userAnswerEl.value = "";
	tryAgainBtn.classList.add('hide');
	checkAnswerBtn.classList.remove('hide');
	updateScore(3);
});

checkAnswerBtn.addEventListener('click', setUserAnswer);
userAnswerEl.addEventListener('keydown', function(e) {
    if(e.which == 13) {
        setUserAnswer();
    }
});

function setUserAnswer(){
	userAnswer = userAnswerEl.value;
	checkAnswer(userAnswer, questionCounter);
}

// how can we make this flexible for all the questions?
function checkAnswer(userAns, questionNumber) {
	hideHelp();
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
		displayHelp(questions, questionCounter);
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
	alert("Game finished. Your score was: " + gameScore);
	document.location.reload(true);
}

endGameBtn.addEventListener('click', endGame);

finalChallengeBtn.addEventListener('click', function() {
	finalChallengeBtn.classList.add('hide');
	displayQuestion(questions, 14, "questionpic");
	// something that ends game

	updateScore(5);
});
