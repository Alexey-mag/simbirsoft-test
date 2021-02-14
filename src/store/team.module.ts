import { ActionContext, Module } from 'vuex';
import axiosApi from '../shared/axios';
import { TeamStateInterface, TeamStateTeamInterface } from '../shared/interfaces/state/team-state.interface';
import { RootStateInterface } from '../shared/interfaces/state/root-state.interface';
import { TeamInterface } from '../shared/interfaces/api/team.interface';
import { AxiosResponse } from 'axios';
import { PlayerInterface } from '../shared/interfaces/api/player.interface';
import { hashMap, uniqueArray } from '../shared/helpers/unique.helper';
import { MatchInterface } from '../shared/interfaces/api/match.interface';
import { CompetitionStateInterface } from '../shared/interfaces/state/competition-state.interface';

export const teamModule: Module<TeamStateInterface, RootStateInterface> = {

    namespaced: true,
    state: {
        loader: false,
        teams: {}
    },
    getters: {
        getLoaderTeams: (state: TeamStateInterface) => {
            return state.loader;
        },
        getTeams: (state: TeamStateInterface) => (competitionId?: number): TeamInterface[] => {
            return competitionId ? Object.values(state.teams).filter((team: TeamStateTeamInterface) => team.competitionIds?.includes(competitionId)) : Object.values(state.teams);
        },
        getTeamById: (state: TeamStateInterface) => (id: number): TeamInterface | undefined => {
            return state.teams[id.toString()] || {} as TeamInterface;
        },
        getPlayersTeamById: (state: TeamStateInterface) => (id: number): PlayerInterface[] | undefined => {
            return state.teams[id.toString()].squad;
        }
    },
    mutations: {
        setloader(state: TeamStateInterface, payload: boolean) {
            state.loader = payload;
        },
        updateTeam(state: TeamStateInterface, team: TeamInterface) {
            /* teams data enrichment */
            state.teams = {
                ...state.teams,
                [team.id.toString()]: { ...team, squad: uniqueArray<PlayerInterface>(team?.squad, 'id') }
            };
        },
        updateTeams(state: TeamStateInterface, { teams, competitionId }: { teams: TeamInterface[]; competitionId: number }) {
            state.loader = true;
            state.teams = {
                ...hashMap<TeamInterface>(teams.map((team: TeamInterface) => {
                    const competitionIds = (state.teams[team.id]?.competitionIds || []);
                    if (!competitionIds.includes(competitionId)) {
                        competitionIds.push(competitionId);
                    }
                    return { ...team, competitionIds };
                }), 'id'),
                ...state.teams /* teams data enrichment */
            };
        },
        updateTeamMatches(state: TeamStateInterface, { matches, teamId }: { matches: MatchInterface[]; teamId: number }) {
            state.loader = true;
            state.teams = {
                ...state.teams,
                [teamId.toString()]: { ...state.teams[teamId.toString()], matches }
            };
        }
    },
    actions: {
        async requestTeamById(state: ActionContext<TeamStateInterface, RootStateInterface>, id: number): Promise<void> {
            const { data }: AxiosResponse<TeamInterface> = await axiosApi.get<TeamInterface>(`/api/teams/${id}`);

            state.commit('updateTeam', data);
        },

        async requestCompetitionTeams(state: ActionContext<TeamStateInterface, RootStateInterface>, competitionId): Promise<void> {
            const { data: { teams = [] } }: AxiosResponse<Partial<{ teams: TeamInterface[] }>> = await axiosApi.get<Partial<{ teams: TeamInterface[] }>>(`/api/competitions/${competitionId}/teams`);

            state.commit('updateTeams', { teams, competitionId });
        },

        async requestTeamMatches(state: ActionContext<TeamStateInterface, RootStateInterface>, teamId): Promise<void> {
            const { data: { matches = [] } }: AxiosResponse<Partial<{ matches: MatchInterface[] }>> = await axiosApi.get<Partial<{ matches: MatchInterface[] }>>(`/api/teams/${teamId}/matches`);

            state.commit('updateTeamMatches', { matches, teamId });
        },
        async requestTeamMatchesByYear(state: ActionContext<TeamStateInterface, RootStateInterface>, { teamId, year }: { teamId: number; year: string }): Promise<void> {
            const start: string = year + '-' + '01' + '-' + '01';
            const end: string = year + '-' + '12' + '-' + '31';
            if (year !== undefined) {
                const { data: { matches = [] } }: AxiosResponse<Partial<{ matches: MatchInterface[] }>> = await axiosApi.get<Partial<{ matches: MatchInterface[] }>>(`/api/teams/${teamId}/matches?dateFrom=${start}&dateTo=${end}`);

                state.commit('updateTeamMatches', { matches, teamId });
            } else {
                const { data: { matches = [] } }: AxiosResponse<Partial<{ matches: MatchInterface[] }>> = await axiosApi.get<Partial<{ matches: MatchInterface[] }>>(`/api/teams/${teamId}/matches`);

                state.commit('updateTeamMatches', { matches, teamId });
            }
        }
    }
};
