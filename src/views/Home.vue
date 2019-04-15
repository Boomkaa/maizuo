<template>
  <div id="home">
    <router-view></router-view>
    <NavBar :tabs="tabs"></NavBar>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      tabs: [
        { name: "电影", href: "/films", icon: "icon-films" },
        { name: "影院", href: "/cinemas", icon: "icon-cinemas" },
        { name: "特惠", href: "/sales", icon: "icon-sales" },
        { name: "我的", href: "/center", icon: "icon-center" }
      ]
    };
  }
};
</script>
