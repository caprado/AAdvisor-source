<template>
  <div class="bread-crumb">
    <!-- <h1><router-link to="/" tag="a">Dashboard</router-link> /  {{this.$route.params.title || this.$route.name}}</h1> -->
  </div>
</template>

<script>
  import utils from '../mixins/utils';
  import ajax from '../mixins/ajax';

export default {
    data () {
    return {
      posts: [],
      page: 1,
      totalPages: null
    }
  },
  created: function () {
    if(this.$route.name === 'page') {
      this.page = this.$route.params.page;
    }
  }
}
</script>
