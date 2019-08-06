<template>
  <div id="city-template">
    <div class="low-res"><h3 style="text-align:center;">This device is not supported.</h3></div>
      <div class="post-data">
          <ul>
            <li>
              <strong style="color: black;" v-html="this.$route.params.title"></strong> |  <a style="display: inline;" :href='`${ REST_URL }wp-admin/post.php?post=` + this.$route.params.id +`&action=edit`'>Edit</a>
            </li>
          </ul>
          <hr>
        <PostBody :content="this.$route.params.content"></PostBody>
        <div class="render-section">
          <div v-if="this.$route.params.slug === 'customer-service'">
            <Feed></Feed>
          </div>
          <div v-else-if="this.$route.params.slug === 'procurement'">

          </div>
          <div v-else-if="this.$route.params.slug === 'it'">

          </div>
          <div v-else></div>
        </div>
      </div>
  </div>
</template>

<script>
  import bus from '../bus';
  import utils from '../mixins/utils';
  import ajax from '../mixins/ajax';
  import PostBody from '../components/PostBody';
  import Feed from '../views/Feed';

  export default {
    name: 'DepartmentPost',

    mixins: [utils, ajax],

    data () {
      return {
        post: {},
        date: '',
        link: '',
        title: '',
        content: ''
      }
    },

    created: async function () {
      this.post = await this.setPost();
      this.content = this.$route.params.content;

      bus.$emit('toggleLoading', false);
    },

    methods: {
      setPost: function () {
        return new Promise(async (resolve, reject) => {
          let response;

          try {
            response = await this.get(`/departments/${this.$route.params.id}`);
          } catch (error) {
            this.$router.push({name: '404'});
            return;
          }

          resolve(response.data[0]);

        });
      }
    },

    components: {
      PostBody,
      Feed
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
      grid-template-columns: auto 1fr;
      grid-gap: 5px;
    }
  }

  li {
    & + & {
      &:before {
        @include media($mobile) {
          content: '|';
          float: left;
          margin: 0 5px 0 0;
        }
      }
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
    // #wrapper {
    //     width: 100% !important;
    //     margin-left: 0% !important;
    // }
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
