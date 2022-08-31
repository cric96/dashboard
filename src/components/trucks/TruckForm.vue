<template>
  <div class="flex justify-content-center">
    <Card>
      <template #title>
        Add new Truck
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
                id="capacity"
                v-model="v$.capacity.$model"
                :class="{'p-invalid':v$.capacity.$invalid && submitted}"
                :min-fraction-digits="2"
                :max-fraction-digits="2"
              />
              <label
                for="capacity"
                :class="{'p-error':v$.capacity.$invalid && submitted}"
              >Capacity*</label>
            </div>
            <small
              v-if="(v$.capacity.$invalid && submitted) || v$.capacity.$pending.$response"
              class="p-error"
            >{{ v$.capacity.required.$message.replace('Value', 'Capacity') }}</small>
          </div>
          <br>
          <Button
            type="submit"
            label="Add"
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
import { useUserStore } from '@/stores/UserStore';
import InputNumber from 'primevue/inputnumber';

export default {
	name: 'TruckForm',
	components:{
		Button,
		Card,
		InputNumber,
	},
	emits: ['truck'],
	setup() {
		const userStore = useUserStore();
		return { v$: useVuelidate(), userStore };
	},
	data() {
		return {
			capacity:0.0,
			submitted:null,
		};
	},
	validations() {
		return {
			capacity:{
				required
			},
		};
	},
	methods: {
		handleSubmit(isFormValid) {
			this.submitted = true;
			if (isFormValid) {
				this.$emit('truck', {
					position:{
						latitude:0.0,
						longitude:0.0,
					},
					occupiedVolume: {
						value:0.0
					},
					capacity:this.capacity,
					inMission:false
				});
			}
		},
	}
};
</script>

<style scoped>

</style>
