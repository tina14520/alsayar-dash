<template>
  <nav>
    <div class="row nav-row">
      <div class="col-10">
        <div class="nav-first-side">
          <div class="nav-logo">
            <h3>Dashboard</h3>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="nav-second-side">
          <div class="nav-icons">
            <div class="nav-icon messages">
            </div>
            <div class="nav-icon notifications">
            </div>
            <div class="nav-icon avatar">
              <img src="@/assets/images/face.jpg" alt="" class="avatar-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.nav-row {
  justify-content: space-between;
}
nav {
  box-shadow: 0px 8px 13px -7px #4c4c4c40;
  padding: 20px;
}
.nav-logo {
  color: $primary;
  text-align: start;
}
.nav-icons {
  display: flex;
  justify-content: flex-end;
  .nav-icon {
    margin-right: 20px;
  }
}
.nav-icon-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.avatar {
  border: 1px solid #ccc;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>