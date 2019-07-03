<template>
  <div id="at-global-wrapper" class="at-active-desktop-side-menu">
    <div id="at-side-menu-wrapper">
      <div id="at-side-menu-logo">
        <div class="at-logo">
          <router-link to="/" tag="a">
            <img src="https://athensservices.com/wp-content/uploads/2018/10/Athens-Advisor-logo-1-color-white.png" class="at-logo-image"
              alt="Athens Services" width="100" height="31" style="display: inline;">
          </router-link>
        </div>
      </div>
      <div id="at-side-menu-content">
        <div id="at-side-menu-scroller">
          <nav id="at-side-menu-nav" class="at-mobile-nav">
            <ul id="at-side-menu-menu" class="menu" style="overflow-y: scroll;height: 92vh;">
              <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  bp-menu bp-events-nav menu-item menu-item-type-custom menu-item-object-custom"><a
                  href="https://athensservices.com" :target="setTarget()" class="menu-link main-menu-link"><span class="at-menu-icon fas fa-globe"></span>Athens
                  Corp Site</a></li>
              <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  bp-menu bp-events-nav menu-item menu-item-type-custom menu-item-object-custom"><a
                  href="https://la.athensservices.com" :target="setTarget()" class="menu-link main-menu-link"><span class="at-menu-icon fas fa-globe"></span>Athens
                  LA</a></li>
              <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  bp-menu bp-events-nav menu-item menu-item-type-custom menu-item-object-custom"><a
                  href="http://athenspasadena.com" :target="setTarget()" class="menu-link main-menu-link"><span class="at-menu-icon fas fa-globe"></span>Athens
                  Pasadena</a></li>
              <hr>
              <!-- <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  bp-menu bp-events-nav menu-item menu-item-type-custom menu-item-object-custom"><a
                  href="https://twitter.com/AthensServices" :target="setTarget()" class="menu-link main-menu-link"><span class="at-menu-icon fab fa-twitter"></span>Athens
                  Twitter</a></li>
              <hr>
              <input type="text" placeholder="Search City.." v-model="searchText" /> -->

              <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  bp-menu bp-events-nav menu-item menu-item-type-custom menu-item-object-custom">
                <router-link to="/Cities" tag="a">View All Cities</router-link>
              </li>
              <hr>
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

            </ul>
          </nav>
        </div>
      </div>
      <div id="at-side-menu-toggle"></div>
      <div id="gp-open-side-menu-button"></div>
    </div>

    <div id="at-open-side-menu-button" @click="openMenu"></div>
    <div id="at-close-side-menu-button" @click="closeMenu"></div>

    <div class="at-site-wrapper">
      <header id="at-standard-header" class="at-main-header at-container">
        <div class="at-container">
          <div class="at-nav-column">
            <nav id="at-main-header-primary-nav" class="at-nav">
              <ul id="at-main-header-primary-menu" class="menu">
                <li class="at-standard-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  menu-item menu-item-type-custom menu-item-object-custom current-menu-item acurrent_page_item menu-item-home">
                <router-link to="/" tag="a">Home</router-link></li>
                <li v-for="(id, index) in menu" v-bind:key="index" :id="id" class="at-content-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a :href='`${ id.url }`' :target="setTarget()">{{ id.title }}</a>
                </li>
                <li class="at-content-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a :href='`${ REST_URL }wp-admin/nav-menus.php?action=edit&menu=5`'><i class="fa fa-plus"></i></a>
                </li>
                <li class="at-content-menu at-show-all  main-menu-item  menu-item-even menu-item-depth-0  menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a href="#" class="date-disabled">{{getFormattedDate(new Date())}}</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="at-header-buttons at-nav menu">
          <div class="at-search-button at-header-button">
            X
          </div>
        </div>
        <div class="at-clear"></div>
      </header>
    </div>
    <!-- <Breadcrumb /> -->
  </div>
</template>

<script>
  import bus from '../bus';
  import ajax from '../mixins/ajax';
  import Card from '../components/Card';
  import Pagination from '../components/Pagination';
  import _ from 'lodash';
  import axios from "axios";

  export default {
    name: 'TopBar',

    mixins: [ajax],

    data() {
      return {
        isSideBarOpen: false,
        searchText: "",
        posts: [],
        page: 1,
        totalPages: null,
        menu: [],
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
      this.getMenu();
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
        document.getElementById('at-side-menu-wrapper').classList.remove("hidden-block");
      },

      closeMenu() {
        this.$emit('closeMenu');
        this.isSideBarOpen = false;
        document.getElementById('at-side-menu-wrapper').style.display = 'block';
        document.getElementById('at-close-side-menu-button').style.display = 'none';
        document.getElementById('at-open-side-menu-button').style.display = 'block';
        document.getElementById('at-side-menu-wrapper').classList.add("hidden-block");
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
      getMenu: function () { axios.get("https://api.revolveyourwaste.com/wp-json/wp-api-menus/v2/menus/5", {})
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
    },

    components: {}
  }
</script>


<style scoped>
  .date-disabled {
    pointer-events: none;
    opacity: 1;
  }

  #at-standard-header {
    background-color: #c81525;
    height: 99px;
    position: relative;
    clear: both;
    z-index: 8999;
  }

  .at-header-above-content #at-standard-header {
    border-bottom: 0 solid #e6e6e6;
  }

  .at-container {
    padding-left: 20px;
    padding-right: 20px;
    z-index: 1;
    position: relative;
    width: 100%;
    margin: 0 auto;
  }

  .at-header-side-menu #at-main-header-primary-nav {
    margin-left: -12px;
    -webkit-flex: 1 0 auto;
    flex: 1 0 auto;
  }

  .at-nav .menu {
    margin: 0;
    height: 100%;
    list-style: none;
  }

  .at-nav {
    height: 100%;
  }

  #at-standard-header .menu>.menu-item {
    font-family: Nunito, Arial, Helvetica, sans-serif;
    text-transform: none;
    line-height: 18px;
    letter-spacing: 0;
    font-weight: normal;
    font-size: 18px;
    opacity: 1;
    visibility: visible;
    -webkit-transition: opacity .24s ease-in-out;
    -moz-transition: opacity .24s ease-in-out;
    transition: opacity .24s ease-in-out;
  }

  .at-header-side-menu #at-main-header-primary-nav {
    margin-left: -12px;
    -webkit-flex: 1 0 auto;
    flex: 1 0 auto;
  }

  .at-nav .menu>.menu-item>a,
  .at-nav .menu>.menu-item>.at-menu-text {
    display: -webkit-inline-flex;
    display: -webkit-inline-box;
    display: inline-flex;
    position: relative;
    height: 100%;
    padding: 0 12px;
    line-height: 1 !important;
    font-family: inherit;
    -webkit-align-items: center;
    align-items: center;
  }

  #at-standard-header .menu>.menu-item>a:hover,
  #at-standard-header .menu>.menu-item .at-more-menu-items-icon:hover {
    color: #fff;
    text-decoration: none;
  }

  .at-nav .menu>.menu-item {
    float: left;
    height: 100%;
    white-space: nowrap;
  }

  .at-header-side-menu .at-nav-column {
    width: 100%;
  }

  .at-nav .menu-item {
    display: inline-block;
  }

  .at-nav-column {
    display: -webkit-flex;
    display: flex;
  }

  #at-standard-header .at-container {
    display: -webkit-flex;
    display: flex;
    height: 100%;
  }

  #at-main-header-primary-nav>.menu>.menu-item.current-menu-item>a {
    color: #fff;
  }

  #at-standard-header .menu>.menu-item>a,
  #at-standard-header .menu>.menu-item .at-more-menu-items-icon {
    color: #ffb2ab;
  }

  .at-nav .menu-item-has-children>a:after,
  .at-nav .at-tab-content-menu>a:after,
  .at-nav .at-content-menu>a:after {
    display: none;
    content: '\f107';
    font-family: 'FontAwesome';
    margin-left: 5px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .at-nav .at-standard-menu {
    position: relative;
  }

  .at-nav .menu-item {
    display: inline-block;
  }

  ul {
    margin: 0 0 12px 24px;
    padding: 0;
    list-style-type: square;
  }

  ol,
  ul {
    list-style: none;
  }

  .at-header-side-menu .at-header-buttons,
  .at-header-side-menu #at-main-header-secondary-nav {
    float: right;
  }

  .at-header-button {
    position: relative;
    z-index: 2;
    float: left;
    height: 100%;
    padding: 0 8px;
    line-height: 1;
    cursor: pointer;
    -webkit-align-items: center;
    align-items: center;
  }

  #at-standard-header .at-header-button:before,
  #at-standard-header .at-cart-button .at-cart-bag {
    color: #ffb2ab;
    font-size: 18px;
  }

  .at-search-button:before {
    font-family: 'FontAwesome';
    content: '\f002';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .at-header-button:before {
    -webkit-transition: all .2s ease-in-out !important;
    transition: all .2s ease-in-out !important;
  }

  .at-header-buttons {
    display: -webkit-flex;
    display: none;
    float: left;
    height: 100%;
  }

  .at-search-button-all .at-search-button,
  .at-search-button-mobile .at-search-button {
    display: -webkit-flex;
    display: flex;
  }

  #at-global-wrapper.at-active-desktop-side-menu #at-side-menu-wrapper {
    width: 15%;
  }

  #at-side-menu-wrapper {
    background-color: #363940;
  }

  #at-side-menu-wrapper {
    z-index: 1000;
    overflow: hidden;
    position: fixed;
    left: 20%;
    width: 0;
    height: 100%;
    margin-left: -20%;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  @media only screen and (min-width: 1200px) {
    #at-global-wrapper.at-active-desktop-side-menu {
      padding-left: 15%;
    }
  }

  #at-global-wrapper {
    padding-left: 0;
    -webkit-transition: padding-left .5s ease;
    -moz-transition: padding-left .5s ease;
    -o-transition: padding-left .5s ease;
    transition: padding-left .5s ease;
  }

  #at-side-menu-toggle,
  #at-open-side-menu-button {
    color: #fff;
  }

  #at-side-menu-toggle,
  #at-open-side-menu-button {
    background-color: #3f424a;
  }

  #at-open-side-menu-button {
    z-index: 1000;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    font-size: 30px;
    line-height: 50px;
    font-family: 'FontAwesome';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
    text-align: center;
    opacity: 1;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  #at-open-side-menu-button:before {
    content: '\f057';
  }

  .at-site-wrapper {
    position: relative;
    overflow: hidden;
    -webkit-transition: top .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .at-header-side-menu #at-side-menu-logo {
    height: 90px;
  }

  #at-side-menu-logo {
    border-bottom: 0 solid #e6e6e6;
  }

  #at-side-menu-logo {
    background-color: #e4001c00;
  }

  @media only screen and (min-width: 992px) {
    #at-side-menu-logo {
      display: block;
      background-color: #c81525;
    }
  }

  #at-side-menu-logo {
    height: 99px;
    overflow: hidden;
    padding: 10px 29px;
  }

  .at-logo {
    display: -webkit-flex;
    display: flex;
    position: relative;
    height: 100%;
    line-height: 0;
    -webkit-flex: 1 1 0;
    flex: 1 1 0;
    -webkit-align-items: center;
    align-items: center;
  }

  #at-side-menu-nav {
    background-color: #3f424a;
  }

  #at-side-menu-nav {
    overflow: hidden;
    width: 100%;
    height: auto;
  }

  #at-side-menu-nav .menu {
    overflow: hidden;
    margin: 0;
    padding: 20px 0;
  }

  #at-side-menu-nav .menu-item {
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
  }

  .at-mobile-nav .menu-item:first-child {
    border-top: 0;
  }

  .at-mobile-nav .menu-item {
    position: relative;
    float: left;
    width: 100%;
    list-style-type: none;
  }

  #at-side-menu-nav .menu-item a,
  #at-side-menu-nav .menu-item .at-mobile-dropdown-icon {
    color: #fff;
  }

  #at-side-menu-nav .menu-item a,
  #at-side-menu-nav span.at-menu-header,
  #at-side-menu-nav .menu-item>.at-menu-text {
    padding: 10px 20px;
  }

  .at-mobile-nav .menu-item a,
  .at-mobile-nav span.at-menu-header,
  .at-mobile-nav .menu-item .at-menu-text {
    display: block;
    padding: 15px 0;
  }

  .at-mobile-nav .at-menu-icon {
    padding-right: 10px;
  }

  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .fa-list:before {
    content: "\f03a";
  }

  .fa-calendar:before {
    content: "\f073";
  }

  #at-side-menu-toggle,
  #at-open-side-menu-button {
    color: #fff;
  }

  #at-side-menu-toggle,
  #at-open-side-menu-button {
    background-color: #3f424a;
  }

  #at-open-side-menu-button {
    z-index: 1000;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    font-size: 30px;
    line-height: 50px;
    font-family: 'FontAwesome';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
    text-align: center;
    opacity: 1;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  /* #gp-open-side-menu-button:before {
    content: '\f057';
  } */

  hr {
    border-bottom: 1px solid #ffffff;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    width: 90%;
    margin: 10px;
  }

  input,
  select,
  textarea {
    appearance: none;
    background-color: #fff;
    border: 1px solid #fafafa;
    border-radius: 3px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-bottom: 0.75em;
    padding: 0.5em;
    transition: border-color 150ms ease;
    width: 90%;
    display: block;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    margin: 5%;
  }

  @media all and (max-width: 940px) {
    #at-global-wrapper.at-active-desktop-side-menu #at-open-side-menu-button {
      opacity: 1;
    }
  }

  #at-close-side-menu-button {
    z-index: 1000;
    position: fixed;
    bottom: 0;
    left: 0px;
    width: 50px;
    height: 50px;
    font-size: 30px;
    line-height: 50px;
    font-family: 'FontAwesome';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
    text-align: center;
    opacity: 1;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
    background-color: #363940;
    color: white;
  }

  #at-close-side-menu-button:before {
    content: '\f18e';
  }

  @media only screen and (min-width: 970px) {
    #at-global-wrapper.at-active-desktop-side-menu #at-open-side-menu-button {
      opacity: 0;
      display: none;
    }

    #at-close-side-menu-button {
      opacity: 0;
      display: none;
    }
  }

  @media only screen and (max-width: 970px) {
    #at-global-wrapper.at-active-desktop-side-menu #at-side-menu-wrapper {
      width: 0%;
    }

    .bread-crumb {
      margin-left: 0%;
    }

    #side-menu #at-side-menu-wrapper {
      width: 55%;
    }

    .at-container {
      padding-left: 5px;
    }

    #at-global-wrapper>div.bread-crumb>h1>a {
      padding-left: 15px;
    }

    .hidden-block {
      display: block !important;
      width: 60% !important;
    }
  }

  @media all and (max-width: 977px) {
    #at-side-menu-wrapper {
      display: block !important;
    }
  }
  
</style>