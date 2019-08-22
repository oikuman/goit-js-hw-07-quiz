import quiz from "./quiz-data.js";

let submitFunction = () => {
    event.preventDefault();
    console.log("form submitted");
    checkAnswers();
};

let answers = {};

const form = document.querySelector("#form");
form.classList.add("form-class");
const btn = document.querySelector("#btn");
form.addEventListener("submit", submitFunction);

console.log(quiz.title);
const quizTitle = document.createElement("h2");
quizTitle.textContent = quiz.title;
btn.before(quizTitle);

let i = 1;

for (const quizQuestion of quiz.questions) {
    //question
    let answer = `${i}`;
    answers[answer] = false;

    const section = document.createElement("section");
    section.classList.add("form-section");
    const title = document.createElement("h3");

    title.textContent = `${i}. ` + quizQuestion.question;

    const list = document.createElement("ol");
    list.setAttribute("id", `list${i}`);
    console.log(quizQuestion.question);

    let j = 1;

    for (const choice of quizQuestion.choices) {
        console.log(choice);

        const item = document.createElement("li");
        const label = document.createElement("label");
        label.textContent = `${choice}`;
        const input = document.createElement("input");

        input.setAttribute("type", "radio");
        const name = "choice" + i;
        const value = j;
        input.setAttribute("name", name);
        input.setAttribute("value", value);

        label.prepend(input);
        item.appendChild(label);
        list.appendChild(item);

        j += 1;
    }
    i += 1;
    section.appendChild(title);
    section.append(list);
    btn.before(section);

    console.log(quizQuestion.answer);
}

console.log(answers);

i = 1;

let checkAnswers = () => {
    
    for (const quizQuestion of quiz.questions) {
        let choices = document.getElementsByName(`choice${i}`);
        let answerProvided;

        for (const item of choices) {
            if (item.checked) {
                answerProvided = item.value;
                break;
            }
        }

        if (Number(answerProvided) === quizQuestion.answer + 1) {
            answers[`${i}`] = true;
        }

        i += 1;
    }

    console.log(answers);
    let result = 0;
    
    for (const answer of Object.values(answers)) {
        if (answer) {
            result += 1;
        }
    }

    const percent = (result/Object.values(answers).length*100).toFixed(1);
    let resMessage;
    if (percent>80) {
        resMessage = "Test passed!"
    } else {
        resMessage = "Test missed..."
    }
    alert(`Your result is ${percent}%. ${resMessage}`);
};
