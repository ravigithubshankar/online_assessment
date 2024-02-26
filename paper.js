
let index = 0;
let score = 0;
let timer;

const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { id: 1, text: "Shark", correct: false, qno: 1, },
            { id: 2, text: "blue whale", correct: true, qno: 1 },
            { id: 3, text: "Elephant", correct: false, qno: 1 },
            { id: 4, text: "Giraffe", correct: false, qno: 1 },
        ],
    },
    {
        question: "Which is largest animal in the world?",
        answers: [
            { id: 1, text: "Shark", correct: true, qno: 2 },
            { id: 2, text: "blue whale", correct: false, qno: 2 },
            { id: 3, text: "Elephant", correct: false, qno: 2 },
            { id: 4, text: "Giraffe", correct: false, qno: 2 },
        ],
    },
    {
        question: "Which is largest animal in the world?",
        answers: [
            { id: 1, text: "Shark", correct: false, qno: 3 },
            { id: 2, text: "blue whale", correct: true, qno: 3 },
            { id: 3, text: "Elephant", correct: false, qno: 3 },
            { id: 4, text: "Giraffe", correct: false, qno: 3 },
        ],
    },
    {
        question: "Which is largest animal in the world?",
        answers: [
            { id: 1, text: "Shark", correct: false, qno: 4 },
            { id: 2, text: "blue whale", correct: true, qno: 4 },
            { id: 3, text: "Elephant", correct: false, qno: 4 },
            { id: 4, text: "Giraffe", correct: false, qno: 4 },
        ],
    },
    {
        question: "Which is largest animal in the world?",
        answers: [
            { id: 1, text: "Shark", correct: false, qno: 5 },
            { id: 2, text: "blue whale", correct: true, qno: 5 },
            { id: 3, text: "Elephant", correct: false, qno: 5 },
            { id: 4, text: "Giraffe", correct: false, qno: 5 },
        ],
    },
];


const questionElement = document.getElementById("questionEle");
const radioButtons = document.getElementById("radioButtons");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const numBox = document.getElementById("num_box");
const changeElementRoot = document.getElementById("display_non");

//let index = 0;
//let score = 0;




function startTimer() {
    timer = setInterval(function () {
        document.getElementById("timer").innerText = `Time left: ${timeInSeconds} seconds`;
        timeInSeconds--;

        if (timeInSeconds < 0) {
            clearInterval(timer);
            showScore();
        }
    }, 1000);
}


function stopTimer() {
    clearInterval(timer);
}


function startQuiz() {
    index = 0;
    score = 0;
    timeInSeconds = 120; // Set the total time in seconds
    startTimer();
    nextButton.innerHTML = "Next";
    showQuestion();
}



function showQuestion() {
    resetState();
    let currentQuestion = questions[index];
    let questionNo = index + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionElement.classList.add('question');
    currentQuestion.answers.forEach(answer => {
        let label = document.createElement("label");
        label.innerText = answer.text;
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "colour";
        input.id = answer.text;
        // input.dataset.correct = questionNo;
        input.dataset.qno = answer.qno;
        input.dataset.id = answer.id;
        label.setAttribute('for', input.id)
        radioButtons.appendChild(input)
        radioButtons.appendChild(label);
        if (answer.correct) {
            input.dataset.correct = answer.correct;
        }
        input.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    // nextButton.style.display = "none";
    while (radioButtons.firstChild) {
        radioButtons.removeChild(radioButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    let id = selectedBtn.getAttribute("id");
    let check = selectedBtn.dataset.qno;
    let ansid = selectedBtn.dataset.id;
    // alert(ansid);
    // ans_obj.id = ansid;
    if (document.getElementById(id).checked) {
        numBox.childNodes[check - 1].classList.add('color_change');
    }
    console.log(selectedBtn);
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        score++;
    }

}

function handleNextButton() {
    index++;
    if (index < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function handlePrevButton() {
    index--;
    if (index < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (index < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

prevButton.addEventListener("click", () => {
    if (index < questions.length) {
        handlePrevButton();
    }
    else {
        startQuiz();
    }
})


function showScore() {
    stopTimer();
    resetState();
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    document.getElementById("questionState").style.display = "none";
    document.getElementById("display_non").style.display = "block";
    resultElement.style.display = "block";
}



function btn() {
    var i = 1;
    for (i; i <= questions.length; i++) {
        let btn1 = document.createElement("button");
        btn1.innerHTML = i;
        btn1.type = "button";
        btn1.classList.add("btn");
        btn1.id = i;
        btn1.value = i;
        numBox.appendChild(btn1);
        btn1.addEventListener("click", showquestion);
    }
}

function showquestion(e) {
    let target1 = e.target;
    // console.log(target1);
    let id = target1.getAttribute('id');
    index = id - 1;
    showQuestion()

}
btn();
startQuiz();


function openNav() {
    document.getElementById("questionState").style.display = "block";
    document.getElementById("display_non").style.display = "none";
}

function closeNav() {
    document.getElementById("questionState").style.display = "none";
    document.getElementById("display_non").style.display = "block";
}

