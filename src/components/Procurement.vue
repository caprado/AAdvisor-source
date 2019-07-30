<template>
<span>
  <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  bp-menu bp-events-nav menu-item menu-item-type-custom menu-item-object-custom" 
  v-for="post in orderedPost" :post="posts" :key="post.id">
      <router-link :to="{
          name: 'ProcurementPost',
          params: {
            slug: post.slug,
            title: post.title.rendered,
            id: post.id,
            content: post.content.rendered
          }
        }"
        v-html="post.title.rendered">
    </router-link>
  </li>
</span>
</template>

<script>
  import bus from '../bus';
  import ajax from '../mixins/ajax';
  import _ from 'lodash';
  import axios from "axios";

  export default {
    name: 'Procurement',

    mixins: [ajax],

    data() {
      return {
        posts: [],
        page: 1,
        totalPages: null,
        response: "",
        procurement: []
      }
    },

    computed: {
      orderedPost: function () {
        return _.orderBy(this.posts, 'slug')
      },

      filteredPost: function () {
        var self = this;
        return _.orderBy(this.posts, 'slug').filter(function (post) {
          return _.includes(post.slug, self.searchText);
        })
      },
    },

    mounted: function () {
      // this.getPosts();
      this.getMenu();
    },

    created: function () {},

    methods: {
      getPosts: async function () {
          let response;

          try {
            response = await this.get(
              `/procurement`
            );
            this.totalPages = response.headers['x-wp-totalpages'];
          } catch (error) {
              bus.$emit('showUpdater', 'Are you sure that\'s a valid endpoint?');
              bus.$emit('toggleLoading', false);
            return;
          }
          
          console.log("Post:", this.posts, "Pages: ", this.totalPages);

          bus.$emit('toggleLoading', false);
        },

      // Added because rest api already configured via mixins. This was requested after I built out the api as well as async function that included the REST_API variable
      getMenu: function () { axios.get("http://athensadvisor.athensservices.com:81/wp-json/wp/v2/procurement", {})
        .then(response => {
          var posts = [];
          this.posts = response.data;
          }, 
        error => {
          console.error(error);
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  li {
    color: white;
    font-family: Nunito, Arial, Helvetica, sans-serif;
    text-transform: none;
    line-height: 20px;
    letter-spacing: 0;
    font-weight: 400;
    font-size: 16px;
    opacity: 1;
    visibility: visible;
    -webkit-transition: opacity .24s ease-in-out;
    -moz-transition: opacity .24s ease-in-out;
    transition: opacity .24s ease-in-out;

    a {
      display: block;
      padding: 10px 20px;
      color: #fff;
    }
  }

  img {
    transition: box-shadow .15s ease-in-out;
    box-shadow: 0 0 0 2px $gray--light;

    &:hover {
      box-shadow: 0 0 0 3px $gray--light;
    }
  }

  span {
    font-size: $small-font-size;
    color: $gray--medium;
    margin: 1rem 0 .5rem;
  }

  h3 {
    margin: 0 .25rem 0 1rem;

    a {
      color: inherit;

      &:hover {
        color: $salmon;
      }

      &:focus {
        outline: none;
      }
    }
  }
</style>