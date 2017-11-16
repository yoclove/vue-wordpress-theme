<template>
	<div class="index">
		<app-header></app-header>
		<router-view></router-view>
		<app-footer></app-footer>
	</div>
</template>

<script>
	import Header from './components/header/Header.vue';
	import Footer from './components/footer/Footer.vue';
	import ArticleList from './components/article-list/ArticleList.vue';
	
    export default {
    	data: function () {
    		return {
    			
    		}
    	},
    	methods: {
    	
    	},
  
    	filters: {
    	
    	},
    	created: function(){
    		
    	},
    	components: {
    		appHeader: Header,
    		appFooter: Footer,
    		appArticleList: ArticleList
    	}
    }
</script>
<style>

</style>
