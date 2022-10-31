<template>
<!-- 更改 23:42分 -->
  <view class="index">
    <MusicHead title="网易云音乐" :icon="false"></MusicHead>
    <view class="container">
      <scroll-view scroll-y="true">
        <view class="index-search">
          <text class="iconfont icon-search"></text>
          <input type="text" placeholder="搜索歌曲" />
        </view>
        <view class="index-list">
          <view
            class="index-list-item"
            v-for="(item, index) in topList"
            :key="index"
          >
            <view class="index-list-img" @tap="handleToList(item.listId)">
              <image :src="item.coverImgUrl" mode=""></image>
              <text>{{ item.updateFrequency }}</text>
            </view>
            <view class="index-list-text">
              <view v-for="(item, index) in item.tracks" :key="index">
                {{ index + 1 }}.{{ item.first }}-{{ item.second }}
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
// import '@/common/iconfont.css'
import MusicHead from '@/components/MusicHead/MusicHead.vue';
import { topList } from '@/common/api.js';
export default {
  data() {
    return {
      topList: [],
    };
  },

  components: {
    MusicHead,
  },

  async onLoad() {
    let result = await topList();
    let listIds = ['19723756', '3779629', '2884035', '3778678'];
    if (result.data.code == 200) {
      let arr = result.data.list;
      arr.length = 4;
      let resArr = arr;
      for (var i = 0; i < listIds.length; i++) {
        resArr[i].listId = listIds[i];
      }
      if (resArr.length) this.topList = resArr;
    }
  },
  methods: {
    handleToList(listId) {
      uni.navigateTo({
        url: '/pages/List/List?listId=' + listId,
      });
    },
  },
};
</script>

<style scoped>
.index {
}

.index-search {
  display: flex;
  align-items: center;
  height: 70rpx;
  margin: 70rpx 30rpx 30rpx 30rpx;
  background-color: #f7f7f7;
  border-radius: 50rpx;
}

.index-search text {
  font-size: 26rpx;
  margin-right: 26rpx;
  margin-left: 28rpx;
}

.index-search input {
  font-size: 28rpx;
  flex: 1;
}

.index-list {
  margin: 0 30rpx;
}

.index-list-item {
  display: flex;
  margin-bottom: 34rpx;
}

.index-list-img {
  width: 212rpx;
  height: 212rpx;
  border-radius: 30rpx;
  overflow: hidden;
  margin-right: 22rpx;
  position: relative;
}

.index-list-img image {
  width: 100%;
  height: 100%;
}

.index-list-img text {
  position: absolute;
  left: 12rpx;
  bottom: 16rpx;
  color: #fff;
  font-size: 20rpx;
}

.index-list-text {
  font-size: 24rpx;
  line-height: 66rpx;
  overflow: hidden;
  white-space: nowrap;
  width: 460rpx;
  text-overflow: ellipsis;
}
</style>
