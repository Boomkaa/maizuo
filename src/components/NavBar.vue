<template>
  <ul class="nav-bar">
    <li class="films" v-for="(item,index) in tabs" :key="index">
      <router-link :to="item.href" active-class="active">
        <i :class="['iconfont',item.icon]"></i>
        <span>{{ item.name }}</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array
    }
  }
}
</script>

<style lang="less">
@import "../styles/common/mixins";
.nav-bar {
  .border-1-top;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  z-index: 100;
  background: #fff;
  list-style: none;

  li {
    width: 25%;
    text-align: center;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 49px;
    line-height: 28px;
    position: relative;
    color: #797d82;

    .iconfont {
      font-size: 22px;
    }

    span {
      font-size: 10px;
      line-height: 12px;
      word-break: keep-all;
    }

    &.active {
      color: #ff5f16;
    }
  }
}

// header
.header {
  .border-1-bottom;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 3000;
  background-color: #fff;
  display: flex;

  .left {
    min-width: 15%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
    font-size: 14px;

    i {
      font-size: 10px;
    }
  }

  .right {
    width: 15%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 15px;

    i {
      font-size: 20px;
    }
  }

  .title {
    text-align: center;
    font-size: 18px;
    color: #191a1b;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
