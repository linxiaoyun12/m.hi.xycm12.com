<template>
  <section class="main">
    <div class="content">
      <div class="main-container hi-container-fluid">
        <!-- col-xs- col-sm- col-md- col-lg- -->
        <template v-for="(item,key) in linkInfo">
          <div class="col-md-4 col-sm-6">
            <div class="hi-panel">
              <div class="hi-panel-heading">
                <div class="panel-title">{{item.cate_gory}}</div>
              </div>
              <div class="hi-panel-body">
                <template v-for="(list,key2) in item.link_list">
                  <a
                    :href="list.url"
                    :title="list.title"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >{{list.name}}</a>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
   </section>
</template>

<script>
import data from "@/model/data.js";

export default {
  data() {
    return {
      linkInfo: data //预制链接数据
    };
  },
  methods: {
    
  },
  mounted() {
    
  },
  components: {}
};
</script>

<style lang="scss">
/* bg */

.main-bg {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url('~@/assets/img/bg.jpg');
  background-position: center;
  background-size: cover;
  /* background-attachment: fixed; */
  z-index: -10;
  filter: blur(2px);
}

.hi-panel {
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  border: 1px solid #fff;
  background-color: rgb(36, 35, 35);
  border-radius: 3px;
  margin: 0 7px 14px 7px;
  opacity: 0.8;
}

.hi-panel-heading {
  border-bottom: 1px solid #fff;
  padding: 0.6rem;
}

.hi-panel-body {
  overflow: hidden; /* 清除浮动造成的元素塌陷 */
  padding:1rem;
}

.panel-title {
  height: 1.8rem;
  overflow: hidden;
  font-weight: 600;
}

.hi-panel-body a {
  float: left;
  width: 33.333%;
  height: 3.2rem;
  line-height: 3.2rem;
  border-radius: 3px;
}

.hi-panel-body a:hover {
  background: rgb(128, 127, 127);
}

/* main */
.main-container {
  margin-top: 70px;
  color: #fff;
}

.hi-container-fluid a {
  display: block;
  text-align: center;
}
</style>
