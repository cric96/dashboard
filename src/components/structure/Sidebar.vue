<template>
  <Sidebar v-model:visible="sideVisible" position="right" class="p-sidebar-md" @hide="hide">
    <slot name="header"></slot>
    <Divider/>
    <slot name="content"></slot>
  </Sidebar>
</template>

<script>
import Sidebar from 'primevue/sidebar';
import Divider from 'primevue/divider';

export default {
  name: "CPSidebar",
  components:{
    Sidebar,
    Divider,
  },
  data(){
    return{
      sideVisible:this.sideVisibility
    }
  },
  props: [
      'sideVisibility',
  ],
  watch: {
    sideVisibility(n){
      this.sideVisible = n;
    },
  },
  methods:{
    hide(){
      console.log(this.sideVisible + "    " + this.sideVisibility)
      this.$emit('closed');
    }
  }
}
</script>

<style scoped>

</style>
