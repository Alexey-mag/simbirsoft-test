import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootStateInterface } from '../shared/interfaces/state/root-state.interface';
import { teamModule } from './team.module';
import { competitionModule } from './competition.module';
import { matchModule } from './match.module';

Vue.use(Vuex);

const store: StoreOptions<RootStateInterface> = {
    state: {
        version: '1.0.0' // a simple property
    },
    getters: {
        getVersion(state) {
            return state.version;
        }
    },
    modules: {
        team: teamModule,
        competition: competitionModule,
        match: matchModule
    }
};

export default new Vuex.Store<RootStateInterface>(store);
