<template>
    <v-col style="min-height: 600px">
        <v-row>
            <v-col class="question-area-bg ma-3 rounded-lg">
            <p class="text-left text-h6 font-weight-medium pa-6 indigo--text" v-html="questionText"></p>
            </v-col>
        </v-row>
        <br>
        <br>
        <v-row class="flex-column col-12">
                <v-btn v-for="(answer, index) in answersArray" :key='index'
                    @click="checkAnswer(answer, $event)"
                    v-html="answer" 
                    color="white"
                    x-large
                    rounded
                    class="subtitle-1 font-weight-medium mb-6 nouppercase indigo--text"
                    ref="answeritem"
                ></v-btn> 
        </v-row>        
    </v-col>
</template>

<script>

export default {

    props: ['questionObject'],

    data () {
        return {
        answersArray: [],
        isCorrect: '',
        correctAnswer: false,
        wrongAnswer: false,
        questionText: ''
        }
    },

    watch: {
        questionObject: {
        immediate: true,   
        handler () {
        // Shuffle the answers, assign correct answer to isCorrect, return the question
        this.answersArray = this.shuffle(this.questionObject.incorrect_answers);
        this.isCorrect = this.questionObject.correct_answer;
        this.questionText = this.questionObject.question  
        }
        }
    },

     methods: {

        checkAnswer(answer, event) {
        event.target.parentElement.style.pointerEvents = 'none'
        const answerList = this.$refs.answeritem
        const correct = this.isCorrect
        if(answer == correct) {
            
            event.target.classList.add("correct-answer")
            this.$emit('onSuccess');

        } else {

            event.target.classList.add("wrong-answer");

            answerList.forEach(function(myanswer) {
                if(myanswer.$refs.link.innerHTML === correct) {
                myanswer.$refs.link.classList.add("correct-answer")
                }
            })
        }
        
        setTimeout(() => {

            answerList.forEach((answer) => {
                answer.$refs.link.classList.remove("correct-answer", "wrong-answer")
            })

            event.target.parentElement.style.pointerEvents = 'all'

            this.$emit('showNext');

        }, 1800);
        
        },

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
  }

}

</script>

<style scoped>




.list-group{
    font-size: 1.5em;
    font-weight: 400;
}

ul {
    list-style-type: none;
}

.list-group-item{
    cursor: pointer;
}
.answer-item:hover{
  background-color: #F0F0F0; 
}

.answer-item {
    margin-top: 15px;
    padding: 10px;
    font-size: 1em;
}

h6 {
    font-size: 1.1em;
}

h3 {
    font-size: 2.1em;

}

.wrong-answer {
    background-color: #FDABD7 !important;
    color: white !important;
}

.correct-answer {
    background-color: #5EEAA1 !important;
    color: white !important;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}
.nouppercase {
    text-transform: none !important;
    /* border-style: solid  !important;
    border-width: 1px  !important;
    border-color: #333B97  !important; */
}
.question-area-bg{
    background-color: #F3F5FF;
}
</style>>
