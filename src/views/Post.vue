<template>
  <div>
    <router-link to="/Cities" tag="a">View All Cities</router-link> | <a :href='`${ REST_URL }wp-admin/post-new.php`'>Add City</a>
      <header>
        <ul>
          <li>
            <strong style="color: black;" v-html="title"></strong> 
          </li>
          <li>
            <span>Added {{ date }}</span> | <a style="display: inline;" :href='`${ REST_URL }wp-admin/post.php?post=` + post.id +`&action=edit`'>Edit</a>
          </li>
        </ul>
        <hr>
      </header>
        <img
          v-if="featured_image"
          :src="featured_image"
        >
      <PostBody :content="content"></PostBody>
  </div>
</template>

<script>
  import bus from '../bus';
  import utils from '../mixins/utils';
  import ajax from '../mixins/ajax';
  import PostBody from '../components/PostBody';

  export default {
    name: 'Post',

    mixins: [utils, ajax],

    data () {
      return {
        post: {},
        date: '',
        link: '',
        title: '',
        content: '',
        featured_image: ''
      }
    },

    created: async function () {
      this.post = await this.setPost();
      this.link = this.post.link;
      this.date = this.getFormattedDate(this.post.date);
      this.title = this.post.title.rendered;
      this.content = this.post.content.rendered;
      this.featured_image = await this.getFeaturedImage(this.post.featured_media);

      bus.$emit('toggleLoading', false);
      this.fileIconAdd();
    },

    methods: {
      setPost: function () {
        return new Promise(async (resolve, reject) => {
          let response;

          try {
            response = await this.get(`/posts?slug=${this.$route.params.slug}`);
          } catch (error) {
            this.$router.push({name: 'four-o-four'});
            return;
          }

          resolve(response.data[0]);

        });
      },

      getFeaturedImage: async function (id) {
        let response;
        try {

          if(post.featured_media <= 0) {
            throw "No image.";
          }

          response = await this.get(`/media/${id}`);
        } catch (error) {
          return null;
        }

        return response.data.media_details.sizes['medium'].source_url;
      },

      fileIconAdd: function () {
        var el = document.getElementsByClassName('menu-sub');

        for (var i = 0; i < el.length; i++) {
          var files = el[i].getElementsByTagName('li');
          for (var y = 0; y < files.length; y++) {
            files[y].classList.add('files');
          }
        }
      },
    },

    components: {
      PostBody
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
</style>
