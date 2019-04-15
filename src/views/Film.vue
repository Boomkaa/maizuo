<template>
  <div class="film-list">
    <div class="city-fixed">
      <span>深圳</span>
      <i class="iconfont icon-xiala"></i>
    </div>

    <Banner :banners="bannerList"></Banner>

    <div class="tabs-bar-wrapper">
      <div class="tabs-bar">
        <ul class="tabs-nav">
          <li
            style="width: 50%;"
            v-for="item in filmTypes"
            :key="item.id"
            :class="{active:curType === item.id}"
            @click="cutType(item)"
          >
            <span>{{ item.name }}</span>
          </li>
          <div class="tab-ink-bar-wrapper" :style="tabsIinkBarStyle">
            <span class="tab-ink-bar" style="width: 56px;"></span>
          </div>
        </ul>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import Banner from "../components/Banner";
import axios from "axios";
export default {
  data() {
    return {
      //banner图数据
      bannerList: [],
      //热映与上映
      filmTypes: [
        { id: "nowPlaying", name: "正在热映", href: "/films/nowPlaying" },
        { id: "comingSoon", name: "即将上映", href: "/films/comingSoon" }
      ],
      curType: this.$route.path.substring(7)
    };
  },

  components: {
    Banner
  },

  computed: {
    tabsIinkBarStyle() {
      let obj = {
        transform: "translate3d(0%, 0px, 0px)",
        width: "50%"
      };
      if (this.curType === "comingSoon") {
        obj.transform = "translate3d(100%, 0px, 0px)";
      }
      return obj;
    }
  },

  methods: {
    getBannerList() {
      axios
        .get("https://m.maizuo.com/gateway?type=2&cityId=110100&k=4336920", {
          headers: {
            "X-Client-Info":
              '{"a":"3000","ch":"1002","v":"1.0.0","e":"15543701721503238553747"}',
            "X-Host": "mall.cfg.common-banner"
          }
        })
        .then(res => {
          let data = res.data;
          //表示请求成功
          if (data.status === 0) {
            this.bannerList = data.data;
            //console.log(data.data);
          } else {
            alert(data.msg);
          }
        });
    },
    cutType(type) {
      this.curType = type.id;
      this.$router.push(type.href);
    }
  },

  mounted() {
    this.getBannerList();
  }
};
</script>

<style lang="less">
@import "../styles/common/mixins";

.film-list {
  .city-fixed {
    position: absolute;
    top: 18px;
    left: 7px;
    color: #fff;
    z-index: 10;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.2);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    padding: 0 5px;

    i {
      font-size: 10px;
    }
  }
}
.tabs-bar-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
  overflow-x: hidden;
  background: #fff;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  .tabs-bar {
    .border-1-bottom;
    height: 49px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
    position: relative;

    .tabs-nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      width: 100%;

      li {
        flex-shrink: 0;
        color: #191a1b;
        text-align: center;
        height: 16px;
        line-height: 16px;
        font-size: 14px;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        &.active {
          color: #ff5f16;
        }
      }

      .tab-ink-bar-wrapper {
        position: absolute;
        margin: auto;
        top: 30px;
        left: 0;
        transform: translateZ(0);
        transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);

        .tab-ink-bar {
          border-bottom: 2px solid #ff5f16;
          border-radius: 20px;
          display: block;
          margin: auto;
        }
      }
    }
  }
}
</style>
