<template>
  <div class="container-wrapper" >
    <div class="row">
      <div class="col-sm-7" v-if="pages && pages.length > 0"> 
        <!-- eslint-disable-next-line vue/max-attributes-per-line -->
        <div class="announcements col-sm-8" v-for="pages of pages" v-bind:key="pages"> 
          <div class="post-container">
            <h3>{{pages.title.rendered}}</h3>
                <div class="post-body" v-html="pages.content.rendered"></div>
          </div>
        </div>
      </div>
      <div class="annoucements col-sm-8" v-else>
        <div class="post-container">
          <h3>No news articles found.</h3>
          <div class="post-body"></div>
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
    axios.get(`http://athensadvisor.athensservices.com:81/wp-json/wp/v2/pages`)
    .then(response => {
      this.pages = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}

let g = "color:#777;font-weight:bold;";
let b = "color:#0F669D;font-weight:bold;";
let base22MainStyle="font-size:34px; font-weight:200; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,0,0.9);";
let base22MessageStyle="font-size:21px; font-weight:200; letter-spacing:0.2em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,25,0.5);";
let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let textChrome = `

       %c%cd8888 888    888                                             %c%cd8888      888          %c%cd8b                           
      d88888 888    888                                            %c%cd88888      888          Y8P                           
     d88P888 888    888                                           %c%cd88P888      888                                        
    d88P 888 888888 88888b.   .d88b.  88888b.  .d8888b           %c%cd88P 888  .d88888 888  888 888 .d8888b   .d88b.  888d888 
   d88P  888 888    888 "88b d8P  Y8b 888 "88b 88K              %c%cd88P  888 d88" 888 888  888 888 88K      d88""88b 888P"   
  d88P   888 888    888  888 88888888 888  888 "Y8888b.        %c%cd88P   888 888  888 Y88  88P 888 "Y8888b. 888  888 888     
 d8888888888 Y88b.  888  888 Y8b.     888  888      X88       d8888888888 Y88b 888  Y8bd8P  888      X88 Y88..88P 888     
d88P     888  "Y888 888  888  "Y8888  888  888  88888P'      d88P     888  "Y88888   Y88P   888  88888P'  "Y88P"  888     %c

`;

let textOthers = `

       d8888 888    888                                             d8888      888          d8b                           
      d88888 888    888                                            d88888      888          Y8P                           
     d88P888 888    888                                           d88P888      888                                        
    d88P 888 888888 88888b.   .d88b.  88888b.  .d8888b           d88P 888  .d88888 888  888 888 .d8888b   .d88b.  888d888 
   d88P  888 888    888 "88b d8P  Y8b 888 "88b 88K              d88P  888 d88" 888 888  888 888 88K      d88""88b 888P"   
  d88P   888 888    888  888 88888888 888  888 "Y8888b.        d88P   888 888  888 Y88  88P 888 "Y8888b. 888  888 888     
 d8888888888 Y88b.  888  888 Y8b.     888  888      X88       d8888888888 Y88b 888  Y8bd8P  888      X88 Y88..88P 888     
d88P     888  "Y888 888  888  "Y8888  888  888  88888P'      d88P     888  "Y88888   Y88P   888  88888P'  "Y88P"  888   
  
`;


// There is no better web brower for developers, right?
if( isChrome ) {
  console.log(textChrome, g,b,g,b,g,b,g,b,g,b,g,b,g,b,g,b,g);	
  console.log("%cAthens Advisor",base22MainStyle),
  console.log("%chttp://athensadvisor.athensservices.com",base22MessageStyle),
  console.log("%c","font-size:34px; line-height:1.4em;");
} else {
	console.log(textOthers);	
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

  h3 {
    margin: 0.75em 20px;
  }
  
  .content-col-full {
    margin-bottom: 4%;
  }

</style>