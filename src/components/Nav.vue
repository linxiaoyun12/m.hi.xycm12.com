<template>
    <nav class="nav">
      <div class="content">
        <div class="nav-logo">Xy导航</div>
        <ul class="nav-header">
          <li class="nav-item">
            <a href="javascript:void(0);">资讯</a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0);">翻译</a>
            <div class="nav-dropmenu">
              <div class="nav-dropmenu-item">
                <a href="https://www4.bing.com/translator" target="_blank"
                    rel="noopener noreferrer nofollow">微软翻译</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://fanyi.baidu.com" target="_blank"
                    rel="noopener noreferrer nofollow">百度翻译</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="http://fanyi.youdao.com" target="_blank"
                    rel="noopener noreferrer nofollow">有道翻译</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://translate.google.cn" target="_blank"
                    rel="noopener noreferrer nofollow">Google翻译</a>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0);">地图</a>
            <div class="nav-dropmenu">
              <div class="nav-dropmenu-item">
                <a href="https://map.baidu.com" target="_blank"
                    rel="noopener noreferrer nofollow">百度地图</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://map.qq.com" target="_blank"
                    rel="noopener noreferrer nofollow">腾讯地图</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://www.amap.com" target="_blank"
                    rel="noopener noreferrer nofollow">高德地图</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://www.google.cn/maps" target="_blank"
                    rel="noopener noreferrer nofollow">Google地图</a>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0);">网盘</a>
            <div class="nav-dropmenu">
              <div class="nav-dropmenu-item">
                <a href="https://115.com" target="_blank"
                    rel="noopener noreferrer nofollow">115网盘</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://www.dropbox.com" target="_blank"
                    rel="noopener noreferrer nofollow">Dropbox</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://onedrive.live.com" target="_blank"
                    rel="noopener noreferrer nofollow">OneDrive</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://pan.baidu.com" target="_blank"
                    rel="noopener noreferrer nofollow">百度网盘</a>
              </div>
              <div class="nav-dropmenu-item">
                <a href="https://www.weiyun.com" target="_blank"
                    rel="noopener noreferrer nofollow">腾讯微云</a>
              </div>
            </div>
          </li>
          <li class="nav-item-text">
            <span>天气</span>
          </li>
        </ul>
        <v-search></v-search>
        </div>
      </nav>
</template>


<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
/* header */
.nav {
  width: 100%;
  background-color: hsla(0, 0%, 19%, 0.4);
  box-shadow: 0px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.nav::after{
  display: block;
  content: '';
  clear: both;
}

.nav-header {
  margin: 0;
  padding: 0;
  width: 30rem;
  height: 3.8rem;
  display: inline-block;
  cursor: pointer;
}

.nav-item {
  display: inline-block;
  width: 4.5rem;
  height: 3.8rem;
  line-height: 3.8rem;
  text-align: center;
  position: relative;
}

.nav-item-text {
  display: inline-block;
  width: 4.5rem;
  height: 3.8rem;
  line-height: 3.8rem;
  position: relative;
}

.nav a {
  color: #fff;
  display: block;
}

.nav-logo {
  display: inline-block;
  height: 3.8rem;
  line-height: 3.8rem;
  letter-spacing: 0.3rem;
}


.nav-item > .nav-dropmenu {
  display: none;
  position: absolute;
  top: 3.8rem;
  left: 0;
  width: 9rem;
  max-height: 50rem;
  background-color: rgb(46, 45, 45);
  opacity: 0.9;
  z-index: 10;
  border-radius: 4px;
}

.nav-item:hover .nav-dropmenu {
  display: block;
}

.nav-dropmenu-item a {
  display: block;
  height: 3.8rem;
  font-size: 1.15rem;
  transition: font-size 0.1s; /*过渡效果*/
}

.nav-dropmenu-item a:hover {
  background: rgb(128, 127, 127);
  opacity: 0.95;
  font-size: 1.25rem;
  border-radius: 4px;
}
</style>