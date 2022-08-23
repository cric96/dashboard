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
      <h5>Complaint successfully registered!</h5>
      <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
        Thanks to send us the complaint! We will trying to close it asap to give you a better service
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
    <Card style="width: 40vw">
      <template #title>
        Create a new complaint
      </template>
      <br>
      <template #content>
        <form
          class="p-fluid"
          @submit.prevent="handleSubmit(!v$.$invalid)"
        >
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="title"
                v-model="v$.title.$model"
                :class="{'p-invalid':v$.title.$invalid && submitted}"
              />
              <label
                for="title"
                :class="{'p-error':v$.title.$invalid && submitted}"
              >Title</label>
            </div>
            <small
              v-if="(v$.title.$invalid && submitted) || v$.title.$pending.$response"
              class="p-error"
            >{{ v$.title.required.$message.replace('Value', 'Title') }}</small>
          </div>
          <br>
          <div class="field">
            <div class="p-float-label">
              <Textarea
                id="message"
                v-model="v$.message.$model"
                :class="{'p-invalid':v$.message.$invalid && submitted}"
              />
              <label
                for="message"
                :class="{'p-error':v$.message.$invalid && submitted}"
              >Description</label>
            </div>
            <small
              v-if="(v$.message.$invalid && submitted) || v$.message.$pending.$response"
              class="p-error"
            >{{ v$.message.required.$message.replace('Value', 'Description') }}</small>
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
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
// import axios from 'axios';
import Dialog from 'primevue/dialog';
import { useUserStore } from '@/components/stores/UserStore';
import Textarea from 'primevue/textarea';

export default {
	name: 'BookingForm',
	components:{
		Button,
		Card,
		InputText,
		Textarea,
		Dialog,
	},
	setup() {
		const userStore = useUserStore();
		return { v$: useVuelidate(), userStore };
	},
	data() {
		return {
			title:'',
			message:'',
			submitted:null,
			showMessage:false,
		};
	},
	validations() {
		return {
			title:{
				required
			},
			message:{
				required
			},
		};
	},
	methods: {
		handleSubmit(isFormValid) {
			this.submitted = true;
			if (isFormValid) {
				let complaint = {
					ownerId: this.userStore.userId,
					issuer:'USER',
					title: this.title,
					message: this.message,
				};
				console.log(complaint);
				// axios.post('http://localhost:3000/bookings', booking)
				// 	.then(response => {
				// 		if (response.status === 200) {
				// 			console.log(response.data);
				// 			this.toggleDialog();
				//
				// 		}
				// 	});
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
