import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Competitions from '../components/Competitions.vue';
import Teams from '../components/Teams.vue';
import Team from '../components/Team.vue';
import Matches from '../components/Matches.vue';
import Competition from '../components/Competition.vue';
import Main from '../components/AppStartPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/competitions',
        component: Main
    },
    {
        path: '/competitions',
        name: 'Competitions',
        component: Competitions,
        meta: [{
            text: 'Competitions',
            to: '/competitions'
        }]
    },
    {
        path: '/competitions/:competitionId',
        name: 'Competition',
        component: Competition,
        meta: [{
            text: 'Competitions',
            to: '/competitions'
        }, {
            text: ':competitionId',
            to: '/competitions/:competitionId'
        }]
    },
    {
        path: '/competitions/:competitionId/teams',
        name: 'Teams',
        component: Teams,
        meta: [{
            text: 'Competitions',
            to: '/competitions'
        }, {
            text: ':competitionId',
            to: '/competitions/:competitionId'
        }, {
            text: 'teams',
            to: '/competitions/:competitionId/teams'
        }]
    },
    {
        path: '/competitions/:competitionId/teams/:teamId',
        name: 'Team',
        component: Team,
        meta: [{
            text: 'Competitions',
            to: '/competitions'
        }, {
            text: ':competitionId',
            to: '/competitions/:competitionId'
        }, {
            text: 'teams',
            to: '/competitions/:competitionId/teams'
        }, {
            text: ':teamId',
            to: '/competitions/:competitionId/teams/:teamId'
        }]
    },
    {
        path: '/competitions/:competitionId/matches',
        name: 'Matches',
        component: Matches,
        meta: [{
            text: 'Competitions',
            to: '/competitions'
        }, {
            text: ':competitionId',
            to: '/competitions/:competitionId'
        }, {
            text: 'matches',
            to: '/competitions/:competitionId/matches'
        }]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
