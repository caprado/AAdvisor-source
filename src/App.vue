<template>
  <div id="app">

    <TopBar @showUpdater="showUpdater = true" />

    <div id="wrapper">
      <Updater v-if="showUpdater" :error="error" @close="showUpdater = false" />
      <Loading v-if="loadingOn" :message="loadingMessage" :showWheel="loadingWheel" />
      <router-view :key="this.viewKey"></router-view>
    </div>

    <Foot />
  </div>
</template>

<script>
  import bus from './bus';
  import Foot from './components/Foot';
  import Loading from './components/Loading';
  import Updater from './components/Updater';
  import TopBar from './components/TopBar';
  import Raven from 'raven-js';
  import RavenVue from 'raven-js/plugins/vue';

  Raven
    .config('https://e4567b23bf3a45a58628d3244d1a704d@sentry.io/1303308')
    .addPlugin(RavenVue, Vue)
    .install();

  export default {
    name: 'App',

    data() {
      return {
        error: '',
        loadingOn: true,
        loadingMessage: 'Loading Data',
        loadingWheel: true,
        showUpdater: false,
        viewKey: 0,
      }
    },

    created: function () {

      this.assignEndpointFromURL();

      bus.$on('toggleLoading', (status = false) => {

        if (typeof status === 'string') {
          this.loadingOn = true;
          this.showWheel = false;
          this.loadingMessage = status;
          return;
        }

        this.loadingMessage = 'Loading...';
        this.loadingWheel = true;
        this.loadingOn = status;
      });

      bus.$on('bumpViewKey', (loadingMessage) => {
        bus.$emit('toggleLoading', loadingMessage);
        this.viewKey = this.viewKey + 1;
      });

      bus.$on('showUpdater', (errorMessage) => {
        this.showUpdater = true;
        this.error = errorMessage;
      });

      bus.$on('clearError', () => {
        this.error = '';
      });
    },

    methods: {
      assignEndpointFromURL: function () {
        let endpoint = this.getQueryString('endpoint');

        if (!endpoint) return;

        this.$store.commit('updateEndpoint', endpoint);
      }
    },

    components: {
      Foot,
      Loading,
      Updater,
      TopBar
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/_base.scss";

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #wrapper {
    // width: 85%;
    // margin: 0 auto;
    // padding: 1rem;
    // margin-left: 15%;
    // margin-right: 15%;

    @include media($small) {
      padding: 2rem;
    }
  }

  /*   styles for tablets and smaller screens     */

  // @media all and (max-width: 954px) {
  //   .col-sm-5[data-v-32738634] {
  //     padding-top: 4.5%;
  //     width: 85%;
  //     float: left;
  //     margin: 0 auto;
  //   }

  //   .container-social[data-v-4e939c8a] {
  //     background-color: #ebebeb;
  //     width: 90%;
  //     padding: 3%;
  //     border: 1px dotted #ccc;
  //     margin-bottom: 1%;
  //     margin: 0 auto;
  //   }

  //   .col-sm-7[data-v-32738634] {
  //     width: 90%;
  //   }

  //   #wrapper {
  //     width: 85%;
  //     padding: 1rem;
  //     margin-left: 16% !important;
  //   }
  // }

  /*   styles for mobile     */

  @media all and (max-width: 582px) {
    // .col-sm-5[data-v-32738634] {
    //   padding-top: 4.5%;
    //   width: 85%;
    //   float: left;
    //   margin: 0 auto;
    // }

    // .container-social[data-v-4e939c8a] {
    //   background-color: #ebebeb;
    //   width: 90%;
    //   padding: 3%;
    //   border: 1px dotted #ccc;
    //   margin-bottom: 1%;
    //   margin: 0 auto;
    // }

    // .col-sm-7[data-v-32738634] {
    //   width: 90%;
    // }

    // #wrapper {
    //   width: 85%;
    //   padding: 1rem;
    //   margin-left: 21% !important;
    // }


    #at-global-wrapper.at-active-desktop-side-menu #at-side-menu-wrapper[data-v-14742745] {
      width: 28%;
    }

    // #at-close-side-menu-button,
    // #at-open-side-menu-button {
    //   display: none;
    // }

    #at-side-menu-wrapper[data-v-14742745] {
      overflow-y: scroll;
    }
  }
    @media (max-width: 1024px) {
    .col-sm-7 {
        width: 100% !important;
    }
    #at-side-menu-wrapper {
      display:block!important;
    }
    #wrapper {
      width: 85% !important;
      margin-left: 15% !important;
  }
    .col-sm-5{
      display: none;
    }
 }

  @media (min-width: 1025px) {
    #wrapper {
        width: 85% !important;
        margin-left: 15% !important;
    }
    #at-side-menu-wrapper {
      display:block!important;
    }
  }
    @media only screen and (max-width: 582px) {
    #wrapper {
      width: 100%!important;
      padding: 1rem!important;
      margin-left: 0% !important;
}
    h1, h2, h3, h4, h5, h6 {
        font-size: 1.1rem;
    }
        .col-sm-5{
      display: none;
    }
    #gp-open-side-menu-button {
      display: none;
    }
 }
</style>