<template>
  <div id="app">
    <el-col :offset="1" :span="22">
      <el-row id="header">
        <el-col :md="3" :sm="4" :xs="6" >
          <img src="./assets/logo.png" :width="100" :height="100">
        </el-col>
        <el-col :md="21" :sm="20" :xs="18">
          <h1>two-way-bind-sample</h1>
          <h2>try vuex-map-fields</h2>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12" :gutter="10">
          <h3>vuex state direct modify</h3>
          <el-card class="box-card">
            <div slot="header">
              <span>{{nameDirect}}</span>
              <el-button @click="directVisible = !directVisible" style="float: right; padding: 3px 0" type="text">edit</el-button>
              <div class="tags">
                <el-tag v-for="(meta, index) in metaDirect" :key="`pure-meta-${index}`">{{meta}}</el-tag>
              </div>
            </div>
            <el-card class="box-card" v-for="(post, index) in postsDirect" :key="`pure-post-${index}`">
              <div slot="header">
                <span>{{ post.title }}</span>
                <el-button @click="editPost(post, index, true)" style="float: right; padding: 3px 0" type="text">edit</el-button>
                <div class="tags">
                  <el-tag v-for="(keyword, index) in post.keywords" :key="`pure-keyword-${index}`">{{ keyword }}</el-tag>
                </div>
              </div>
              {{ post.text }}
            </el-card>
          </el-card>
        </el-col>

        <el-col :span="12" :gutter="10">
          <h3>use vuex-map-fields + α</h3>
          <el-card class="box-card">
            <div slot="header">
              <span>{{nameMap}}</span>
              <el-button @click="mapVisible = !mapVisible" style="float: right; padding: 3px 0" type="text">edit</el-button>
              <div class="tags">
                <el-tag v-for="(meta, index) in metaMap" :key="`map-meta-${index}`">{{meta}}</el-tag>
              </div>
            </div>
            <el-card class="box-card" v-for="(post, index) in posts" :key="`map-post-${index}`">
              <div slot="header">
                <span>{{ post.title }}</span>
                <el-button @click="editPost(post, index, false)" style="float: right; padding: 3px 0" type="text">edit</el-button>
                <div class="tags">
                  <el-tag v-for="(keyword, index) in post.keywords" :key="`map-keyword-${index}`">{{ keyword }}</el-tag>
                </div>
              </div>
              {{ post.text }}
            </el-card>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog
        :visible="directVisible"
        @close="directVisible = !directVisible"
        :close-on-click-modal="false"
      >
        <el-form label-position="top">
          <el-form-item label="Name">
            <el-input v-model="nameDirect" />
          </el-form-item>
          <el-form-item label="Meta">
            <div>
              <el-tag
                v-for="(meta, index) in metaDirect"
                :key="`direct-meta-dialog-${index}`"
                closable
                @close="metaDirect.splice(index, 1)"
              >{{meta}}</el-tag>
              <el-input
                v-model="newMeta"
                placeholder="Tag to be added"
                @keypress.enter.native="
                  metaDirect.push(newMeta)
                  newMeta = ''"
              >
                <div slot="prepend">
                  Add Enter
                </div>
              </el-input>
            </div>
          </el-form-item>
        </el-form>

      </el-dialog>

      <el-dialog
        :visible="mapVisible"
        @close="mapVisible = !mapVisible"
        :close-on-click-modal="false"
      >
        <el-form label-position="top">
          <el-form-item label="Name">
            <el-input v-model="nameMap" />
          </el-form-item>
          <el-form-item label="Meta">
            <div>
              <el-tag
                v-for="(meta, index) in metaMap"
                :key="`direct-meta-dialog-${index}`"
                closable
                @close="metaMap = [...metaMap.filter((meta, idx) => idx !== index)]"
              >{{meta}}</el-tag>
              <!--suppress JSUnresolvedFunction -->
              <el-input
                v-model="newMeta"
                placeholder="Tag to be added"
                @keypress.enter.native="
                  metaMap = [...metaMap, newMeta]
                  newMeta = ''"
              >
                <div slot="prepend">
                  Add Enter
                </div>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog
        :visible="directPostVisible"
        @close="directPostVisible = !directPostVisible"
        :close-on-click-modal="false"
      >
        <el-form label-position="top">
          <el-form-item label="Title">
            <el-input v-model="editing.post.title" />
          </el-form-item>
          <el-form-item label="Keyword">
            <div>
              <el-tag
                v-for="(keyword, index) in editing.post.keywords"
                :key="`direct-keyword-dialog-${index}`"
                closable
                @close="editing.post.keywords.splice(editing.index, 1)"
              >{{keyword}}</el-tag>
              <el-input
                v-model="newKeyword"
                @keypress.enter.native="
                  editing.post.keywords.push(newKeyword)
                  newKeyword = ''"
              >
                <div slot="prepend">
                  Add Enter
                </div>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>


      <el-dialog
        :visible="mapPostVisible"
        @close="mapPostVisible = !mapPostVisible"
        :close-on-click-modal="false"
      >
        <el-form label-position="top">
          <el-form-item label="Title">
            <el-input v-model="editing.post.title" />
          </el-form-item>
          <el-form-item label="Keyword">
            <div>
              <el-tag
                v-for="(keyword, index) in editing.post.keywords"
                :key="`map-keyword-dialog-${index}`"
                closable
                @close="editing.post.keywords = [...editing.post.keywords.filter((keyword, idx) => idx !== index)]"
              >{{index}}:{{keyword}}</el-tag>
              <el-input
                v-model="newKeyword"
                @keypress.enter.native="
                  editing.post.keywords = [...editing.post.keywords, newKeyword]
                  newKeyword = ''"
              >
                <div slot="prepend">
                  Add Enter
                </div>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
  </div>
</template>

<script>
  import {
    mapFields,
    mapMultiRowFields,
  } from 'vuex-map-fields';

  export default {

    data() {
      return {
        directVisible: false,
        mapVisible: false,
        directPostVisible: false,
        mapPostVisible: false,
        newMeta: '',
        newKeyword: '',
        editing: {
          post: {},
          index: 0
        }
      }
    },

    methods: {
      editPost(post, index, isDirect) {
        isDirect ? this.directPostVisible = true : this.mapPostVisible = true
        this.editing = {
          post,
          index
        }
      }
    },
    computed: {
      // modify state direct
      nameDirect: {
        get() {
          return this.$store.state.author.name
        },
        set(value) {
          this.$store.state.author.name = value
        }
      },
      postsDirect: {
        get() {
          return this.$store.state.posts
        }
      },
      metaDirect: {
        get() {
          return this.$store.state.meta
        }
      },

      // use vuex-map-fields
      ...mapFields({
        nameMap: 'author.name',
        metaMap: 'meta',
      }),
      // auto inject this
      // nameMap: {
      //   get() {
      //     return this.$store.state.author.name
      //   },
      //   set(value) {
      //     this.$store.commit('updateField', { path: 'author.name', value})
      //   }
      // },

      ...mapMultiRowFields(['posts'])
    },
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  h1, h2 {
    margin: 5px;
    padding: 0;
  }

  h3 {
    text-align: center;
  }

  .tags {
    margin-top: 5px;
  }

  .el-tag {
    margin: 5px;
  }

  .el-card {
    margin-bottom: 10px;
  }
</style>
