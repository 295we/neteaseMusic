<template>
	<view class="music-head" :style="{color: color}">
		<view class="music-head-icon" v-if="icon">
			<text class="iconfont icon-zuojiantou" @tap="handleToBack"></text> | <text class="iconfont icon-shouye"
				@tap="handleToHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	export default {
		name: "MusicHead",
		data() {
			return {

			};
		},
		props: ['title', 'icon', 'color'],
		methods: {
			handleToBack() {
				uni.navigateBack()
			},
			handleToHome() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.music-head {
		width: 100%;
		height: 75px;
		margin-bottom: 10px;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
		color: #000;
		position: relative;
		top: 53rpx;
	}

	.music-head-icon {
		position: absolute;
		left: 8px;
		top: 26px;
		width: 90px;
		height: 30px;
		background-color: rgba(0, 0, 0, .4);
		color: #fff;
		line-height: 31px;
		border-radius: 15px;
		display: flex;
		justify-content: space-evenly;
	}
</style>
