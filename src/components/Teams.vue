<template>
  <div style="border:1px solid #dedbdb; margin: 0px 0; padding: 0;">
        <v-data-table
          class="_back"
          :headers="headers"
          :items="teams"
          :search="searchStr"
          :loading="teams.length <= 1"
          @click:row="navigate"
          loading-text="Loading... Please wait"
        >
          <template v-slot:item.crestUrl="{ item }">
            <img v-bind:src="item.crestUrl" alt="" width="40" height="40" style="margin: 3px">
          </template>

        </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { TeamInterface } from '../shared/interfaces/api/team.interface';
import { DataTableHeader } from 'vuetify';
import router from '../router';
import Players from './Players.vue';

const namespace: string = 'team';
@Component({
    components: { Players }
})
export default class Teams extends Vue {
    @Action('requestCompetitionTeams', { namespace }) public requestCompetitionTeams!: (competitionId: number) => Promise<void>;
    @Getter('getTeams', { namespace }) public getTeams!: (competitionId: number) => TeamInterface[];

    public searchStr: string = '';
    public headers: DataTableHeader[] = [
        { text: 'Logo', value: 'crestUrl' },
        { text: 'Name', value: 'name' },
        { text: 'Colors', value: 'clubColors' },
        { text: 'Founded', value: 'founded' },
        { text: 'Area', value: 'area.name' },
        { text: 'Home page', value: 'website' },
        { text: 'Phone', value: 'phone' }
    ];

    get teams(): TeamInterface[] {
        return this.getTeams(+this.$route.params.competitionId);
    }

    public mounted(): void {
        this.requestCompetitionTeams(+this.$route.params.competitionId);
    }

    public navigate(item: TeamInterface): void {
        router.push(`/competitions/${this.$route.params.competitionId}/teams/${item.id}`);
    }
}
</script>

<style scoped lang="scss">
div {
  margin: 50px;
}
._back {
  //background-color: rgba(209,193,118,0.65);
  padding: 0;
  margin: 0;
}
  ._back:hover {
    cursor: pointer;
  }

</style>
