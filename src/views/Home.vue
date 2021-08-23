<template>
  <div class="dash">
    <dashNav class="dash-nav"/>
    <div class="page-body">
      <div class="row">
        <div class="col-2 side-bar">
          <dashSide />
        </div>
        <div class="col-10 pg-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashSide from "@/components/SideBar";
import dashNav from "@/components/NavBar.vue"
export default {
  components: {
    dashSide,
    dashNav
  },
  methods: {
    performLogOut() {},
  },
};
</script>

<style scoped lang="scss">
.pg-content {
  padding: 15px;
}
.side-bar {
  // z-index: 2;
  // background-color: $sideBarBackground;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border-right: 1px solid #ccc;
}
.dash-nav {
  z-index: 2;
}
</style>
