<template>
  <div class="container-wrapper" v-if="pages && pages.length">

    <div class="row">
      <div class="col-sm-7">
      <div class="announcements col-sm-8" v-for="pages of pages">
        <div class="post-container" >
          <h3>{{pages.title.rendered}}</h3>
              <div class="post-body" v-html="pages.content.rendered"></div>
        </div>
      </div>
      </div>
    <div class="col-sm-5">
      <Instagram></Instagram>
    </div>

  </div>

  

</div>
      
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import VueInstagram from 'vue-instagram'
import Instagram from '../components/Instagram';


export default {
  components: {
    VueInstagram,
    Instagram
  },
  data() {
    return {
      pages: [],
      errors: []
    }
  },

  // Fetches pages when the component is created.
  created() {
    axios.get(`https://api.revolveyourwaste.com/wp-json/wp/v2/pages`)
    .then(response => {
      this.pages = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style scoped lang="scss">
  .container-wrapper {
    width: 100%;
  }
  .row {
    width: 100%;
  }
  .col-sm-7 {
    width: 70%;
    float: left;
  }
  .col-sm-5 {
    width: 30%;
    float: left;
    padding: 2%;
    padding-top: 4.4%;

  }
  .announcements {
    width: 100%;
  }
  .post-body {
    margin: 2%;
  }
</style>