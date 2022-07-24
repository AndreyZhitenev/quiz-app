let quizData = [
	{
		question: "I spoke to __________.",
		a: "she",
		b: "her",
		correct: "b",
	},
	{
		question: "Where _______ you come from?",
		a: "do",
		b: "are",
		correct: "a",
	},
	{
		question: "What time does she ______ up?",
		a: "get",
		b: "gets",
		correct: "a",
	},
	{
		question: "Where _____ he live?",
		a: "do",
		b: "does",
		correct: "b",
	},
	{
		question: "I am not _____ this film.",
		a: "liking",
		b: "enjoying",
		correct: "b",
	},
	{
		question: "I am seeing her _____ three o'clock.",
		a: "in",
		b: "at",
		c: "on",
		correct: "b",
	},
	{
		question: "Easter is _____ March this year.",
		a: "on",
		b: "at",
		c: "in",
		correct: "c",
	},
	{
		question: "She's _____ work all day today.",
		a: "at",
		b: "on",
		correct: "a",
	},
	{
		question: "I go _____ by bus.",
		a: "home",
		b: "to home",
		correct: "a",
	},
	{
		question: "Do you like it?",
		a: "Yes, I like.",
		b: "Yes, I do.",
		correct: "b",
	},
	{
		question: "It's the second road _____ the left.",
		a: "in",
		b: "at",
		c: "on",
		correct: "c",
	},
	{
		question: "He's arriving _____ the station at six.",
		a: "at",
		b: "on",
		c: "to",
		correct: "a",
	},
	{
		question: "I _____ what she's saying.",
		a: "can't understand",
		b: "am not understanding",
		correct: "a",
	},
	{
		question: "She lives _____ London.",
		a: "on",
		b: "at",
		c: "in",
		correct: "c",
	},
	{
		question: "I'm going _____ the bank to get some cash.",
		a: "at",
		b: "to",
		correct: "b",
	},
	{
		question: "I went there _____ foot.",
		a: "in",
		b: "by",
		c: "at",
		d: "on",
		e: "to",
		correct: "d",
	},
	{
		question: "_____ is a cinema in the shopping center.",
		a: "There",
		b: "It",
		correct: "a",
	},
	{
		question: "I went _____ with my sister.",
		a: "their",
		b: "there",
		correct: "b",
	},
	{
		question: "She _____ as a doctor.",
		a: "is",
		b: "works",
		correct: "b",
	},
	{
		question: "She _____ a doctor.",
		a: "is",
		b: "works",
		correct: "a",
	},
	{
		question: "How _____ did your journey take?",
		a: "long",
		b: "long time",
		correct: "a",
	},
	{
		question: "He comes _____ the north of the country.",
		a: "to",
		b: "from",
		correct: "b",
	},
	{
		question: "She _____ goodbye.",
		a: "said",
		b: "told",
		c: "spoke",
		correct: "a",
	},
	{
		question: "They are _____ love.",
		a: "in",
		b: "on",
		c: "at",
		d: "to",
		e: "by",
		correct: "a",
	},
	{
		question: "You _____ drink and drive.",
		a: "may",
		b: "must",
		c: "may not",
		d: "must not",
		correct: "d",
	},
];

quizData = quizData.sort((a, b) => 0.5 - Math.random());

let answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const questionList = document.querySelector("ul");
const questionNumber = document.querySelector("span");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
	deselectAnswers();
	questionNumber.innerText = currentQuiz + 1;

	for (const key in quizData[currentQuiz]) {
		if (Object.hasOwnProperty.call(quizData[currentQuiz], key)) {
			const element = quizData[currentQuiz][key];
			if (key == "question") {
				questionEl.innerText = element;
			} else if (key !== "correct") {
				questionList.innerHTML += `
				<li>
					<input type="radio" id="${key}" name="answer" class="answer" /><label id="${key}_text" for="${key}"
						>${element}</label
					>
				</li>`;
			}
		}
	}

	answerEls = document.querySelectorAll(".answer");
}

function getSelected() {
	let answer = undefined;

	answerEls.forEach((answerEl) => {
		if (answerEl.checked) {
			answer = answerEl.id;
		}
	});
	console.log(answerEls);

	return answer;
}

function deselectAnswers() {
	answerEls.forEach((answerEl) => {
		answerEl.checked = false;
	});
}

submitBtn.addEventListener("click", () => {
	// check to see the answer
	const answer = getSelected();

	answerEls.forEach((answerEl) => {
		if (answerEl.id === quizData[currentQuiz].correct) {
			document.getElementById(`${answerEl.id}_text`).style.color = "green";
		} else {
			document.getElementById(`${answerEl.id}_text`).style.color = "red";
		}
	});

	setTimeout(() => {
		if (answer) {
			questionList.innerHTML = "";
			if (answer === quizData[currentQuiz].correct) {
				score++;
			}

			currentQuiz++;
			if (currentQuiz < quizData.length) {
				loadQuiz();
			} else {
				let result = parseInt((score / quizData.length) * 100);
				let howGood = null;
				if (result < 50) {
					howGood = "red";
				} else if (result >= 50 && result < 75) {
					howGood = "yellow";
				} else {
					howGood = "green";
				}
				quiz.innerHTML = `
			<h2 class="score">Your result is <span class="${howGood}">${result}%</span></h2>
			<p class="result">You answered correctly at ${score}/${quizData.length} questions.</p>
			<button onClick="location.reload()">Reload</button>`;
			}
		}
	}, 500);
});
