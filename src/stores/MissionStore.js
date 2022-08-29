import  { defineStore } from 'pinia';
import axios from 'axios';

export const useMissionStore = defineStore('mission', {
	state: () => ({
		missions:[],
		currentDetailsId:null,
		currentMission:null,
		fetchingMissions:true
	}),
	getters:{
		getMissionSteps: (state) => {
			return state.currentMission !== null ? state.currentMission.missionSteps : [];
		},
	},
	actions:{
		fetchMissions(id=null) {
			axios.get(process.env.VUE_APP_MISSION_MICROSERVICE + '/missions/', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				}
			}).then(res => {
				if (res.status === 200) {
					this.fetchingMissions = false;
					this.missions = res.data;
					if (id !== null) this.currentMission = this.findMissionFromId(id);
				}
			});
		},
		setCurrentMission(id) {
			if (this.missions.length === 0) {
				this.fetchMissions(id);
			} else {
				this.currentMission = this.findMissionFromId(id);
			}
		},
		findMissionFromId(id) {
			if (id.startsWith('Truck')) {
				return this.missions.find(m => m.truckId === id);
			} else {
				return this.missions.find(m => m.missionId === id);
			}
		}
	},
});
