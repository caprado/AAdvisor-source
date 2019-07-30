<template>
<span>
  <input type="text" placeholder="Search City.." v-model="searchText" />
  <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  bp-menu bp-events-nav menu-item menu-item-type-custom menu-item-object-custom">
    <router-link to="/Cities" tag="a">View All Cities</router-link>
  </li>

  <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  bp-menu bp-events-nav menu-item menu-item-type-custom menu-item-object-custom" 
  v-for="post in filteredPost" :post="post" :key="post.id">
    <router-link :to="{
      name: 'post',
      params: {
        slug: post.slug,
        title: post.title.rendered
        }
      }" v-html="post.title.rendered">
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
    name: 'Citylist',

    mixins: [ajax],

    data() {
      return {
        searchText: "",
        posts: [],
        page: 1,
        totalPages: null,
        response: "",
        pageMenu: []
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
      this.getPosts();
    },

    created: function () {
      if (this.$route.name === 'page') {
        this.page = this.$route.params.page;
      }
    },

    methods: {
      getPosts: async function () {
          let response;

          try {
            response = await this.get(
              `/posts?per_page=${POSTS_PER_PAGE}&page=${this.page}`
            );
            this.totalPages = response.headers['x-wp-totalpages'];
          } catch (error) {
              bus.$emit('showUpdater', 'Are you sure that\'s a valid endpoint?');
              bus.$emit('toggleLoading', false);
            return;
          }

          this.posts = await this.getFeaturedImages(response.data);
          // console.log("Post:", this.posts, "Pages: ", this.totalPages);

          // Added if statement
          if (this.totalPages >= 2) {
            this.getAdjacentPageData();
          }

          bus.$emit('toggleLoading', false);
        },

      setTarget: function () {
          return (this.enabled = "_blank");
      },

      getAdjacentPageData: async function (prevPage = false) {

          let page = prevPage === true ?
            parseInt(this.page) - 1 :
            parseInt(this.page) + 1;

          let response;

          if (page > 0) {
            try {
              response = await this.get(
                `/posts?per_page=${POSTS_PER_PAGE}&page=${page}`,
              );
            } catch (error) {
              console.error(error);
            }

            // response.data.forEach((post) => {
            //   if (post.featured_media > 0) return;
            //   this.get(`/media/${post.featured_media}`);
            // });
            // 
            // Don't want to use above snippet for now. This removes the images on the main city feed showing up
            // Mostly removed to stop console errors for response.data.forEach returning no data due to missing featured images on post
          }

          if (!prevPage) {
            this.getAdjacentPageData(true);
          }
        },

      getFeaturedImages: function (posts) {
        return new Promise((resolve) => {
          let requests = posts.map((post) => {
            return new Promise(async (resolve) => {
              let response;

              try {

                if (post.featured_media <= 0) {
                  throw "No image.";
                }

                response = await this.get(
                  `/media/${post.featured_media}`
                );
                post.featured_image = response.data.media_details.sizes['medium'].source_url;
              } catch (error) {
                post.featured_image = null;
              }

              resolve(post);
            });
          });

          Promise.all(requests).then((posts) => resolve(posts));
        });
      },

      // Added because rest api already configured via mixins. This was requested after I built out the api as well as async function that included the REST_API variable
      getMenu: function () { axios.get("http://athensadvisor.athensservices.com:81/wp-json/wp-api-menus/v2/menus/5", {})
        .then(response => {
          var menu = [];
          this.menu = response.data.items;
          }, 
        error => {
          console.log('===================================================');
          console.log('Looks like the menu ID changed or has been deleted.');
          console.log('===================================================');
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