<template>
	<view class="home">
		<searchInput></searchInput>
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.image_src" mode=""></image>
			</swiper-item>
		</swiper>
		
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in navList" :key="index">
				<image :src="item.image_src" mode="widthFix" @click="demo"></image>
			</view>
		</view>
		
		<view class="floor-wrapper">
			<view class="floor" v-for="(item,index) in floorList" :key="index">
				<view class="floor-title">
					<image :src="item.floor_title.image_src" mode="widthFix"></image>
				</view>
				<view class="floor-content">
					<view class="floor-item" v-for="(unit,i) in item.product_list" :key="i" :class="{'first' : i === 0}">
						<image :src="unit.image_src" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import searchInput from "../../components/searchInput.vue"
	export default {
		components:{searchInput},
		data() {
			return {
				swiperList:[],							//轮播图列表
				navList:[],									//导航列表
				floorList:[],								//楼层列表
			}
		},
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList()
		},
		methods: {
			// 获取轮播列表
			getSwiperList(){
				this.$request({
					url:'/home/swiperdata'
				}).then(res => {
					this.swiperList = res.data.message
				})
			},
			
			// 获取导航列表
			getNavList(){
				this.$request({
					url:'/home/catitems'
				}).then(res => {
					this.navList = res.data.message
				})
			},
			
			// 获取楼层列表
			getFloorList(){
				this.$request({
					url:"/home/floordata"
				}).then(res => {
					this.floorList = res.data.message;
				})
			},
			
			demo(){
				uni.navigateTo({
					url:'../search/search'
				})
			}
			
		
		
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		swiper{
			width: 750rpx;
			height: 380rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.nav{
		display: flex;
		width: 100%;
		.nav-item{
			width: 25%;
			padding: 20rpx;
			image{
				width: 100%;
				
			}
		}
	}
	
	.floor-wrapper{
		width: 100%;
	}
	
	.floor-content{
		display: grid;
		grid-template-columns:repeat(3, 33.33%);
		grid-template-rows:repeat(2,200rpx);
		// grid-template-rows:2fr 1fr;
		grid-row-gap:10rpx;
		grid-column-gap:10rpx;
		margin-bottom:20rpx
		
	}
	.floor-item{
		image{
			width: 100%;
			height: 100%;
		}
	}
	
	.first{
		grid-row-start: 1;
		grid-row-end: 3;
	}
	
	
</style>
