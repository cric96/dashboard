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
import ComplaintsList from '@/components/complaints/ComplaintsList';
import AccountComponent from '@/components/authentication/AccountComponent';
import MissionDetails from '@/components/missions/MissionDetails';
import BookingList from '@/components/bookings/BookingList';
import BookingForm from '@/components/bookings/BookingForm';
import RegistrationForm from '@/components/authentication/RegistrationForm';
import { useUserStore } from '@/stores/UserStore';
import ComplaintForm from '@/components/complaints/ComplaintForm';
import { useSocketStore } from '@/stores/SocketStore';
import CollectionPointForm from '@/components/collectionPoints/CollectionPointForm';
import MissionsListComponent from '@/components/missions/MissionsListComponent';
import TrucksListComponent from '@/components/trucks/TrucksListComponent';

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
		path: '/dashboard/collectionPoints/new/:position*',
		name: 'Collection Point Form',
		component: CollectionPointForm,

	},
	{
		path: '/dashboard/trucks',
		name: 'Trucks',
		component: TrucksListComponent,

	},
	{
		path: '/dashboard/missions',
		name: 'Missions',
		component: MissionsListComponent,
	},
	{
		path: '/dashboard/missions/:id',
		name: 'Missions Details',
		component: MissionDetails,
	},
	{
		path: '/dashboard/missions/truck/:truckId',
		name: 'Missions Details By Truck',
		component: MissionDetails,
	},
	{
		path: '/dashboard/complaints',
		name: 'Complaints',
		component: ComplaintsList,
	},
	{
		path: '/dashboard/complaints/new',
		name: 'Complaint Form',
		component: ComplaintForm,
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

router.beforeEach((to) => {
	const userStore = useUserStore();
	const socketStore = useSocketStore();
	if (to.name !== 'Account' &&
		to.name !== 'Map' &&
		to.name !== '' &&
		to.name !== 'Registration Form' &&
		!userStore.isLogged) {
		return '/dashboard/account';
	}
	if (socketStore.sessionId !== '' && userStore.isLogged) {
		socketStore.reconnect();
	}
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
