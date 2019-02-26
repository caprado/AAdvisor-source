<template>
  <div class="container-social">
    <div class="social_bar">
      <div class="twitter-container">
        <a class="twitter-timeline" href="https://twitter.com/AthensServices" data-widget-id="589209632482021376"></a>
      </div>

      <div class="instagram" id="instafeed">
        <h1 class="timeline-Header-title instagram-block">Instagram Posts <span class="timeline-Header-instagram">by <a
              href="https://twitter.com/AthensServices">@AthensServices</a></span></h1>
        <vue-instagram token="7717261160.1677ed0.0f1fcc60a9f04dc287f8c3cd10e3845e" :count="6" mediaType="image">
          <template slot="feeds" slot-scope="props">
            <!-- <li class="fancy-list"> {{ props.feed.user.username }} </li> -->

            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3"><img :src="props.feed.images.standard_resolution.url" alt="Image"></figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image" style="height: 40px; width: 40px;"><img :src="props.feed.user.profile_picture"
                        alt="Image"></figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4"><strong>{{props.feed.user.full_name}}</strong></p>
                    <p class="subtitle is-6">@{{props.feed.user.username}}</p>
                  </div>
                </div>
                <div class="content" style="height: 100px; overflow: auto;">
                  {{props.feed.caption.text}}
                </div>
              </div>
              <footer class="card-footer">
                <p class="card-footer-item"><i class="fa fa-heart"></i> &nbsp; {{props.feed.likes.count}}</p>
                <p class="card-footer-item"><i class="fa fa-commenting"></i> &nbsp; {{props.feed.comments.count}}</p>
                <a :href="props.feed.link" target="_blank" class="card-footer-item"><i class="fa fa-external-link"></i>
                  View</a>
              </footer>
            </div>
          </template>
          <template slot="error" slot-scope="props">
            <div class="fancy-alert"> {{ props.error.error_message }} </div>
          </template>
        </vue-instagram>



      </div>
    </div>
  </div>
</template>

<script>
setTimeout(function(){
      window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));

}, 500);




  import Vue from 'vue'
  import axios from 'axios';
  import VueInstagram from 'vue-instagram'


  export default {
    components: {
      VueInstagram
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .container-social {
    background-color: #ebebeb;
    width: 100%;
    padding: 3%;
    border: 1px dotted #ccc;
    margin-bottom: 1%;
    float: right;
  }

  .timeline-Header-title {
    font-size: 21px;
    font-weight: 300;
    line-height: 24px;
    color: #292F33;
    background-color: white;
  }

  .instagram-block {
    font: normal normal 14px/1.4 Helvetica, Roboto, "Segoe UI", Calibri, sans-serif;
    font-size: 27px;
    line-height: 36px;
    padding: 2%;
    border-radius: 3px;
    font-weight: 300;
    margin-bottom: -3px;
  }

  .timeline-Header-instagram {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #8899A6;
  }

  .timeline-Header-instagram a {
    color: #2b7bb9;
    text-decoration: none;
    outline: 0;
  }
</style>