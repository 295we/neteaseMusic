<script>
	export default {
		onLaunch: function() {},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	/*每个页面公共css */
	.container {
		width: 100%;
		height: calc(100vh - 70px);
		overflow: hidden;
	}

	.container scroll-view {
		height: 100%;

	}

	.fixbg {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-size: cover;
		background-position: center;
		filter: blur(10px);
		transform: scale(1.2);
	}
</style>
