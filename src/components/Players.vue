<template>
  <div style="border:1px solid #dedbdb; margin: 0px 0; padding: 0;">

  <v-data-table

    :headers="headers"
    :items="players"
    :loading="!players.length"
    loading-text="Loading... Please wait"
  >
    <template v-slot:item.name="{ item }">
<!--      {{item}}-->
      <span style="margin: 0 5px"><v-icon small>mdi-account</v-icon></span><span>{{ item.name }}</span>
    </template>
    <template v-slot:item.dateOfBirth="{ item }">
      <span>{{ new Date(item.dateOfBirth).toLocaleDateString() }}</span>
    </template>
  </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import { PlayerInterface } from '../shared/interfaces/api/player.interface';

@Component
export default class Players extends Vue {
    @Prop({ required: false, default: [] }) readonly players!: PlayerInterface[];

    public headers: DataTableHeader[] = [
        { text: 'Name', value: 'name' },
        { text: 'Date Of Birth', value: 'dateOfBirth' },
        { text: 'Country', value: 'countryOfBirth' },
        { text: 'Nationality', value: 'nationality' },
        { text: 'Position', value: 'position' }
    ];
}
</script>

<style scoped lang="scss">

</style>
