<template>
    <div class="ma-6" style="width: 400px">
        <v-img :src="myLogo" width="170" contain aspect-ratio="2"></v-img>
        <!-- <p class="text-center text-h4 indigo--text mt-10">{{ newGameData.playerName }},</p> -->
        <br>
        <br>
        <p class="text-center text-h4 font-weight-bold indigo--text">{{ newGameData.playerName }},</p>
        <p class="text-center text-body-1 indigo--text">you answered <strong>{{ playerScore }}</strong> out of <strong>{{ newGameData.numberOfQuestions }}</strong> questions right.<br>for a total score of</p>
        <br>
        <v-progress-circular
        :rotate="-90"
        :size="180"
        :width="10"
        :value="counter"
        color="#FDABD7"
        class="text-h2 font-weight-medium indigo--text"
        >
        {{ playerScore * 10 }}
        </v-progress-circular>
        <br>
        <v-btn
        color="#5EEAA1"
        large
        rounded
        class="white--text mt-12"
        @click="showWelcome"
        style="width: 160px"
        > New Game </v-btn>
        <br>    
        <v-btn
        color="white"
        large
        rounded
        class="subtitle-1 font-weight-medium mt-6 indigo--text"
        @click="showLeaderboard"
        style="width: 160px"
        > Leaderboard </v-btn>
        <br>
        <br>
    </div>
</template>

<script>

export default {

    props: ['newGameData', 'playerScore'],

    data () {
        return {
            myLogo: require('../assets/trivia-logo.svg'),
            interval: {},
            counter: 0
        }
    },
    
    methods: {
        getClassRow(playername) {
            if(playername === this.newGameData.playerName) {
                return 'checkName'
            }
        },
        showWelcome() {
            this.$emit('showWelcome');
        },
        showLeaderboard() {
            this.$emit('leaderboard');
        }
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.counter < this.playerScore * 10) {
           this.counter += 10
        } else {
           clearInterval()
        }
      }, 100)
    },
    

}
</script>



<style scoped>
.mark-player-name {
    background-color: lightblue;
}
.checkName {
    background-color: lightblue;
}

</style>