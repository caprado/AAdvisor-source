<template>
  <div id="city-template">
    <div class="low-res"><h3 style="text-align:center;">This device is not supported.</h3></div>
      <div class="post-data">
        <header>
          <ul>
            <!-- <li>
              <strong style="color: black;" v-html="title"></strong> 
            </li> -->
            <li>
              <a style="display: inline;" href='http://athensadvisor.athensservices.com:81/wp-admin/post-new.php?post_type=department'>Add Department</a> | <a style="display: inline;" href='http://athensadvisor.athensservices.com:81/wp-admin/edit.php?post_type=department'>Edit Departments</a>
            </li>
          </ul>
          <hr>
        </header>
        <ul>
          <li v-if="loading">Loading....</li>
          <DepartmentCard v-else v-for="post in post" :post="post" :key="post.id" />
        </ul>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import bus from '../bus';
  import utils from '../mixins/utils';
  import ajax from '../mixins/ajax';
  import DepartmentCard from '../components/DepartmentCard';

  export default {
    name: 'Departments',

    mixins: [utils, ajax],

    data () {
      return {
        post: [],
        date: '',
        link: '',
        title: '',
        content: '',
        featured_image: '',
        loading: true
      }
    },

    created: async function () {
      this.post = await this.setPost();
      bus.$emit('toggleLoading', false);
    },

    methods: {
      setPost: function () {
        axios.get(`http://athensadvisor.athensservices.com:81/wp-json/wp/v2/departments`)
        .then(response => {
          this.post = response.data
          this.loading = false;
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    },

    components: {
      DepartmentCard
    }
  }
</script>

<style scoped lang="scss">
  article {
    margin: 0 auto;
    background: $gray--light;
    border: 2px solid darken($gray--light, 5%);
    padding: 1rem;

    @include media($small) {
      padding: 3rem;
    }
  }

  header {
    margin-bottom: 1rem;
  }

  h1 {
    margin: 2rem 0 0;
  }

  ul {
    @include media($mobile) {
      display: grid;
      // grid-template-columns: auto 1fr;
      grid-template-columns: auto;
      grid-gap: 5px;
    }
  }

  li {
    & + & {
      // &:before {
      //   @include media($mobile) {
      //     content: '|';
      //     float: left;
      //     margin: 0 5px 0 0;
      //   }
      // }
    }

    a {
      color: inherit;
      font-weight: 600;

      &:hover {
        color: $action-color;
      }
    }
  }

  a {
    display: inline-block;
    margin-bottom: 1rem;
  }

  .wp-block-columns {
    display: flex;
  }

  hr {
    margin: 0;
    margin-top: 5px;
    border: 1px solid gray;
  }

  table {
    width: 100%!important;
    table-layout: auto!important;
  }
  
  strong {
    color: #e4001c;
    font-weight: 700;
  }
  @media (max-width: 1024px) {
    #city-template {
      width: 85%;
        margin-left: 15%;
    }
      #wrapper {
      width: 100% !important;
      margin-left: 0% !important;
  }
  }
  @media (max-width: 970px) {
    #city-template {
        margin-left: 0%;
        padding: 2%;
    }

  }
  .low-res {display:none;}
  @media (max-width: 414px) {
    .post-data {
      display: none;
    }
    .low-res {
      display: block;
    }
  }
</style>
