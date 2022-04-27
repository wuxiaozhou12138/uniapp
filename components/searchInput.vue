<template>
	<view class="wrapper">
		<!-- <input type="text" value="" placeholder="搜索"/> -->
		<navigator url="/pages/search/search" open-type="navigate">搜索</navigator>
		<!-- <button @click="btnClick">搜索</button> -->
	</view>
</template>

<script>
	export default {
		name:"searchInput",
		data() {
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		background-color: #eb4450;
		padding: 10rpx;
		navigator{
			background-color: #fff;
			border-radius: 10rpx;
			height: 70rpx;
			line-height: 70rpx;
			padding-left: 5rpx;
			text-align: center;
			width: 100%;
		}
	}
</style>
