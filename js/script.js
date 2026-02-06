
const logicQuestions = [
{
  id: 1,
  question: "If 2 + 3 = 10, 3 + 4 = 21, then 4 + 5 = ?",
  options: ["30", "41", "32", "36"],
  correctAnswer: "36"
},
{
  id: 2,
  question: "Find the missing number: 2, 4, 8, 16, ?",
  options: ["18", "24", "32", "30"],
  correctAnswer: "32"
},
{
  id: 3,
  question: "If CAT = 24, DOG = 26, then BAT = ?",
  options: ["23", "25", "22", "24"],
  correctAnswer: "23"
},
{
  id: 4,
  question: "Which number is different from others?",
  options: ["2", "3", "5", "9"],
  correctAnswer: "9"
},
{
  id: 5,
  question: "Find the odd one out: Apple, Mango, Banana, Carrot",
  options: ["Apple", "Mango", "Banana", "Carrot"],
  correctAnswer: "Carrot"
},
{
  id: 6,
  question: "If yesterday was Monday, what day is tomorrow?",
  options: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
  correctAnswer: "Wednesday"
},
{
  id: 7,
  question: "What comes next: A, C, E, G, ?",
  options: ["H", "I", "J", "K"],
  correctAnswer: "I"
},
{
  id: 8,
  question: "If 5 machines take 5 minutes to make 5 items, how long for 100 machines to make 100 items?",
  options: ["5 min", "10 min", "100 min", "1 min"],
  correctAnswer: "5 min"
},
{
  id: 9,
  question: "Which number replaces the question mark: 3, 6, 9, 12, ?",
  options: ["14", "15", "16", "18"],
  correctAnswer: "15"
},
{
  id: 10,
  question: "Find the missing letter: B, D, F, H, ?",
  options: ["I", "J", "K", "L"],
  correctAnswer: "J"
},
{
  id: 11,
  question: "If you have 3 apples and take away 2, how many do you have?",
  options: ["1", "2", "3", "0"],
  correctAnswer: "2"
},
{
  id: 12,
  question: "Which one is not a prime number?",
  options: ["2", "3", "4", "5"],
  correctAnswer: "4"
},
{
  id: 13,
  question: "What comes next: 1, 4, 9, 16, ?",
  options: ["20", "25", "30", "36"],
  correctAnswer: "25"
},
{
  id: 14,
  question: "If ALL = 30 and BAT = 39, then CAT = ?",
  options: ["40", "42", "45", "48"],
  correctAnswer: "42"
},
{
  id: 15,
  question: "Which word is different?",
  options: ["Dog", "Cat", "Lion", "Car"],
  correctAnswer: "Car"
},
{
  id: 16,
  question: "Find the next number: 10, 20, 30, ?",
  options: ["35", "40", "50", "60"],
  correctAnswer: "40"
},
{
  id: 17,
  question: "Which is heavier: 1 kg cotton or 1 kg iron?",
  options: ["Cotton", "Iron", "Both equal", "None"],
  correctAnswer: "Both equal"
},
{
  id: 18,
  question: "If 1 = 3, 2 = 6, 3 = 9, then 4 = ?",
  options: ["10", "11", "12", "13"],
  correctAnswer: "12"
},
{
  id: 19,
  question: "What comes next: Z, X, V, T, ?",
  options: ["R", "Q", "P", "O"],
  correctAnswer: "R"
},
{
  id: 20,
  question: "If you divide 30 by half and add 10, what do you get?",
  options: ["25", "40", "50", "70"],
  correctAnswer: "70"
}
];


const qutionshow = document.getElementById('quiz-que-show');
const optionshow = document.querySelector('.quiz-card ul');
const quenumber = document.querySelector('.quiz-heading');
const quelist = document.querySelector('.question-list ul');
const numbercircle = document.querySelector('.number-circle');
const timerBox = document.getElementById('timer');
const quizSubmit = document.getElementById('quiz-submit');
const overlay = document.getElementById('resultOverlay');
const finalScore = document.getElementById('finalScore');
const closeBtn = document.getElementById('closeResult');

let currentque = 0;



// TIMER
var totalSeconds = logicQuestions.length * 60;
var timerInterval;

function startTimer() {

  clearInterval(timerInterval);

  timerInterval = setInterval(function () {

    var min = Math.floor(totalSeconds / 60);
    var sec = totalSeconds % 60;

    if (sec < 10) {
      sec = "0" + sec;
    }

    if (min < 10) {
      min = "0" + min;
    }

    timerBox.innerHTML = min + ":" + sec;

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      quizSubmit.click();
    }

    totalSeconds--;

  }, 1000);
}


// SHOW QUESTION
const nextquestion=(index)=>{

currentque=index;

qutionshow.textContent=logicQuestions[currentque].question;
quenumber.textContent="Question "+logicQuestions[currentque].id;

optionshow.innerHTML="";

logicQuestions[currentque].options.forEach(option=>{

let li=document.createElement('li');
let input=document.createElement('input');
let label=document.createElement('label');

input.type="radio";
input.name=currentque;
input.value=option;
input.checked=logicQuestions[currentque].yourans==option;

label.textContent=option;

li.appendChild(input);
li.appendChild(label);
optionshow.appendChild(li);

});

document.querySelectorAll('.quiz-card input').forEach(op=>{
op.addEventListener('change',(e)=>{
logicQuestions[e.target.name].yourans=e.target.value;
nextquestion(currentque);
});
});

// NUMBER BUTTONS
numbercircle.innerHTML="";

logicQuestions.forEach((q,i)=>{

let btn=document.createElement('button');
btn.classList.add('btn',q.yourans?'btn-success':'btn-danger');
btn.textContent=i+1;

btn.onclick=()=>nextquestion(i);

numbercircle.appendChild(btn);

});

document.querySelectorAll('.question-list li').forEach((li,i)=>{
li.classList.toggle('green',i===currentque);
});

}

// QUESTION LIST
logicQuestions.forEach((q,i)=>{
let li=document.createElement('li');
li.textContent="Question "+q.id;
li.onclick=()=>nextquestion(i);
quelist.appendChild(li);
});

// NAV
document.getElementById('next').onclick=()=>{
if(currentque<logicQuestions.length-1)
nextquestion(currentque+1);
}

document.getElementById('prev').onclick=()=>{
if(currentque>0)
nextquestion(currentque-1);
}

// SUBMIT
quizSubmit.addEventListener('click',()=>{

let score=0;

logicQuestions.forEach(q=>{
if(q.correctAnswer===q.yourans) score++;
});

finalScore.textContent=`${score} / ${logicQuestions.length}`;
overlay.classList.add('active');

});

// CLOSE + RESET
closeBtn.addEventListener('click',()=>{

overlay.classList.remove('active');

logicQuestions.forEach(q=>delete q.yourans);

currentque=0;
totalSeconds=logicQuestions.length*60;

nextquestion(0);
startTimer();

});

// INIT
nextquestion(0);
startTimer();
