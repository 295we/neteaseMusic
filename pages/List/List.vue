<template>
	<view class="list">
		<view class="fixbg" :style="{ 'background-image': `url(${playlist.coverImgUrl})` }"></view>
		<MusicHead title="歌单" icon="true" color="white"></MusicHead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl" mode=""></image>
						<text class="iconfont icon-yousanjiao">{{ playCount }}</text>
					</view>
					<view class="list-head-text">
						<view>{{ playlist.name }}</view>
						<view>
							<image :src="playlist.creator.avatarUrl" mode=""></image>
							{{ playlist.creator.nickname }}
						</view>
						<view>{{ playlist.description }}</view>
					</view>
				</view>
				<!-- 条件编译 只对微信端编译 -->
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="list-share"><text class="iconfont icon-fenxiang">分享给微信好友</text></button>
				<!-- #endif -->
				<!-- 音乐列表 -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-bofang"></text>
						<text>播放全部</text>
						<text>(共{{ playlist.trackCount }}首)</text>
					</view>
					<!-- 歌曲项 -->
					<view class="list-music-item" v-for="(item, index) in playlist.tracks" :key="index">
						<view class="list-music-top">{{ index + 1 }}</view>
						<view class="list-music-song">
							<view>{{ item.name }}</view>
							<view>
								<image src="@/static/sq.png" mode="" v-if="privileges[index].flag == 4"></image>
								<text v-if="privileges[index].maxbr == 999000" class=" iconfont icon-vip"></text>
								{{ item.ar[0].name }}-{{ item.name }}
							</view>
						</view>
						<text class="iconfont icon-24gl-playCircle"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import MusicHead from '@/components/MusicHead/MusicHead.vue'
import '@/common/iconfont.css'
import { list } from '@/common/api.js'
export default {
	data() {
		return {
			playlist: {
				playCount: 0,
				trackCount: '',
				coverImgUrl: '',
				creator: {
					avatarUrl: ''
				}
			},
			privileges: [],
			isLoading: true
		}
	},

	async onLoad(options) {
		uni.showLoading({
			title: '加载中'
		})

		let result = await list(options.listId)
		result = result.data
		if (result.code == 200) {
			this.playlist = result.playlist
			this.privileges = result.privileges
			this.isLoading = false
			uni.hideLoading()
		}
	},
	components: {
		MusicHead
	},
	computed: {
		playCount() {
			return (this.playlist.playCount / 100000000).toFixed(1) + '亿'
		}
	},
	methods: {}
}
</script>

<style scoped>
.list-head {
	display: flex;
	margin: 30rpx;
}

.list-head-img {
	width: 264rpx;
	height: 264rpx;
	border-radius: 30rpx;
	overflow: hidden;
	position: relative;
	margin-right: 42rpx;
}

.list-head-img image {
	width: 100%;
	height: 100%;
}

.list-head-img text {
	position: absolute;
	right: 8rpx;
	top: 8rpx;
	color: #fff;
	font-size: 26rpx;
}

.list-head-text {
	flex: 1;
	color: #f0f2f7;
}

.list-head-text view:nth-child(1) {
	color: #fff;
	font-size: 34rpx;
}

.list-head-text view:nth-child(2) {
	display: flex;
	margin: 20rpx 0;
	font-size: 24rpx;
	align-items: center;
}

.list-head-text view:nth-child(2) image {
	width: 54rpx;
	height: 54rpx;
	margin-right: 14rpx;
	border-radius: 50%;
	font-size: 22rpx;
	vertical-align: middle;
}

.list-head-text view:nth-child(3) {
	line-height: 34rpx;
	font-size: 22rpx;
}

.list-share {
	width: 330rpx;
	height: 74rpx;
	margin: 0 auto;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 37rpx;
	color: #fff;
	text-align: center;
	line-height: 74rpx;
	font-size: 28rpx;
}

.list-share text {
	margin-right: 16rpx;
}

.list-music {
	background-color: #fff;
	border-radius: 50rpx;
	margin-top: 40rpx;
	overflow: hidden;
}

.list-music-head {
	height: 50rpx;
	margin: 30rpx 0 70rpx 22rpx;
}

.list-music-head text:nth-child(1) {
	height: 50rpx;
	font-size: 50rpx;
}

.list-music-head text:nth-child(2) {
	font-size: 30rpx;
	margin: 0 10rpx 0 26rpx;
}

.list-music-head text:nth-child(3) {
	font-size: 26rpx;
	color: #b2b2b2;
}

.list-music-item {
	display: flex;
	margin: 0 32rpx 66rpx 46rpx;
	align-items: center;
	color: #959595;
}

.list-music-top {
	width: 58rpx;
	font-size: 34rpx;
	height: 50rpx;
	margin-right: 10rpx;
}

.list-music-song {
	flex: 1;
}

.list-music-song view:nth-child(1) {
	font-size: 25rpx;
	color: #000;
	width: 70vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.list-music-song view:nth-child(2) {
	font-size: 25rpx;
	width: 70vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.list-music-song view:nth-child(2) image {
	width: 32rpx;
	height: 20rpx;
	margin-right: 10rpx;
	flex-shrink: 0;
}

.list-music-song view:nth-child(2) text {
	color: red;
	font-size: 20rpx;
	margin-right: 10rpx;
}

.list-music-item text {
	font-size: 44rpx;
	color: #c7c7c7;
}
</style>
