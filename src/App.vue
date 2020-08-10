<template>
  <v-app>
    <v-main style="background-color: #DEEDFF">
      <v-container class="fill-height" style="max-width: 450px;">
        <v-col cols="12" align="center" justify="center">
            <v-row align="center" justify="center" class="white elevation-6 rounded-xl mb-12"> 
                <app-welcome v-on:newGame="setNewGame($event)" v-if="showWelcome"></app-welcome>
                  <v-col v-if="showQuestion">
                        <p class="text-body-2 font-weight-bold pt-3 indigo--text text--lighten-2">QUESTION {{ currentIndex + 1 }} / {{ questionsArray.length }}</p>
                        <app-questions v-bind:questionObject="questionsArray[currentIndex]" v-on:onSuccess="updateScore()" v-on:showNext="nextQuestion()"></app-questions>
                  </v-col>
                <app-gameover v-bind:newGameData="newGameData" v-bind:playerScore="score" v-if="showGameover" v-on:showWelcome="setUpNewGame()" v-on:leaderboard="getLeaderboard()"></app-gameover>
                <app-leaderboard v-bind:leaderboardData="leaderboard" v-bind:newGameData="newGameData" v-bind:playerScore="score" v-on:showWelcome="setUpNewGame()" v-if="showLeaderboard"></app-leaderboard>
            </v-row>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import axios from 'axios';
import Welcome from './components/Welcome'
import Questions from './components/Questions'
import Leaderboard from './components/Leaderboard'
import Gameover from './components/Gameover'
import db from './firebase/init'

export default {
  data () {

    return {

      newGameData: {},
      questionsArray: [],
      showWelcome: true,
      showQuestion: false,
      showGameover: false,
      showLeaderboard: false,
      currentIndex: 0,
      score: 0,
      leaderboard: []

 
    }
  },

  components: {
    'app-questions': Questions,
    'app-welcome': Welcome,
    'app-leaderboard': Leaderboard,
    'app-gameover': Gameover
  },

  methods: {

    setNewGame(data) {
      // Get game preferences from user
      this.newGameData = data;
      this.currentIndex = 0;
      // Get a new set of questions from the API
      // axios.get(`https://opentdb.com/api.php?amount=${this.newGameData.numberOfQuestions}&category=${this.newGameData.category}&difficulty=${this.newGameData.difficulty}&type=multiple`)
      axios.get(`https://opentdb.com/api.php?amount=10&category=${this.newGameData.category}&difficulty=${this.newGameData.difficulty}&type=multiple`)
      .then(res => {
          const data = res.data;
          const questions = data.results;
          questions.forEach(sortFunc)
            function sortFunc(e) {
              e.incorrect_answers.push(e.correct_answer);
            }
            this.questionsArray = questions;
            this.showWelcome = false
            this.showQuestion = true;
          }).catch(error => console.log(error))
      
    },
    
    nextQuestion () {
      // Set next question
      if (this.currentIndex <= this.questionsArray.length - 2) {
        this.currentIndex ++;
      } else {
        this.gameOver()
      }

    },

    setUpNewGame () {
      this.showGameover = false
      this.showLeaderboard = false
      this.score = 0
      this.showWelcome = true
    },

    updateScore () {
      this.score += 1;
    },

    gameOver () {
      // Destroy the instance, add player data to the db
      this.showQuestion = false;
      this.showGameover = true;

      db.collection('leaderboard').add({
          playername: this.newGameData.playerName,
          numberOfQuestions: this.questionsArray.length,
          score: this.score * 10
      });
      // this.getLeaderboard()
    },

    getLeaderboard () {
        this.showGameover = false;
        this.showLeaderboard = true;

        let data = db.collection('leaderboard');
        data.orderBy("score", "desc").limit(10).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let score = doc.data()
                score.id = doc.id
                this.leaderboard.push(score)
            })
        })
    }

  }
}
</script>


<style>
body{
    background: #f3f5f9;
    font-size: 0.8em;
}

.app-card {
    height: 600px !important;
}

.questionNumber{
    font-weight: 600 !important;
    color: gray;
}

.score {
    font-weight: 600 !important;
    color: gray;
}

h1 {
  color: #031b4e;
}

h3 {
  color: #031b4e;
}

.container-bg {
    background-color: #DEEDFF;
}

</style>
