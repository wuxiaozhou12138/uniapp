<template>
	<view>
		<searchInput ></searchInput>
		<view class="wrapper">
			<scroll-view scroll-y="true" class="left" :show-scrollbar='true'>
				<view v-for="(item,index) in menuList" :key="item.cat_id" class="left-item" 
				:class="{'currentMenu':currentMenu == index}" @click="menuClick(index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="right">
				<view v-for="item in contentList" :key="item.cat_id" class="right-item">
					<view class="cate-title">
						<text>/</text>	
						{{item.cat_name}}
						<text>/</text>	
					</view>
					
					<view class="cate-wrapper">
						<view class="cate-item" v-for="unit in item.children" :key="unit.cat_id" @click="toGoodsList(unit.cat_id)">
							<image :src="unit.cat_icon" mode="widthFix"></image>
							<text>{{unit.cat_name}}</text>
						</view>	
					</view>	
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import searchInput from "../../components/searchInput.vue"
	export default {
		components:{searchInput},
		data() {
			return {
				menuList:[],								//左侧菜单列表
				contentList:[],							//右侧内容列表
				cateTreeList:[],						//分类树结构
				currentMenu:0,							//当前选中的菜单
			}
		},
		onLoad(){
			this.getMenuList()
		},
		methods: {
			getMenuList(){
				this.$request({
					url:'/categories'
				}).then(res => {
					this.menuList = res.data.message;
					this.contentList = this.menuList[0].children
				})
			},
			// 菜单点击
			menuClick(index){
				this.currentMenu = index;
				this.contentList = this.menuList[index].children;
			},
			// 
			toGoodsList(id){
				uni.navigateTo({
					url:`/pages/goodsList/goodsList?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		display: flex;
	}
	.left{
		flex: 2;
		height: calc(100vh - 90rpx);
		.left-item{
			text-align: center;
			font-size: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
	}
	.right{
		flex: 5;
		height: calc(100vh - 90rpx);
	}
	
	.right-item{
		width: 100%;
		.cate-title{
			padding: 20rpx 0;
			display: flex;
			justify-content: center;
			gap: 10rpx;
			text{
				color: #aaa;
			}
		}
		.cate-wrapper{
			display: flex;
			width: 100%;
			flex-wrap: wrap;
			.cate-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 33.33%;
				margin-bottom: 20rpx;
				image{
					width: 50%;
				}
				text{
					font-size: 25rpx
				}
			}
		}
	}
	
	.currentMenu{
		border-left: 5rpx solid #eb4450;
		color: #eb4450;
	}
</style>
