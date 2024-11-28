<template>
  <view class="content">
    <div class="search-box">
      <input type="text" :placeholder="global.language.keyWord" v-model="keyword" @confirm="search">
    </div>
    <view class="goods-list">
      <view v-for="(item, index) in searchResult" :key="index" class="goods-item" @click="navToDetailPage(item)">
        <view class="image-wrapper">
          <image :src="item.pic" mode="aspectFill"></image>
        </view>
        <text class="title clamp">{{ item.name }}</text>
        <text class="title2">{{ item.subTitle }}</text>
        <view class="price-box">
          <text class="price">{{ item.price }}</text>
          <text>{{global.language.soldOut}} {{ item.sale }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  searchEsProductList,
  clearAll
} from '@/api/esProduct.js';
const global = getApp().globalData;

export default {
  data() {
    return {
      searchResult: [],
      searchParam: {
        keyword: "",
        pageNum: 0,
        pageSize: 200
      },
      global: global,
    }
  },
  methods: {
    search() {
      this.searchParam.keyword = this.keyword;
      searchEsProductList(this.searchParam).then(response => {
        console.log(response.data);
        if (response.data.list.length === 0) {
          //没有更多了
          console.log("no data");
          this.searchResult = [];
          this.$api.msg(global.language.noData);
        } else {
          this.searchResult = response.data.list;
        }
      })
    }
  }
}
</script>

<style lang="scss">
.search-box {
  position: absolute;
  left: 0;
  top: 30upx;
  z-index: 9999;
  width: 100%;
  padding: 0 80upx;

  .ser-input {
    flex: 1;
    height: 56upx;
    line-height: 56upx;
    text-align: center;
    font-size: 28upx;
    color: $font-color-base;
    border-radius: 20px;
    background: rgba(255, 255, 255, .6);
  }
}

.content {
  background: $page-color-base;
}

.content {
  padding-top: 96upx;
}

.navbar {
  position: fixed;
  left: 0;
  top: var(--window-top);
  display: flex;
  width: 100%;
  height: 80upx;
  background: #fff;
  box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
  z-index: 10;

  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 30upx;
    color: $font-color-dark;
    position: relative;

    &.current {
      color: $base-color;

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 120upx;
        height: 0;
        border-bottom: 4upx solid $base-color;
      }
    }
  }

  .p-box {
    display: flex;
    flex-direction: column;

    .yticon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30upx;
      height: 14upx;
      line-height: 1;
      margin-left: 4upx;
      font-size: 26upx;
      color: #888;

      &.active {
        color: $base-color;
      }
    }

    .xia {
      transform: scaleY(-1);
    }
  }

  .cate-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 80upx;
    position: relative;
    font-size: 44upx;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-left: 1px solid #ddd;
      width: 0;
      height: 36upx;
    }
  }
}

/* 商品列表 */
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 30upx 30upx;
  background: #fff;

  .goods-item {
    display: flex;
    flex-direction: column;
    width: 48%;
    padding-bottom: 40upx;

    &:nth-child(2n+1) {
      margin-right: 4%;
    }
  }

  .image-wrapper {
    width: 100%;
    height: 330upx;
    border-radius: 3px;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }

  .title {
    font-size: $font-lg;
    color: $font-color-dark;
    line-height: 80upx;
  }

  .title2 {
    font-size: $font-sm;
    color: $font-color-light;
    line-height: 40upx;
    height: 80upx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .price-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10upx;
    font-size: 24upx;
    color: $font-color-light;
  }

  .price {
    font-size: $font-lg;
    color: $uni-color-primary;
    line-height: 1;

    &:before {
      content: '￥';
      font-size: 26upx;
    }
  }
}
</style>
