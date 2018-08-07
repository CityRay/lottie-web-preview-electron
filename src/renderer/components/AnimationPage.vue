<template>
    <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Lottie Preview</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="isSuccess || isFailed">
        <v-btn
          color="teal"
          flat
        >
            <v-icon
                @click="openFile"
            >
                OPEN
            </v-icon>
        </v-btn>
      </span>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <div class="container" v-show="isInitial">
            <form enctype="multipart/form-data" novalidate>
              <h1>Upload Json File</h1>
              <div class="dropbox">
                <input id="input-file" type="file" :name="'document'" @change="filesChange($event.target.files);" accept="application/json" class="input-file">
                <p>
                  Drag your file here to begin<br> or click to browse
                </p>
              </div>
            </form>
          </div>
          <div class="container text-xs-center" v-show="isSuccess">
            <input id="input-file2" type="file" :name="'document'" @change="filesChange($event.target.files);" accept="application/json" class="input-file2">
            <div id="lottie"></div>
          </div>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&nbsp; &copy; 2018 - Ray Lin </span>
    </v-footer>
  </v-app>
</template>

<script>
import lottie from 'lottie-web'
import fs from 'fs'

export default {
  name: 'animation-page',
  components: {},
  data () {
    return {
      animate1: null,
      currentStatus: 0,
      status: {},
      drawer: null
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === 0
    },
    isSuccess () {
      return this.currentStatus === 1
    },
    isFailed () {
      return this.currentStatus === 2
    }
  },
  mounted () {
    this.runAnimation()
  },
  methods: {
    openFile () {
      document.getElementById('input-file2').click()
    },
    filesChange (file) {
      if (file[0]) {
        this.runAnimation(file[0].path)
      }
    },
    runAnimation (dataPath = '') {
      if (dataPath) {
        // let animatePath = 'uploadAniate.json'

        if (this.animate1) {
          this.animate1.destroy()
        }

        fs.readFile(dataPath, 'utf-8', (err, data) => {
          if (!err) {
            this.currentStatus = 1

            this.animate1 = lottie.loadAnimation({
              container: document.getElementById('lottie'),
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData: JSON.parse(data)
            })

            // fs.writeFile(animatePath, data, (err) => {
            //   if (!err) {
            //     this.animate1 = lottie.loadAnimation({
            //       container: document.getElementById('lottie'),
            //       renderer: 'svg',
            //       loop: true,
            //       autoplay: true,
            //       path: animatePath
            //     })

            //     this.animate1.addEventListener('complete', this.onCompleteAnimate)
            //   }
            // })
          }
        })
      }
    },
    onCompleteAnimate () {
      console.log('onCompleteAnimate')
    }
  }
}
</script>

<style>
#lottie {
    width: 720px;
    height: 450px;
}

.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: transparent;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  .input-file2 {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    z-index: 999;
  }
  .dropbox:hover {
    background: rgba(255,255,255,0.1); /* when mouse over to the drop zone, change color */
  }
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
