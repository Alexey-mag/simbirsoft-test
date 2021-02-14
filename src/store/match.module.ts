import { ActionContext, Module } from 'vuex';
import axiosApi from '../shared/axios';
import { RootStateInterface } from '../shared/interfaces/state/root-state.interface';
import { AxiosResponse } from 'axios';
import { MatchStateInterface } from '../shared/interfaces/state/match-state.interface';
import { MatchInterface } from '../shared/interfaces/api/match.interface';

export const matchModule: Module<MatchStateInterface, RootStateInterface> = {
    namespaced: true,
    state: {
        matches: []
    },
    getters: {
        getMatchesByCompetitionId: (state: MatchStateInterface) => (competitionId: number): MatchInterface[] => {
            return state.matches;
        }
    },
    mutations: {
        updateMatches(state: MatchStateInterface, matches: MatchInterface[]) {
            state.matches = matches;
        }
    },
    actions: {
        async requestCompetitionMatches(state: ActionContext<MatchStateInterface, RootStateInterface>, { competitionId, year }: {competitionId: number; year: string }): Promise<void> {
            const { data: { matches = [] } }: AxiosResponse<Partial<{ matches: MatchInterface[] }>> = await axiosApi.get<Partial<{ matches: MatchInterface[] }>>(`/api/competitions/${competitionId}/matches?season=${year}`);
            state.commit('updateMatches', matches);
        }
    }
};
