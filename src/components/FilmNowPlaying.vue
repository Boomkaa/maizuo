<template>
  <div class="film-list-content">
    <div class="nowPlayingList-wrap">
      <ul>
        <li class="item" v-for="item in filmsList" :key="item.filmId">
          <router-link
            :to="{
            name:'detail',
            params:{
              id:item.filmId
            }
            }"
          >
            <div class="img">
              <img :src="item.poster" alt>
            </div>
            <div class="info">
              <div class="film-name info-col">
                <span class="name">{{ item.name }}</span>
                <span class="item">{{ item.filmType.name }}</span>
              </div>
              <div class="film-grade info-col" style="visibility: visible;">
                <span class="label">观众评分</span>
                <span class="grade">{{ item.grade }}</span>
              </div>
              <div class="film-actors info-col">
                <span class="label">主演：{{ getActors(item.actors) }}</span>
              </div>
              <div class="film-detail info-col">
                <span class="label">{{ item.nation }} | {{ item.runtime }}分钟</span>
              </div>
            </div>
            <div class="buy">购票</div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="load-more" @click="loadMore" v-if="pageNum < totalPage">加载更多...</div>
    <div class="load-more" v-else>别点了，没有了</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      filmsList: [],
      pageNum: 1,
      pageSize: 10,
      total: 10
    };
  },

  methods: {
    // 获取后台的影片数据
    getList () {
      axios
        .get('https://m.maizuo.com/gateway', {
          params: {
            cityId: 110100,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            type: 1,
            k: 1910691
          },
          headers: {
            'X-Client-Info':
              '{"a":"3000","ch":"1002","v":"1.0.0","e":"15543701721503238553747"}',
            'X-Host': ' mall.film-ticket.film.list'
          }
        })
        .then(res => {
          let data = res.data;
          if (data.status === 0) {
            this.total = data.data.total;
            // 追加数据
            this.filmsList.push(...data.data.films);
            //this.filmsList = this.filmsList.concat(data.data.films);
          } else {
            alert(data.msg);
          }
        });
    },

    // 将主演的数组，转换成主演名字
    getActors (actors = []) {
      let temp = actors.map(item => {
        return item.name;
      });
      return temp.join('、');
    },

    // 点击加载更多
    loadMore () {
      this.pageNum++;
      this.getList();
    }
  },

  computed: {
    // 总的页数
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    }
  },

  created () {
    this.getList();
  }
};
</script>

<style lang="less">
@import "../styles/common/mixins";
.film-list-content {
  margin-bottom: 50px;
  ul {
    margin-left: 15px;

    li {
      .border-1-bottom;
      padding: 15px 15px 15px 0;
      height: 94px;
      position: relative;
      box-sizing: content-box;

      > a {
        display: flex;
        align-items: center;
      }

      .img {
        flex-shrink: 0;
        width: 66px;
        height: 94px;
        background: rgb(249, 249, 249);
        img {
          width: 100%;
          border-radius: 2px;
        }
      }

      .info {
        flex: 1;
        padding: 0 10px;
        overflow: hidden;

        .info-col {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }

        .film-name {
          .name {
            max-width: calc(100% - 25px);
            color: #191a1b;
            font-size: 16px;
            height: 22px;
            line-height: 22px;
            margin-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item {
            font-size: 9px;
            color: #fff;
            background-color: #d2d6dc;
            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            border-radius: 2px;
          }
        }

        .film-grade {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
          .grade {
            color: #ffb232;
            font-size: 14px;
          }
        }

        .film-actors {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
        }

        .film-detail {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
        }
      }

      .buy {
        .border-1;
        flex-shrink: 0;
        line-height: 25px;
        height: 25px;
        width: 50px;
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border-radius: 2px;
        position: relative;
      }
    }
  }
  .load-more {
    color: #797d82;
    height: 36px;
    text-align: center;
    line-height: 36px;
  }
}
</style>
