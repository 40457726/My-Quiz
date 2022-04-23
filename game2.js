const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
    question: 'What is Melissas middle name(s)?',
    choice1: 'Rosalind Margaret',
    choice2: 'Rosalind Helen',
    choice3: 'Rosalind',
    choice4: 'Helen',
    answer: 1,
    },

    {
    question: 'What age is Melissa?',
    choice1: '18',
    choice2: '22',
    choice3: '27',
    choice4: '29',
    answer: 3,
    },

    {
    question: 'What is her date of birth?',
    choice1: 'November 19th',
    choice2: 'December 24th',
    choice3: 'November 24th',
    choice4: 'March 8th',
    answer: 3,
    },

    {
    question: 'What star sign does this make her?',
    choice1: 'Scorpio',
    choice2: 'Sagittarius',
    choice3: 'Pisces',
    choice4: 'Capricorn',
    answer: 2,
    },

    {
    question: 'What is her moon and rising sign?',
    choice1: 'Taurus moon, gemini rising',
    choice2: 'Libra moon, aries rising',
    choice3: 'Leo moon, cancer rising',
    choice4: 'Sagittarius moon, leo rising',
    answer: 3,
    },

    {
    question: 'If she could choose anything in this world, what would it be?',
    choice1: 'Unlimited pizza',
    choice2: 'Unlimited travel',
    choice3: 'World peace and equality for all',
    choice4: 'Happiness',
    answer: 3,
    },

    {
    question: 'If she could have any job in the world, what would it be?',
    choice1: 'Office worker',
    choice2: 'Travel blogger',
    choice3: 'Full-time activist',
    choice4: 'Surfer',
    answer: 3,
    },

    {
    question: 'What is her favourite genre of music?',
    choice1: 'Heavy metal',
    choice2: 'Rock',
    choice3: 'R&B',
    choice4: 'Country',
    answer: 3,
    },

    {
    question: 'What is her favourite thing to do?',
    choice1: 'Travel',
    choice2: 'Eat food',
    choice3: 'Watch movies',
    choice4: 'Climb mountains',
    answer: 1,
    },

    {
    question: 'What would she prefer?',
    choice1: 'To line dance under the moonlight',
    choice2: 'Catch flights not feelings',
    choice3: 'Win a gymnastics competition',
    choice4: 'Grow her hair so long she can tie it to her ankles',
    answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()