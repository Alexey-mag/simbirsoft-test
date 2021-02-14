<template>

<v-select :items="years"
          v-model="yearModel"
          label="Select year"
          cache-items
          class="_select"
          @change="setRouteQuery(yearModel)"
></v-select>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '../router';

  @Component
export default class SelectYear extends Vue {
    @Prop({ required: true, default: [] }) readonly years!: string[];
    @Prop({ required: true }) year!: string;

    public yearModel: string = '';
    public itemsModel: string = 'All years';

    public setRouteQuery(year: string): void {
        if (year === 'All years') {
            this.$router.push(this.$route.path);
        } else {
            router.push({ path: this.$route.fullPath, query: { year: this.yearModel } });
        }
    }

    public mounted() {
        this.yearModel = this.year;
        this.years.unshift(this.itemsModel);
    }
};
</script>

<style scoped>
  ._select {
  }
</style>
