<template>
  <div class="flex justify-content-center">
    <Card>
      <template #title>
        Add new Dumpster
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
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useUserStore } from '@/stores/UserStore';
import InputNumber from 'primevue/inputnumber';

export default {
	name: 'DumpsterForm',
	components:{
		Dropdown,
		Button,
		Card,
		InputNumber,
	},
	emits: ['dumpster'],
	setup() {
		const userStore = useUserStore();
		return { v$: useVuelidate(), userStore };
	},
	data() {
		return {
			waste:null,
			capacity:0.0,
			typesOfWaste:[
				{ name: 'PLASTIC_ALUMINIUM' },
				{ name:'GLASS' },
				{ name: 'PAPER' },
				{ name: 'ORGANIC' },
			],
			submitted:null,
		};
	},
	validations() {
		return {
			capacity:{
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
				this.$emit('dumpster', {
					waste:this.waste,
					capacity:this.capacity
				});
			}
		},
	}
};
</script>

<style scoped>

</style>
