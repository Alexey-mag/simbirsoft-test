<template>
    <v-container>
      <v-content v-if="getLoaderTeams">
      <v-row>
        <v-col cols="12" style="position:relative; border:1px #ddd8d8 solid; border-radius: 5px; margin: 5px 0; padding: 10px 15px;">
          <h1>
            {{ team.name }}
          </h1>
          <b>ShortName:</b> {{ team.shortName }} <br>
          <b>Address:</b> {{ team.address }} <br>
          <b>Phone:</b> {{ team.phone }} <br>
          <b>Website:</b>{{ team.website }} <br>
          <b>Email:</b>{{ team.email }} <br>
          <div  style="position:absolute; top:3px; right:10px; z-index: 500">
            <select-year :years="matchesByYear" :year="this.$route.query.year || null"></select-year>
          </div>
        </v-col>
        <v-tabs>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Players
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-star
            </v-icon>
            Matches
          </v-tab>

          <v-tab-item>
            <players v-bind:players="team && team.squad || []"></players>
          </v-tab-item>
          <v-tab-item>
            <matches v-bind:matches="team.matches || []"></matches>
          </v-tab-item>
        </v-tabs>
      </v-row>
      </v-content>
      <v-content app  v-else style="background-color: #62b849; text-align: center">
        <v-img src="/loader.gif" width="400" style="margin: auto"/>
        <span style="color: white">loading ...</span>
      </v-content>
    </v-container>

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { TeamInterface } from '../shared/interfaces/api/team.interface';
import Players from './Players.vue';
import Matches from './Matches.vue';
import SelectYear from './SelectYear.vue';
import { Dictionary } from 'vue-router/types/router';
import { CompetitionInterface } from '../shared/interfaces/api/competition.interface';
import { SeasonInterface } from '../shared/interfaces/api/season.interface';

const namespace: string = 'team';
@Component({
    components: { Matches, Players, SelectYear }
})
export default class Team extends Vue {
    @Action('requestTeamById', { namespace }) public requestTeamById!: (id: number) => Promise<void>;
    @Action('requestTeamMatches', { namespace }) public requestTeamMatches!: (teamId: number) => Promise<void>;
    @Action('requestCompetitionById', { namespace: 'competition' }) public requestCompetitionById!: (competitionId: number) => Promise<void>;
    @Action('requestTeamMatchesByYear', { namespace }) public requestTeamMatchesByYear!: (data: {teamId: number; year: string}) => Promise<void>;
    @Getter('getTeamById', { namespace }) public getTeamById!: (id: number) => TeamInterface;
    @Getter('getLoaderTeams', { namespace }) public getLoaderTeams!: () => CompetitionInterface[];
    @Getter('getCompetitionById', { namespace: 'competition' }) public getCompetitionById!: (competitionId: number) => CompetitionInterface;
    @Watch('$route.query') watchParams(queryParams: Dictionary<string>) {
        this.requestTeamMatchesByYear({ teamId: +this.$route.params.teamId, year: queryParams.year });
    }

    get team(): TeamInterface {
        return this.getTeamById(+this.$route.params.teamId);
    }

    get matchesByYear(): string[] {
        return (this.getCompetitionById(+this.$route.params.competitionId).seasons || []).map((season: SeasonInterface) => season.startDate.substr(0, 4));
    }

    beforeMount(): void {
        const teamId: number = +this.$route.params.teamId;
        const competitionId: number = +this.$route.params.competitionId;
        this.requestTeamById(teamId);
        this.requestTeamMatches(teamId);
        this.requestCompetitionById(competitionId);
    }
}
</script>

<style scoped lang="scss">
  ._back {
    background-color: lightgray;
  }
  ._card_text {
    font-size: 17px !important;
    line-height: 30px;
  }

</style>
