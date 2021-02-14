import axiosApi from '../shared/axios';
import { ActionContext, Module } from 'vuex';
import { CompetitionInterface } from '../shared/interfaces/api/competition.interface';
import { CompetitionStateInterface } from '../shared/interfaces/state/competition-state.interface';
import { RootStateInterface } from '../shared/interfaces/state/root-state.interface';
import { AxiosResponse } from 'axios';

export const competitionModule: Module<CompetitionStateInterface, RootStateInterface> = {
    namespaced: true,
    state: {
        loader: false,
        competitions: [],
        search: ''
    },
    getters: {
        getLoaderCompetition: (state: CompetitionStateInterface) => {
            return state.loader;
        },
        allCompetitions: (state: CompetitionStateInterface) => (): CompetitionInterface[] => {
            return state.competitions.length > 0 ? [...state.competitions] : [];
        },
        getCompetitionById: (state: CompetitionStateInterface) => (id: number): CompetitionInterface | undefined => {
            return state.competitions[id];
        }
    },
    mutations: {
        setloader(state: CompetitionStateInterface, payload: boolean) {
            state.loader = payload;
        },
        updateCompetition(state: CompetitionStateInterface, competition: CompetitionInterface) {
            state.loader = true;
            state.competitions = {
                ...state.competitions,
                [competition.id.toString()]: { ...competition }
            };
        },
        setCompetitions(state: CompetitionStateInterface, competitions: CompetitionInterface[]) {
            state.loader = true;
            state.competitions = competitions.filter((competition: CompetitionInterface) => {
                // Only available competitions for current API token
                return process.env.VUE_APP_FOOTBALL_DATA_API_AVAILABLE_COMPETITIONS.split(',').includes(competition.id.toString());
            });
        }
    },
    actions: {
        async requestCompetitionById(state: ActionContext<CompetitionStateInterface, RootStateInterface>, id: number): Promise<void> {
            state.commit('setloader', false);
            const { data }: AxiosResponse<CompetitionInterface> = await axiosApi.get<CompetitionInterface>(`/api/competitions/${id}`);
            state.commit('updateCompetition', data);
        },

        async requestAllCompetitions(state: ActionContext<CompetitionStateInterface, RootStateInterface>): Promise<void> {
            state.commit('setloader', false);
            const data: AxiosResponse<Partial<{ competitions: CompetitionInterface[] }>> = await axiosApi.get<Partial<{ competitions: CompetitionInterface[] }>>('api/competitions');
            state.commit('setCompetitions', data.data.competitions);
        }
    }
};
