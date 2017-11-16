<template>
	<div class="article-box">
		<div v-if="loading" class="loader">加载中...</div>
		<div class="wp" v-if="posts">
			<h2 class="t1">最新文章 {{ id }}</h2>
			<ul class="article-list">
				<li v-for="post in posts">
					<h2><router-link :to="'/posts/'+post.id"><a>{{ post.title.rendered }}</a></router-link></h2>
					<h3 @click="goDetail(post.id)"><a>{{ post.title.rendered }}</a></h3>
					<div class="desc" v-html="post.excerpt.rendered"></div>
					<div class="meta">{{ post.date }}</div>
				</li>
			</ul>
			<div class="page">
				<a @click="goPrev">&LT; 上一页  </a>
				<span>{{ currentPage }} / {{ totalPage }}</span>
				<a @click="goNext">下一页 &GT;</a>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
    	data: function () {
    		return {
    			loading: true,
    			posts: '',
    			id: '',
    			catId: '',
    			postPerPage: 5,
    			pageNumber: 1,
    			currentPage: 1,
    			totalPage: ''
    		}
    	},
    	methods: {
    		goDetail: function(postId){
    			this.$router.push({
    				name: 'post-single',
    				params: {
    					id: postId
    				}
    			})
    		},
    		getCat: function(id){
    			this.posts = '';
    			this.loading = true;
    			this.$http.get('posts?categories='+ id).then(function(response){
    				return response.json()
    			}).then(function(data){
    				this.loading = false;
    				this.posts = data;
    			})
    		},
    		getCatIdByName: function(name){
    			this.posts = '';
    			this.loading = true;
    			
    			return this.$http.get( 'categories/?slug=' + name )
    			.then( ( res ) => {
    				
    				return new Promise(function(resolve, reject){
						resolve(res.data[0].id);
    				})
    				// this.getPosts(1, catId);
    			} )
    			.catch( ( res ) => {
    				//console.log( `Something went wrong : ${ res }` );
    			});
    		},
    		getPosts: function(page, catId){
    			this.loading = true;
    			
    			var page = page || this.pageNumber;
    			var catId = catId || [];
    			
				var params = { per_page: this.postPerPage, page: page, categories: catId }
    			
    	/*		
    			if( catId ){
    				var params = { per_page: , page: this.pageNumber, categories: catId }
    			}else if( page ){
    				var params = { per_page: this.postPerPage, page: page, categories: []}
    			}else{
    				var params = { per_page: this.postPerPage, page: this.pageNumber }
    			}*/
    			
    			
    			this.$http.get('posts',{
    				params: params
    			}).then(function(response){
    				
    				this.totalPage = response.headers.map['x-wp-totalpages'][0];
    				if( page ){
	    				if(page <= parseInt(this.totalPage) ){
	    					this.currentPage  = page;
	    				}/*else{
	    					this.$router.push( { 'name': 'home' } );
	    					this.currentPage  = 1; // +++ 超出最大值了 总共2页 每页5个 超出第二页，就回到第一页
	    				}*/
    				}
    				
    				this.posts = response.data;
    				this.loading = false;
    				
    			})
    		},
    		goPrev: function(){
    			if(this.currentPage == 1) return;
    			this.currentPage --;
    			
    			if( this.$route.params.name ){
    				this.$router.push({
    					name: 'category-page',
    					params: {
    						'page': this.currentPage
    					}
    				})
    			}else{
    				
	    			this.$router.push({
	    				name: 'home',
	    				params: {
	    					'page': this.currentPage
	    				}
	    			})
    			}
    			
    			
    		},
    		goNext: function(){
    			if(this.currentPage >= this.totalPage) return;
    			this.currentPage ++;
    			
    			if( this.$route.params.name ){
    				this.$router.push({
    					name: 'category-page',
    					params: {
    						'page': this.currentPage
    					}
    				})
    			}else{
	    			this.$router.push({
	    				name: 'home',
	    				params: {
	    					'page': this.currentPage
	    				}
	    			})
    			}
    			
    			
    		}
    	},
    	watch: {
    		'$route': function(to, from){
    			// this.id = to.params.id;
    			// this.catId = to.params.name;
    			console.log('-----------------------', to.params.name);
    			console.log('++++++++++++++++++++++', to.params.page);
    			
    			if( to.params.name ){
					this.getCatIdByName( to.params.name ).then(function(catId){
	    				this.getPosts(to.params.page, catId)
					})
    			}else if( to.params.page ){
	    			this.getPosts( to.params.page );
    			}else{
	    			this.getPosts();
    			}
    		}
    	},
    	filters: {
    	
    	},
    	created: function(){
    		// this.postId = this.$route.params.id;
    		// console.log(this.$route.params.page);
			 if(  this.$route.params.name ){
				this.getCatIdByName(  this.$route.params.name ).then(function(catId){
    				this.getPosts( this.$route.params.page, catId)
				})
			}else if( this.$route.params.page  ){
	    		this.getPosts( this.$route.params.page );
			}else{
	    		this.getPosts();
			}
			
    		    			
    		
    		
    	/*	if(this.$route.params.id){
    			this.getCat(this.$route.params.id);
    		}else if( this.$route.params.name){
    			this.getCatIdByName(this.$route.params.name);
    		}else if(  this.$route.params.page ) {
	    		this.getPosts( this.$route.params.page );
    		}else{
	    		this.getPosts();
    		}*/
    	},
    	components: {
    		
    	}
    }
</script>
<style>
	.t1{
		font-size: 14px;
		border-bottom: 1px solid rgba(0, 0, 0, .15);
		color: rgba(0, 0, 0, .6);
		letter-spacing: 1px;
		padding-bottom: 4px;
	}

	.meta{
		color: rgba(0, 0, 0, .3);
		font-size: 14px;
		margin-top: 10px;
	}
	.article-list h2 a{
		font-size: 24px;
	    line-height: 1.8;
	}
	.article-list .desc{
		color: rgba(0, 0, 0, .66);
	    line-height: 1.6;
	    margin: 5px 0 10px -.9px;
	}
	.article-list li{
		border-bottom: 1px solid rgba(0, 0, 0, .05);
	    padding-top: 30px;
	    padding-bottom: 40px;
	}
	.page a{
		cursor: pointer;
	}
	    

</style>
