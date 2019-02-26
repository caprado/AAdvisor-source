<template>
  <div>
    <span>
      <h2>
        Sorry, that page doesn't exist.
      </h2>
      <router-link to="/" tag="a">
        <button>Go Home</button>
      </router-link>
    </span>
  </div>
</template>

<script>
  import bus from '../bus';

  export default {
    name: 'FourOFour',

    created: function () {
      bus.$emit('toggleLoading', false);
    },

    methods: {
      goBack: function () {
        this.$router.push('/posts');
      }
    }
  }
</script>

<style scoped lang="scss">
  div {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 4rem);
  }
</style>