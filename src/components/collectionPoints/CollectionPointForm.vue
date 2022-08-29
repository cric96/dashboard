<template>
  <Dialog
    v-model:visible="showMessage"
    :breakpoints="{ '960px': '80vw' }"
    :style="{ width: '30vw' }"
    position="top"
  >
    <div class="flex align-items-center flex-column pt-6 px-3">
      <i
        class="pi pi-check-circle"
        :style="{fontSize: '5rem', color: 'var(--green-500)' }"
      />
      <h5>Collection Point successfully registered!</h5>
    </div>
    <template #footer>
      <div class="flex justify-content-center">
        <Button
          label="OK"
          class="p-button-text"
          @click="toggleDialog"
        />
      </div>
    </template>
  </Dialog>

  <div class="flex justify-content-center max-w-25rem">
    <Card>
      <template #title>
        Add new Collection Point
      </template>
      <br>
      <template #content>
        <form
          class="p-fluid"
          @submit.prevent="handleSubmit(!v$.$invalid)"
        >
          <div class="field">
            <div class="p-float-label">
              <InputNumber
                id="latitude"
                v-model="v$.latitude.$model"
                :class="{'p-invalid':v$.latitude.$invalid && submitted}"
                :min-fraction-digits="4"
                :max-fraction-digits="14"
              />
              <label
                for="latitude"
                :class="{'p-error':v$.latitude.$invalid && submitted}"
              >Latitude*</label>
            </div>
            <small
              v-if="(v$.latitude.$invalid && submitted) || v$.latitude.$pending.$response"
              class="p-error"
            >{{ v$.latitude.required.$message.replace('Value', 'Latitude') }}</small>
          </div>
          <br>
          <div class="field">
            <div class="p-float-label">
              <InputNumber
                id="province"
                v-model="v$.longitude.$model"
                :class="{'p-invalid':v$.longitude.$invalid && submitted}"
                :min-fraction-digits="4"
                :max-fraction-digits="14"
              />
              <label
                for="longitude"
                :class="{'p-error':v$.longitude.$invalid && submitted}"
              >Longitude*</label>
            </div>
            <small
              v-if="(v$.longitude.$invalid && submitted) || v$.longitude.$pending.$response"
              class="p-error"
            >{{ v$.longitude.required.$message.replace('Value', 'Longitude') }}</small>
          </div>
          <Divider />
          <div
            v-if="dumpsters.length > 0"
            class="flex-column justify-content-evenly flex-wrap mb-2"
          >
            <Chip
              v-for="d in dumpsters"
              :key="d.capacity"
              :label="d.waste.name"
              class="m-1"
              removable
              @remove="dumpsters.splice(dumpsters.indexOf(d), 1)"
            />
          </div>
          <div
            v-if="!showDumpsterForm"
            class="flex justify-content-evenly align-content-center"
          >
            <p>Add a Dumpster</p>
            <Button
              class="p-button-rounded"
              icon="pi pi-plus"
              @click="showDumpsterForm=true"
            />
          </div>
          <DumpsterForm
            v-if="showDumpsterForm"
            @dumpster="(d) => {
              showDumpsterForm = false
              dumpsters.push(d)
            }"
          />
          <Button
            type="submit"
            label="Submit"
            class="mt-2"
            :disabled="submitted"
          />
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Button from 'primevue/button';
import Card from 'primevue/card';
import axios from 'axios';
import Dialog from 'primevue/dialog';
import { useUserStore } from '@/stores/UserStore';
import InputNumber from 'primevue/inputnumber';
import DumpsterForm from '@/components/collectionPoints/DumpsterForm';
import Divider from 'primevue/divider';
import Chip from 'primevue/chip';

export default {
	name: 'CollectionPointForm',
	components:{
		DumpsterForm,
		Divider,
		Button,
		Card,
		InputNumber,
		Dialog,
		Chip,
	},
	setup() {
		const userStore = useUserStore();
		return { v$: useVuelidate(), userStore };
	},
	data() {
		return {
			waste:null,
			latitude:this.$route.params.position[0],
			longitude:this.$route.params.position[1],
			typesOfWaste:[
				{ name: 'TWIGS' },
				{ name:'WASTE OIL' },
				{ name: 'IRON' },
				{ name: 'ELECTRONICS' },
				{ name:'CLOTHES' },
				{ name: 'OTHER' },
			],
			dumpsters:[],
			submitted:null,
			showDumpsterForm:false,
			showMessage:false,
		};
	},
	validations() {
		return {
			latitude:{
				required
			},
			longitude:{
				required
			},
		};
	},
	methods: {
		handleSubmit(isFormValid) {
			this.submitted = true;
			if (isFormValid) {
				let cp = {
					latitude: this.latitude,
					longitude: this.longitude
				};
				axios.post(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/collectionpoints/', cp)
					.then(response => {
						if (response.status === 200) {
							console.log(response.data);
							Promise.all(this.dumpsters.map((d) => {
								let dump = {
									dumpster: {
										capacity:d.capacity,
										wasteName:d.waste.name,
									},
									collectionPointId:response.data.id
								};
								return axios.post(process.env.VUE_APP_DUMPSTER_MICROSERVICE+'/dumpsters/', dump);
							})).then(() => {
								this.toggleDialog();
							});
						}
					});
			}
		},
		toggleDialog() {
			this.showMessage = !this.showMessage;
			if (!this.showMessage) {
				this.$router.push('/dashboard/map');
			}
		}
	}
};
</script>

<style scoped>

</style>
