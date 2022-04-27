<template>
	<view class="wrapper">
		<view v-for="(item,index) in list" :key="index" :class="{'active':currentIndex == index}"
		 @click="tabClick(index)" class="tabs-item">
			{{item.value}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabs",
		props:{
			list:{
				type:Array,
				dafault(){
					return []
				}
			}
		},
		data() {
			return {
				currentIndex:0
			}
		},
		methods:{
			tabClick(index){
				this.currentIndex = index
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		display: flex;
		justify-content: space-around;
	}
	.active{
		color: #eb4450;
		border-bottom: 5rpx solid #eb4450;
	}
	.tabs-item{
		width: 100%;
		text-align: center;
		padding: 15rpx 0;
	}
</style>