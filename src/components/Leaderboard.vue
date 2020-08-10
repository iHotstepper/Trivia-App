<template>
<v-col class="ma-6">
        <v-img :src="myLogo" width="170" contain aspect-ratio="2"></v-img>
        <br>
        <br>
        <p class="text-center font-weight-bold text-h4 indigo--text">LEADERBOARD</p>
        <v-row>
            <v-col>
            <v-data-table
            :headers="headers"
            :items="itemsWithIndex"
            class="elevation-1"
            align-center
            hide-default-footer
            disable-sort
            mobile-breakpoint='0'
        ></v-data-table>
 
            </v-col>
        </v-row>
            <br>
        <v-btn
            color="#5EEAA1"
            large
            rounded
            class="white--text mt-2"
            @click="showWelcome"
            style="width: 160px"
        > New Game </v-btn>
</v-col>
</template>

<script>

export default {

    props: ['leaderboardData', 'newGameData', 'playerScore'],

    data () {
        return {

            myLogo: require('../assets/trivia-logo.svg'),
            
            headers: [
            {
                text: '#',
                align: 'start',
                sortable: false,
                value: 'index',
            },
                { text: 'Player Name', value: 'playername' },
                { text: 'Score', value: 'score' },
            ],
            }
    },
    computed: {
        itemsWithIndex() {
            return this.leaderboardData.map(
            (items, index) => ({
                ...items,
                index: index + 1
            }))
        }
    },
    methods: {
        showWelcome() {
            this.$emit('showWelcome');
        }
    }
}
</script>



<style scoped>

.v-data-table--dense.not-so-dense td {
height: 10px;
}

</style>