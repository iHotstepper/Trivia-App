<template>
    <v-col>
    <br>
        <v-img :src="myLogo" width="270" contain aspect-ratio="2"></v-img>
        <div class="mt-3">
            <p class="text-h6 indigo--text mt-5">Welcome to my quiz app.</p> 
            <p class="text-body-1 indigo--text text--lighten-2" color="indigo lighten-2">Before starting a new game, enter your name<br>and desired settings. <strong>Have Fun!</strong></p> 
        </div>
        <v-form 
            style="max-width: 280px;"
            ref="form"
            v-model="valid"
            class="mt-8"
            >
            <v-text-field
                v-model="newGamePref.playerName"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
                solo
                rounded
                class="text-field-color"
            ></v-text-field>
            <v-select
                v-model="newGamePref.difficulty"
                item-text="difficulty"
                item-value="value"
                :items="selectDifficulty"
                :rules="[v => !!v || 'Difficulty is required']"
                label="Select difficulty"
                required
                solo
                rounded
                color="#323D9B"
            ></v-select>
            <v-select
                v-model="newGamePref.category"
                item-text="category"
                item-value="value"
                :items="selectCategory"
                :rules="[v => !!v || 'Category is required']"
                label="Select category"
                required
                solo
                rounded
                color="#323D9B"
            ></v-select>
            <br>    
            <v-btn
                :disabled="!valid"
                color="#5EEAA1"
                large
                rounded
                class="white--text"
                @click="newGame"
                style="width: 160px"
            > New Game </v-btn>
        </v-form>
        <br>
        <br>
    </v-col>
</template>

<script>

export default {
    
    data () {
        return {
            myLogo: require('../assets/trivia-logo.svg'),
            newGamePref: {
                numberOfQuestions: '10',
                category: '',
                difficulty: '',
                playerName: '',
            },
            
            valid: true,

            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            // selectQuestions: ['3', '10', '20'],

            selectCategory: [
                { category: "General Knowledge", value: "9" },
                { category: "Science & Nature", value: "17" },
                { category: "Sports", value: "21" },
                { category: "History", value: "23" },
                { category: "Animals", value: "27" },
            ],
            
            selectDifficulty: [
                { difficulty: 'Easy', value: 'easy' },
                { difficulty: 'Medium', value: 'medium' },
                { difficulty: 'Hard', value: 'hard' }
            ]

        
        }
    },
    
    methods: {
    newGame() {

            if (this.newGamePref.playerName) {
            this.$emit('newGame', this.newGamePref);
            } else {
            const isValid = this.$refs.nameValid
            isValid.innerText = "Please enter a name"
            }
        }
    }
}
</script>

<style scoped>
.new-game-button {
    width: 150px;
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
</style>




