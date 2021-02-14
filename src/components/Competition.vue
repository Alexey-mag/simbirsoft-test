<template>
  <v-container>
    <v-content v-if="getLoaderCompetition">
    <v-row>
      <v-col xl="10" lg="10"  md="10" sm="12" xs="12" style="padding: 0 0">
        <v-col cols="12"
               style="position:relative; border:1px #ddd8d8 solid; border-radius: 5px;"
               >
          <h1>
            {{ competition.name }}
          </h1>
          <b>Area:</b> {{ competition.area.name}} <br>
          <b>Plan:</b> {{ competition.plan.split('_')[0] + ' ' + competition.plan.split('_')[1]}} <br>
          <b>Current Season:</b> {{ competition.currentSeason.startDate}} /
          {{ competition.currentSeason.endDate}}
          <div  style="position:absolute; top:3px; right:10px; z-index: 500">
            <select-year :years="competitionByYear" :year="this.$route.query.year || null"></select-year>
          </div>
        </v-col>

          <v-tabs>
            <v-tab >
              <v-icon left>
                mdi-tshirt-crew
              </v-icon>
              Teams
            </v-tab>
            <v-tab class="ml-8">
              <v-icon left>
                mdi-star
              </v-icon>
              Matches
            </v-tab>

            <v-tab-item class="_back">
              <teams></teams>
            </v-tab-item>
            <v-tab-item class="_back" style="margin: 0; padding: 0;">
              <matches v-bind:matches="competitionMatches"></matches>
            </v-tab-item>
          </v-tabs>
      </v-col>
        <v-col xl="2" lg="2" md="2"  sm="12" xs="12">
          <h4>Seasons</h4>
          <div dense v-for="season in seasons" :key="season.id" class="season" style="position:relative">
            <h5 style="color: grey" >
              {{ season.startDate.split('-')[0]}}.{{ season.startDate.split('-')[1]}} / {{ season.endDate.split('-')[0] }}.{{ season.endDate.split('-')[1] }}
            </h5>
              <div v-if="season.winner" >
              <small>Winner:</small> <br>
                {{ season.winner.name }}
                            <img :src="season.winner.crestUrl" alt="" width="50" height="50" class="ml-4" style="position:absolute; top:10px; right:5px">
              </div>

              <div>
              </div>

          </div>

        </v-col>

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
import { CompetitionInterface } from '../shared/interfaces/api/competition.interface';
import Teams from './Teams.vue';
import { MatchInterface } from '../shared/interfaces/api/match.interface';
import Matches from './Matches.vue';
import SelectYear from './SelectYear.vue';
import { SeasonInterface } from '../shared/interfaces/api/season.interface';
import { Dictionary } from 'vue-router/types/router';

const namespace: string = 'competition';
@Component({
    components: { Teams, Matches, SelectYear }
})
export default class Competition extends Vue {
    @Action('requestCompetitionById', { namespace }) public requestCompetitionById!: (competitionId: number) => Promise<void>;
    @Action('requestCompetitionMatches', { namespace: 'match' }) public requestCompetitionMatches!: (data: { competitionId: number; year: string }) => Promise<void>;
    @Getter('getCompetitionById', { namespace }) public getCompetitionById!: (competitionId: number) => CompetitionInterface;
    @Getter('getLoaderCompetition', { namespace }) public getLoaderCompetition!: () => CompetitionInterface[];
    @Getter('getMatches', { namespace: 'match' }) public getMatches!: () => MatchInterface[];

    @Watch('$route.query') watchParams(queryParams: Dictionary<string>) {
        this.requestCompetitionMatches({ competitionId: +this.$route.params.competitionId, year: queryParams.year });
    }

    get competition(): CompetitionInterface {
        return this.getCompetitionById(+this.$route.params.competitionId);
    }

    get competitionMatches(): MatchInterface[] {
        return this.getMatches();
    }

    get competitionByYear(): string[] {
        return (this.competition?.seasons || []).map((season: SeasonInterface) => season.startDate.substr(0, 4));
    }

    get seasons(): SeasonInterface[] {
        return this.competition.seasons?.sort() || [];
    }

    public mounted(): void {
        const competitionId: number = +this.$route.params.competitionId;
        const year: string = this.$route.params.year || this.competition?.currentSeason?.startDate.substr(0, 4) || '';
        this.requestCompetitionById(competitionId);
        this.requestCompetitionMatches({ competitionId, year });
    }
}
</script>

<style>

  .season{
    padding: 10px;
    border-radius: 5px;
    border:1px solid #d9d7d7;
    margin: 5px;
  }
  .season:hover{
    background-color: #eceaea;
  }
</style>
