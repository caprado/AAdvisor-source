<template>
  <div>
    <form @submit.prevent="submit">
      <img src="https://athensservices.com/wp-content/uploads/2018/10/Athens-Advisor-logo.png" class="at-logo-image"
              alt="Athens Services" width="100" height="31" style="display: inline;">
      <h2><pre>Endpoint API error</pre></h2>
      <p>Database Endpoint was not detected</p>
      <p>This error has been sent to the web administrator.</p>
      <!-- If the problem persist please escalate this issue by sending an email to <a href="mailto:chris.a.prado789@gmail.com">Christian Prado</a> -->
      <!-- <input v-model="updatedEndpoint" type="text"> -->
      <!-- <span v-if="error">{{ error }}</span> -->
      <!-- <button type="submit">Save</button> -->
      <router-link to="/city" tag="button">Go Back</router-link>
    </form>
   
    <!-- <a v-if="!error" @click="close">Nevermind.</a> -->
      <a href="" class="is-disabled">e4567b23bf3a45a58628d3244d1a704d@/1303308</a>
  </div>
</template>

<script>
import bus from '../bus';

export default {
  name: 'Updater',

  props: {
    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      updatedEndpoint: ''
    }
  },

  created: function () {
    this.updatedEndpoint = this.$store.state.endpoint;
  },

  methods: {
    close: function () {
      this.$emit('close');
    },

    submit: function () {

      this.$ga.event({
        eventCategory: 'form',
        eventAction: 'updateEndpoint',
        eventLabel: `Update to ${this.updatedEndpoint}`
      });

      this.$store.commit('cache/wipe');
      this.$store.commit('updateEndpoint', this.updatedEndpoint);
      this.$router.push('/posts');
      this.$emit('close');
    }
  }
}
</script>

<style scoped lang="scss">
.is-disabled {
  pointer-events: none;
  user-select: none;
  opacity: 0.6;
}
div {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgba($white, .99);
  z-index: 1;
}

form {
  text-align: center;
  width: 350px;
  max-width: calc(100% - 2rem);
}

button {
  width: 100%;
  margin-bottom: .75rem;
}

input {
  border: 2px solid $gray--mediumLight;
}

a {
  color: $gray--medium;

  &:hover {
    color: $gray;
  }
}

span {
  color: $salmon;
  display: inline-block;
  margin-bottom: 1rem;
}
pre {
  padding: 7px;
  background-color: #cecece;
}
</style>

