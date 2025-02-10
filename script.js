const questions = [
    {
        question: "When is Harry Potter's Birthday?",
        answers: [
            {text: "July 31st", correct: true},
            {text: "September 2nd", correct: false},
            {text: "July 4th", correct: false},
            {text: "December 31st", correct: false}
        ]
    },
    {
        question: "Hagrid is forbidden to practise magic, but Harry suspects he's kept his wand - disguised as what?",
        answers: [
            {text: "A mop", correct: false},
            {text: "A walking stick", correct: false},
            {text: "An umbrella", correct: true},
            {text: "A fishing rod", correct: false}
        ]
    },
    {
        question: "Which Harry Potter word is now in the Oxford English Dictionary?",
        answers: [
            {text: "Hogwarts", correct: false},
            {text: "Voldemort", correct: false},
            {text: "Horcrux", correct: false},
            {text: "Muggle", correct: true}
        ]
    },
    {
        question: "Which of the following does Harry NOT use as a method of transport?",
        answers: [
            {text: "Flying Car", correct: false},
            {text: "An Owl", correct: true},
            {text: "Broomstick", correct: false},
            {text: "Hearth Fire", correct: false}
        ]
    },
    {
        question: "In Harry Potter and the Goblet of Fire, what colour sparks does Harry send up to signal he's found an unconscious Fleur Delacour?",
        answers: [
            {text: "Red", correct: true},
            {text: "Yellow", correct: false},
            {text: "Green", correct: false},
            {text: "Blue", correct: false}
        ]
    },
    {
        question: "In Harry Potter and the Deathly Hallows - Part 2, what spell does Professor McGonagall use to bring the Hogwarts statues to life?",
        answers: [
            {text: "Piertotum Locomotor", correct: true},
            {text: "Protego Maxima", correct: false},
            {text: "Wingardium Leviosa", correct: false},
            {text: "Expelliarmus", correct: false}
        ]
    },
    {
        question: "In Harry Potter and the Order of the Pheonix, what colour is Tonks' hair when she first appears on-screen?",
        answers: [
            {text: "Blue", correct: false},
            {text: "Purple", correct: false},
            {text: "Red", correct: false},
            {text: "Pink", correct: true}
        ]
    },
    {
        question: "True or False: In Harry Potter and the Goblet of Fire, the audience can hear the mermaids sing during the second task?",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true},
        ]
    },
    {
        question: "In Harry Potter and the Half-Blood Prince, who is the first character to raise their wand after Dumbledore’s death to honour him?",
        answers: [
            {text: "Professor McGonagall", correct: true},
            {text: "Hagrid", correct: false},
            {text: "Hermoine Granger", correct: false},
            {text: "Harry Potter", correct: false}
        ]
    },
    {
        question: "Which real-life family member of Tom Felton (Draco) appeared in Harry Potter and the Half-Blood Prince?",
        answers: [
            {text: "His father as a Death Eater", correct: false},
            {text: "His mother as Narcissa Malfoy's double", correct: false},
            {text: "His brother as a Hogwarts student", correct: true},
            {text: "His cousin as a young Draco in flashbacks", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); // Fixed this typo
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block"; // Fixed this line
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
};

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz()
    }
});

startQuiz();