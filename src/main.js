import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import BadgeDirective from 'primevue/badgedirective';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import { createWebHistory, createRouter } from 'vue-router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import MapComponent from '@/components/map/MapComponent';
import MissionsList from '@/components/missions/MissionsList';
import ComplaintsList from '@/components/complaints/ComplaintsList';
import AccountComponent from '@/components/authentication/AccountComponent';
import MissionDetails from '@/components/missions/MissionDetails';
import BookingList from '@/components/bookings/BookingList';
import BookingForm from '@/components/bookings/BookingForm';
import RegistrationForm from '@/components/authentication/RegistrationForm';

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
		path: '/dashboard/missions/:id',
		name: 'Missions Details',
		component: MissionDetails,
	},
	{
		path: '/dashboard/complaints',
		name: 'Complaints',
		component: ComplaintsList,
	},
	{
		path: '/dashboard/bookings',
		name: 'Bookings',
		component: BookingList,
	},
	{
		path: '/dashboard/bookings/new',
		name: 'Bookings Form',
		component: BookingForm,
	},
	{
		path: '/dashboard/account',
		name: 'Account',
		component: AccountComponent,
	},
	{
		path: '/dashboard/account/registration',
		name: 'Registration Form',
		component: RegistrationForm,
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(pinia);
app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.directive('badge', BadgeDirective);
app.mount('#app');
