<template>
  <div style="border:1px solid #dedbdb; margin: 0px 0; padding: 0;">
  <v-data-table
          :headers="headers"
          :items="matches"
          :search="searchStr"
          :loading="matches.length <= 1"
          loading-text="Loading... Please wait"
          class="_back"
        >
          <template v-slot:item.first="{ item }">
            <img v-bind:src="getTeamLogo(item.homeTeam.id)" alt="" width="30" height="30" style="border-radius: 50%; float:left; margin: 0 10px">
            <div style="display:inline-block;padding-top: 5px">{{ item.homeTeam.name }}</div>
          </template>
    <template v-slot:item.score="{ item }">
      <span style="font-size: 25px;color:grey">{{ scoreSum(item.score) }}</span>
    </template>

          <template v-slot:item.second="{ item }">
            <img v-bind:src="getTeamLogo(item.awayTeam.id)" alt="" width="30" height="30" style="border-radius: 50%; float:left; margin: 0 10px">
            <div style="display:inline-block;padding-top: 5px">{{ item.awayTeam.name }}</div>
          </template>
    <template v-slot:item.status="{ item }" >
      <div style="text-align: center">
        {{ item.status }} <br>
        <small style="color: grey">{{item.utcDate}}</small>
      </div>

          </template>

        </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import Players from './Players.vue';
import { MatchInterface } from '../shared/interfaces/api/match.interface';
import { ScoreInterface } from '../shared/interfaces/api/score.interface';
import { Getter } from 'vuex-class';
import { TeamInterface } from '../shared/interfaces/api/team.interface';

const namespace: string = 'team';
@Component({
    components: { Players }
})
export default class Matches extends Vue {
    @Prop() matches!: MatchInterface[];
    @Getter('getTeamById', { namespace }) public getTeamById!: (id: number) => TeamInterface;

    public searchStr: string = '';
    public headers: DataTableHeader[] = [
        { text: 'Group', value: 'group' },
        { text: 'homeTeam', value: 'first' },
        { text: 'awayTeam', value: 'second' },
        { text: '', value: 'score' },
        { text: '', value: 'status' }
    ];

    public getTeamLogo(teamId: number): string {
        const team: TeamInterface = this.getTeamById(teamId);
        return team?.crestUrl || '/ball.jpg';
    }

    public scoreSum(s: ScoreInterface): string {
        const homeTeamSum = s.fullTime.homeTeam + s.halfTime.homeTeam + s.extraTime.homeTeam + s.penalties.homeTeam;
        const awayTeamSum = s.fullTime.awayTeam + s.halfTime.awayTeam + s.extraTime.awayTeam + s.penalties.awayTeam;
        return `${homeTeamSum}:${awayTeamSum}`;
    }
}
</script>

<style scoped lang="scss">

</style>
