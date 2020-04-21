import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

// allows easy connection to our graphql server
const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')