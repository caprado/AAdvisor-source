<template>
  <div>
    <ul>
      <Card v-for="post in orderedPost" :post="post" :key="post.id" />
    </ul>

    <Pagination :currentPage="parseInt(page)" :totalPages="parseInt(totalPages)"></Pagination>
  </div>
</template>

<script>
  import bus from '../bus';
  import ajax from '../mixins/ajax';
  import Card from '../components/Card';
  import Pagination from '../components/Pagination';
  import _ from 'lodash';

  export default {
    name: 'Feed',

    mixins: [ajax],

    data() {
      return {
        isSideBarOpen: false,
        searchText: "",
        posts: [],
        page: 1,
        totalPages: null
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
      }
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
      openMenu() {
        this.$emit('openMenu');
        this.isSideBarOpen = true;
        document.getElementById('at-side-menu-wrapper').style.display = 'none';
        document.getElementById('at-open-side-menu-button').style.display = 'none';
        document.getElementById('at-close-side-menu-button').style.display = 'block';
        document.getElementById('at-side-menu-wrapper').classList.remove("mystyle");
      },
      closeMenu() {
        this.$emit('closeMenu');
        this.isSideBarOpen = false;
        document.getElementById('at-side-menu-wrapper').style.display = 'block';
        document.getElementById('at-close-side-menu-button').style.display = 'none';
        document.getElementById('at-open-side-menu-button').style.display = 'block';
        document.getElementById('at-side-menu-wrapper').classList.add("mystyle");
      },

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


          // This was added "IF" statement
          if (this.totalPages >= 2) {
            this.getAdjacentPageData();
          }
          // ^^

          bus.$emit('toggleLoading', false);
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
              
              // Don't want to use above snippet for now. This removes the images on the main city feed showing up
              // Mostly removed to stop console errors for response.data.forEach returning no data
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
          }
    },

    components: {
      Card,
      Pagination
    }
  }
</script>

<style scoped lang="scss">
  section {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 3rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, auto));
    grid-gap: 1rem;
  }
</style>