<template>
  <div class="items">
    <ul>
      <li class="side-item">
        <router-link :to="`/dashboard/trips`">
          <unicon name="car" fill="#717171" class="side-icon"></unicon>
          Trips
        </router-link>
      </li>
      <li class="side-item">
        <router-link :to="`/dashboard/drivers`">
          <unicon name="user-md" fill="#717171" class="side-icon"></unicon>
          Drivers
        </router-link>
      </li>
      <li class="side-item">
        <router-link :to="`/dashboard/passengers`">
          <unicon name="user-circle" fill="#717171" class="side-icon"></unicon>
          Passengers
        </router-link>
      </li>
      <li class="side-item">
        <router-link :to="`/dashboard/reports`">
          <unicon name="file-medical-alt" fill="#717171" class="side-icon"></unicon>
          Reports
        </router-link>
      </li>
      <li class="side-item">
        <router-link :to="`/dashboard/settings`">
          <unicon name="setting" fill="#717171" class="side-icon"></unicon>
          Settings
        </router-link>
      </li>

      <li class="side-item">
        <router-link :to="`/dashboard/country`">
          <unicon name="map" fill="#717171" class="side-icon"></unicon>
          Countries
        </router-link>
      </li>

      <li class="side-item">
        <router-link :to="`/dashboard/account`">
          <unicon name="user" fill="#717171" class="side-icon"></unicon>
          Accounts
        </router-link>
      </li>

      <li class="side-item">
        <router-link :to="`/dashboard/voucher`">
          <unicon name="bill" fill="#717171" class="side-icon"></unicon>
          Vouchers
        </router-link>
      </li>

      <li class="side-item">
        <router-link :to="`/dashboard/triptype`">
          <unicon name="exchange" fill="#717171" class="side-icon"></unicon>
          Trip Types
        </router-link>
      </li>

      <li class="side-item">
        <router-link :to="`/dashboard/payment`">
          <unicon name="money-bill" fill="#717171" class="side-icon"></unicon>
          Payments
        </router-link>
      </li>

      <li class="signout side-item" @click="performLogOut">
        <router-link :to="`/logout`">
          <unicon name="signout" fill="#717171" class="side-icon"></unicon>
          Log Out
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    performLogOut() {},
  },
};
</script>

<style scoped lang="scss">
.side-bar {
  z-index: 0;
}

// Side Bar
.side-bar {
  .logo {
    text-align: center;
    padding: 10px;
    width: 90%;
    margin: 20px auto;
    img {
      width: 100%;
    }
  }
  .items {
    margin-top: 15px;
    padding: 10px;
    ul {
      list-style-type: none;
      padding-left: 10px;
      padding-right: 10px;
      margin-left: 0px;
      text-align: start;
    }
    li {
      font-size: 16px;
      color: $text;
    }
    a {
      color: $text;
      font-size: 15px;
      font-weight: 500;
      text-align: center;
      display: block;
      text-align: start;
      &:hover {
        text-decoration: none;
        color: $textDark;
      }
    }
    .side-item {
      padding-top: 7px;
      padding-bottom: 7px;
      cursor: pointer;
      .router-link-active {
        color: $primary !important;
        transition: all 0.3s ease;
        font-weight: bold !important;
      }
      a {
        font-weight: bold;
      }
      a.center {
        text-align: center;
      }
    }
    .sub-item-ul {
      margin-top: 3px;
      padding: 0;
      transition: all 1s ease;
    }
    .sub-item {
      background-color: #2c3b41;
      padding-top: 5px;
      padding-bottom: 5px;
      transition: all 1s ease;
    }
    .logout {
      a {
        font-size: 14px !important;
        color: $sideBarColor !important;
      }
    }
    .ico {
      margin-right: 10px;
      font-size: 15px;
    }
    .img-name {
      display: flex;
      align-items: center;
      span {
        font-size: 15px;
      }
      .img {
        width: 50px;
        img {
          border-radius: 50%;
          width: 100%;
          background-position: center;
        }
      }
      .name {
        padding-right: 2px;
        p {
          padding: 3px;
          font-size: 15px;
        }
        .icon-online {
          color: #006400;
          font-size: 8px;
        }
      }
    }
    .app-name {
      font-size: 35px;
      margin-top: 10px;
      margin-bottom: 40px;
    }
  }
}
.right-side {
  height: 100%;
  padding: 0;
}

// Router Active Link
.router-link-active {
  color: $white !important;
  font-size: 18px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease;
}

// Nav Bar
.nav-bar {
  height: 100%;
  background-color: $navBarBackground;
  // box-shadow: 0px -1px 11px 1px $textDisabled;
  border-bottom: 0.5px solid #ccc;
  padding-bottom: 10px;
  .content {
    padding-right: 10px;
    padding-left: 10px;
  }
}
.heading {
  padding-left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  h1,
  p {
    color: $primary;
  }
  h1 {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    font-size: 32px;
    font-weight: 500;
    span {
      cursor: pointer;
      font-size: 20px;
      margin-right: 10px;
    }
  }
  p {
    font-size: 13px;
    margin-left: 10px;
    font-weight: 500;
  }
}
</style>
