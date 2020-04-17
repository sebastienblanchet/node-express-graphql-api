<template>
  <v-app>
    <v-content>
      <CrudTable/>
    </v-content>
  </v-app>
</template>

<script>
import CrudTable from './components/CrudTable';

export default {
  name: 'App',

  components: {
    CrudTable,
  },

  data: () => ({
    //
  }),
};
</script>
