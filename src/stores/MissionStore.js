import  { defineStore } from 'pinia';
import axios from 'axios';

export const useMissionStore = defineStore('mission', {
	state: () => ({
		missions:[],
		currentMission:null,
		fetchingMissions:true
	}),
	getters:{
		getMissionSteps: (state) => {
			return state.currentMission.missionSteps;
		},
	},
	actions:{
		fetchMissions() {
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
				}
			});
		},
		setCurrentMission(id) {
			console.log('setto current mission: ' + id);
			this.currentMission = this.missions.find(m => m.missionId === id);
			console.log(this.currentMission);
		}
	},
});
