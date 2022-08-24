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
      <h5>Booking successfully registered!</h5>
      <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
        Your booking is registered! You will receive a notification when the date for your "At Home" Collection is determines
      </p>
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

  <div class="flex justify-content-center">
    <Card>
      <template #title>
        Create Your New "At Home" Collection Booking
      </template>
      <br>
      <template #content>
        <form
          class="p-fluid"
          @submit.prevent="handleSubmit(!v$.$invalid)"
        >
          <div class="field">
            <div class="p-float-label">
              <Dropdown
                id="waste"
                v-model="waste"
                :options="typesOfWaste"
                option-label="name"
              />
              <label for="waste">Type Of Waste*</label>
            </div>
            <small
              v-if="(v$.waste.$invalid && submitted) || v$.waste.$pending.$response"
              class="p-error"
            >{{ v$.waste.required.$message.replace('Value', 'Type Of Waste') }}</small>
          </div>
          <br>
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="city"
                v-model="v$.city.$model"
                :class="{'p-invalid':v$.city.$invalid && submitted}"
              />
              <label
                for="city"
                :class="{'p-error':v$.city.$invalid && submitted}"
              >City*</label>
            </div>
            <small
              v-if="(v$.city.$invalid && submitted) || v$.city.$pending.$response"
              class="p-error"
            >{{ v$.city.required.$message.replace('Value', 'City') }}</small>
          </div>
          <br>
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="province"
                v-model="v$.province.$model"
                :class="{'p-invalid':v$.province.$invalid && submitted}"
              />
              <label
                for="province"
                :class="{'p-error':v$.province.$invalid && submitted}"
              >Province*</label>
            </div>
            <small
              v-if="(v$.province.$invalid && submitted) || v$.province.$pending.$response"
              class="p-error"
            >{{ v$.province.required.$message.replace('Value', 'Province') }}</small>
          </div>
          <br>
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="address"
                v-model="v$.address.$model"
                :class="{'p-invalid':v$.address.$invalid && submitted}"
              />
              <label
                for="address"
                :class="{'p-error':v$.address.$invalid && submitted}"
              >Address*</label>
            </div>
            <small
              v-if="(v$.address.$invalid && submitted) || v$.address.$pending.$response"
              class="p-error"
            >{{ v$.address.required.$message.replace('Value', 'Address') }}</small>
          </div>
          <br>
          <Button
            type="submit"
            label="Submit"
            class="mt-2"
          />
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import axios from 'axios';
import Dialog from 'primevue/dialog';
import { useUserStore } from '@/components/stores/UserStore';

export default {
	name: 'BookingForm',
	components:{
		Dropdown,
		Button,
		Card,
		InputText,
		Dialog,
	},
	setup() {
		const userStore = useUserStore();
		return { v$: useVuelidate(), userStore };
	},
	data() {
		return {
			waste:null,
			city:'',
			province:'',
			address:'',
			typesOfWaste:[
				{ name: 'TWIGS' },
				{ name:'WASTE OIL' },
				{ name: 'IRON' },
				{ name: 'ELECTRONICS' },
				{ name:'CLOTHES' },
				{ name: 'OTHER' },
			],
			submitted:null,
			showMessage:false,
		};
	},
	validations() {
		return {
			city:{
				required
			},
			province:{
				required
			},
			address:{
				required
			},
			waste: {
				required
			},
		};
	},
	methods: {
		handleSubmit(isFormValid) {
			this.submitted = true;
			if (isFormValid) {
				let booking = {
					userId: this.userStore.userId,
					typeOfWaste: {
						wasteName: this.waste.name
					},
					city: this.city,
					province: this.province,
					address: this.address
				};
				console.log(booking);
				axios.post('http://localhost:3000/bookings', booking)
					.then(response => {
						if (response.status === 200) {
							console.log(response.data);
							this.toggleDialog();

						}
					});
			}
		},
		toggleDialog() {
			this.showMessage = !this.showMessage;

			if (!this.showMessage) {
				this.$router.push('/dashboard/bookings');
			}
		}
	}
};
</script>

<style scoped>

</style>
