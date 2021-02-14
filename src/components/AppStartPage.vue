<template>
  <v-app>
    <v-content
      :style="{
      backgroundColor:getLoaderCompetition ? 'white': '#62b849'
      }">
      <v-toolbar dense>
      <v-breadcrumbs :items="getBreadCrumbs()"></v-breadcrumbs>
      </v-toolbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BreadCrumbsItemInterface } from '../shared/interfaces/bread-crumbs-item.interface';
import { Getter } from 'vuex-class';
import { CompetitionInterface } from '../shared/interfaces/api/competition.interface';
const namespace: string = 'competition';

@Component({

})
export default class AppStartPage extends Vue {
  @Getter('getLoaderCompetition', { namespace }) public getLoaderCompetition!: () => CompetitionInterface[];
  public getBreadCrumbs(): BreadCrumbsItemInterface[] {
      return this.$route.meta.map((item: BreadCrumbsItemInterface) => {
          Object.keys(this.$route.params).forEach((key: string) => {
              item.text = item.text.replace(`:${key}`, this.$route.params[key]);
              item.to = item.to.replace(`:${key}`, this.$route.params[key]);
              item.exact = true;
          });

          return item;
      });
  }
}
</script>

<style scoped lang="scss">

</style>
