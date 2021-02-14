<template>
  <v-container>
    <v-content v-if="getLoaderCompetition">

      <v-row>

        <v-col cols="4" lg="4" md="4" sm="12" xs="12">
          <select-year :years="competitionByYear" :year="this.$route.query.year || null"></select-year>
        </v-col>

        <v-col cols="8" lg="8" md="8" sm="12" xs="12">
          <v-text-field
            style="float:right"
            v-model="searchStr"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            @keyup="search()"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3" md="4" sm="6" xs="12" v-for="com in competitions" :key="com.id">
          <v-card class="myCard" @click="toCompetition(com.id)">
            <v-card-title>{{ com.name }}</v-card-title>
            <div class="_icon"
                 :style="{
        backgroundImage:'url('+ getImgStyle(com) +')',
        backgroundPosition:'center',
        backgroundSize:'cover'
      }"></div>
            <v-card-text class="font-weight-medium _card-text">
              Area: {{ com.area.name }} <br>
              Plan: {{ com.plan.split('_')[0] + ' ' + com.plan.split('_')[1] }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
    <v-content app v-else style="background-color: #62b849; text-align: center">
      <v-img src="/loader.gif" width="400" style="margin: auto"/>
      <span style="color: white">loading ...</span>
    </v-content>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { CompetitionInterface } from '../shared/interfaces/api/competition.interface';
import SelectYear from './SelectYear.vue';

const namespace: string = 'competition';

@Component({
    components: { SelectYear }
})
export default class Competition extends Vue {
  @Action('requestAllCompetitions', { namespace }) public requestAllCompetitions!: () => Promise<void>;
  @Getter('allCompetitions', { namespace }) public allCompetitions!: () => CompetitionInterface[];
  @Getter('getLoaderCompetition', { namespace }) public getLoaderCompetition!: () => CompetitionInterface[];

  public searchStr: string = '';

  public mounted(): void {
      if (this.allCompetitions().length === 0) {
          this.requestAllCompetitions();
      }
  }

  public search() {
      if (this.$route.query.searchStr !== this.searchStr) {
          this.$router.push({ path: '/competitions', query: { year: this.$route.query.year, search: this.searchStr } });
      }
  }

  get competitions() {
      let arrayRes: CompetitionInterface[] = this.allCompetitions();

      if (this.$route.query.year) {
          arrayRes = arrayRes.filter((competition: CompetitionInterface) => {
              return competition.currentSeason?.startDate.toLowerCase().includes(this.$route.query.year.toString().toLowerCase());
          });
      }

      if (this.$route.query.search) {
          arrayRes = arrayRes.filter(com => {
              const search: any = this.$route.query.search;
              return com.name.toLowerCase().includes(search.toLowerCase()) ||
          com.plan?.toLowerCase().includes(search.toLowerCase()) ||
          com.area?.name.toLowerCase().includes(search.toLowerCase());
          });
      }

      return arrayRes;
  }

  get competitionByYear() {
      const years: string[] = [];
      this.allCompetitions().filter((item: CompetitionInterface) => {
          const ye: string | undefined = item.currentSeason?.startDate.split('-')[0];

          if (ye && !years.includes(ye)) {
              years.push(ye);
          }
      });
      return years;
  }

  public getImgStyle(competition: CompetitionInterface): string {
      return competition?.emblemUrl || competition?.area?.ensignUrl || '/ball.jpg';
  }

  public toCompetition(com: number): void {
      const comStr: string = com.toString();
      this.$router.push({ name: 'Competition', params: { competitionId: comStr } });
  }
}
</script>

<style scoped>
.myCard {
  background-color: #e8f5f2 !important;
  position: relative;
}

.myCard:hover {
  background-color: #c6f3ea !important;
  cursor: pointer;
}

._text {
  border: 1px solid #3D43F5;
  border-radius: 3px;
}

._icon {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: absolute;
  top: 50px;
  right: 20px;
}

._card-text {
  font-size: 15px;
}

</style>
