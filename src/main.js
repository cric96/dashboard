import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import { createWebHistory, createRouter } from 'vue-router';
import MapComponent from '@/components/map/MapComponent';
import MissionsList from '@/components/missions/MissionsList';
import ComplaintsList from '@/components/complaints/ComplaintsList';
import AccountComponent from '@/components/authentication/AccountComponent';

const routes = [
	{
		path: '/dashboard',
		name: '',
		component: MapComponent,
	},
	{
		path: '/dashboard/map',
		name: 'Map',
		component: MapComponent,

	},
	{
		path: '/dashboard/missions',
		name: 'Missions',
		component: MissionsList,
	},
	{
		path: '/dashboard/complaints',
		name: 'Complaints',
		component: ComplaintsList,
	},
	{
		path: '/dashboard/account',
		name: 'Account',
		component: AccountComponent,
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

createApp(App).use(PrimeVue).use(router).mount('#app');
