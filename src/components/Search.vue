<template>
  <div class="nav-search">
    <div class="search-from-icon">
      <img src="../assets/img/baidu.svg" v-if="from == 'baidu'">
      <img src="../assets/img/sogou.svg" v-if="from == 'sogou'">
      <img src="../assets/img/qh360.svg" v-if="from == 'qh360'">
      <img src="../assets/img/bing.svg" v-if="from == 'bing'">
      <img src="../assets/img/google.svg" v-if="from == 'google'">
    </div>
    <input
      type="search"
      class="search-input"
      v-model="searchInput"
      @keyup.enter="search(from,searchInput)"
      @input="selectSuggestion(from,searchInput)"
      @keydown.down="changeDown();"
      @keydown.up="changeUp();"
      @focus="suggestions.dis = true,suggestions.from = from"
      @blur="suggestions.dis = false"
      v-bind:placeholder="placeHolder"
    >
    <div class="nav-search-change">
      <a href="javascript:void(0);" @mouseover="suggestions.dis = false" @mouseout="suggestions.dis = true">来源</a>
      <div class="nav-dropmenu">
        <div class="nav-dropmenu-item">
          <a
            href="javascript:void(0);"
            @click="placeHolder = '百度搜索',from = 'baidu'"
            @mouseover="suggestions.dis = false"
          >百度</a>
        </div>
        <div class="nav-dropmenu-item">
          <a
            href="javascript:void(0);"
            @click="placeHolder = '搜狗搜索',from = 'sogou'"
            @mouseover="suggestions.dis = false"
          >搜狗</a>
        </div>
        <div class="nav-dropmenu-item">
          <a
            href="javascript:void(0);"
            @click="placeHolder = '360搜索',from = 'qh360'"
            @mouseover="suggestions.dis = false"
          >360</a>
        </div>
        <div class="nav-dropmenu-item">
          <a
            href="javascript:void(0);"
            @click="placeHolder = '必应搜索',from = 'bing'"
            @mouseover="suggestions.dis = false"
          >Bing</a>
        </div>
        <div class="nav-dropmenu-item">
          <a
            href="javascript:void(0);"
            @click="placeHolder = 'Google搜索',from = 'google'"
            @mouseover="suggestions.dis = false"
          >Google</a>
        </div>
      </div>
    </div>
    <div class="search-suggestions" v-if="suggestions.data.length != 0 && suggestions.dis">
      <template v-for="item,key in suggestions.data">
        <div
          class="search-suggestion-item"
          @mousedown="search(from,item)"
          v-bind:class="{ suggestion_active: index == key }"
          @mouseover="index = -1"
        >{{item}}</div>
      </template>
    </div>
  </div>
</template>

<script>
import storage from "@/model/storage.js";
import { my_axios, jsonp } from "@/model/http.js";

export default {
  data() {
    return {
      from: "baidu",
      placeHolder: "百度搜索", //提示当前使用的搜索引擎
      searchInput: "", //搜索内容暂存
      suggestions: { dis: false, data: [] }, //搜索建议暂存
      index: -1, //被上下方向键选中的搜索建议项目
      catchSuggestion: {
        baidu: [
          //   {
          //       keyword:'', //每条来源于用户输入过的关键词，先判断是否存在再save
          //       suggestions:[] //用来存储对应的搜索建议数组
          //   }
        ],
        sogou: [],
        qh360: [],
        bing: []
      }
    };
  },
  methods: {
    search(e, text) {
      //搜索处理
      var searchText = encodeURIComponent(text);
      if (e === "baidu") {
        this.saveInputConf();
        window.open("https://www.baidu.com/s?wd=" + searchText);
      } else if (e === "sogou") {
        this.saveInputConf();
        window.open("https://www.sogou.com/web?query=" + searchText);
      } else if (e === "qh360") {
        this.saveInputConf();
        window.open(
          "https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&q=" +
            searchText
        );
      } else if (e === "bing") {
        this.saveInputConf();
        window.open("https://www4.bing.com/search?q=" + searchText);
      } else if (e === "google") {
        this.saveInputConf();
        window.open("https://www.google.com/search?q=" + searchText);
      }
    },
    saveInputConf() {
      // 维持用户最后一次使用的搜索框活动
      storage.set("input_conf", {
        from: this.from,
        placeholder: this.placeHolder
      });
    },
    getSuggestion(searchType, strdomin) {
      // 获取搜索建议
      if (searchType === "baidu") {
        const api = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
        const qsData = { wd: strdomin, p: "3" };
        jsonp(api, qsData, { param: "cb" })
          .then(response => {
            this.suggestions = { dis: true, from: "baidu", data: response.s };
            this.catchSuggestionList(searchType, response.s); //缓存关键词及对应关键词数组
          })
          .catch(error => {
            console.log(error);
          });
      } else if (searchType === "qh360") {
        const api = "https://sug.so.360.cn/suggest";
        const qsData = { word: strdomin, encodeout: "utf-8", fields: "word" };
        jsonp(api, qsData)
          .then(response => {
            this.suggestions = { dis: true, from: "qh360", data: response.s };
            this.catchSuggestionList(searchType, response.s); //缓存关键词及对应关键词数组
          })
          .catch(error => {
            console.log(error);
          });
      } else if (searchType === "sogou") {
        const api = "https://www.sogou.com/suggnew/ajajjson";
        const qsData = { key: strdomin, type: "web" };
        jsonp(api, qsData, { timeout: 0 })
          .then(response => {
            //搜狗的搜索建议接口好像必须使用window.sogou.sug作为回调函数
          })
          .catch(error => {
            console.log(error);
          });
        window.sogou = {
          sug: response => {
            this.suggestions = { dis: true, from: "sogou", data: response[1] };
            this.catchSuggestionList(searchType, response[1]); //缓存关键词及对应关键词数组
          }
        };
      } else if (searchType === "bing") {
        const api = "https://api.bing.com/qsonhs.aspx";
        const qsData = { q: strdomin, type: "cb" };
        //JSONP 的说明https://github.com/webmodules/jsonp
        jsonp(api, qsData, { param: "cb" })
          .then(response => {
            let res = [];
            const resArray =
              response.AS.Results === undefined
                ? []
                : response.AS.Results[0].Suggests;
            for (let item of resArray) {
              res.push(item.Txt);
            }
            this.suggestions = { dis: true, from: "bing", data: res };
            this.catchSuggestionList(searchType, res); //缓存关键词及对应关键词数组
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    changeDown() {
      //按下下方向键
      this.index++;
      if (this.index >= this.suggestions.data.length) {
        this.index = 0;
      }
      this.searchInput = this.suggestions.data[this.index];
      // console.log(this.index)
    },
    changeUp() {
      // 按下上方向键
      this.index--;
      if (this.index <= -1) {
        this.index = this.suggestions.data.length - 1;
      }
      this.searchInput = this.suggestions.data[this.index];
      // console.log(this.index)
    },
    selectSuggestion(searchType, strdomin) {
      if (strdomin === "") {
        this.suggestions.data = [];
        return;
      }
      //获取缓存的from对应数组，其中保存的对象解构是{keyword:'',suggestions:[]}
      const result = this.catchSuggestion[searchType].some(
        (item, index, array) => {
          //ES6数组some的方法
          if (item.keyword === strdomin) {
            //关键词存在时获取缓存
            this.suggestions = {
              dis: true,
              from: searchType,
              data: array[index].suggestions
            };
            return true;
          }
        }
      );
      if (!result) {
        //缓存不存在，请求接口并缓存
        this.getSuggestion(searchType, strdomin);
      }
    },
    catchSuggestionList(from, suggestionArray) {
      //缓存搜索建议条目
      let data = { keyword: this.searchInput, suggestions: suggestionArray };
      this.catchSuggestion[from].push(data);
    }
  },
  mounted() {
    try {
      if (storage.get("input_conf") !== null) {
        //读取localstorage中的搜索引擎信息
        const input_conf = storage.get("input_conf");
        //初始化搜索引擎信息，包括来源、搜索框提示
        this.from = input_conf.from;
        this.placeHolder = input_conf.placeholder;
      }
    } catch (err) {
      console.log("当前环境不支持localstorage");
    }
  },
  watch: {
    // searchInput: function(val, oldVal) {
    //   console.log("new: %s, old: %s", val, oldVal);
    // }
  }
};
</script>

<style lang="scss" scoped>
.nav-search {
  float: right;
  width: 26rem;
  height: 3.8rem;
  line-height: 3.8rem;
  color: #fff;
}

.nav-search-change {
  display: inline-block;
  width: 3rem;
  height: 3.8rem;
  line-height: 3.8rem;
  text-align: center;
  position: relative;
  a {
    display: block;
  }
}

.nav-search-change > .nav-dropmenu {
  display: none;
  position: absolute;
  top: 3.8rem;
  left: -6rem;
  width: 9rem;
  max-height: 50rem;
  background-color: rgb(46, 45, 45);
  opacity: 0.9;
  z-index: 10;
  border-radius: 4px;
}

.nav-search-change:hover .nav-dropmenu {
  display: block;
}

.search-input {
  position: relative;
  display: inline-block;
  width: 19.5rem;
  width: 19rem\9\0; /* IE9生效 */
  height: 2.2rem;
  outline: none;
  font-size: 0.9em;
  padding-left: 0.3em;
  border-radius: 0.2em;
  border: 1px solid #f7f1f1; /*默认*/
  -webkit-appearance: none;
}

.search-input:focus {
  border: 1px solid #7cd680; /*聚焦*/
  box-shadow: 0 0 0 2px rgba(68, 71, 70, 0.2);
}

.search-suggestions {
  position: relative;
  left: 3rem;
  width: 23rem;
  background-color: rgb(46, 45, 45);
  opacity: 0.9;
  z-index: 10;
  border-radius: 4px;
}

.search-suggestion-item {
  overflow: hidden;
  width: 22.5rem;
  height: 3.2rem;
  line-height: 3.2rem;
  letter-spacing: 1px;
  padding-left: 0.5rem;
  cursor: pointer;
}

.search-suggestion-item:hover {
  background: rgb(128, 127, 127);
  font-size: 1.25rem;
  border-radius: 4px;
}

.suggestion_active {
  background: rgb(128, 127, 127);
  opacity: 0.95;
  font-size: 1.25rem;
  border-radius: 4px;
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
.search-from-icon {
  width: 2.8rem;
  display: inline-block;
  text-align: center;
  img {
    width: 2.2rem;
    vertical-align: middle;
  }
}
</style>