<template>
	<div class="article-main">
		<div class="wp" v-if="post">
			<div class="article-hd">{{ post.title.rendered }}</div>
			<div class="article-bd">
				<div class="con" v-html="post.content.rendered "></div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
    	data: function () {
    		return {
    			post: ''
    		}
    	},
    	methods: {
    		
    	},
  
    	filters: {
    	
    	},
    	created: function(){
    		this.postId = this.$route.params.id;
    		this.$http.get('posts/' + this.postId).then(function(response){
    			return response.json()
    		}).then(function(data){
    			this.post = data;
    			this.$store.commit('changeTitle', data.title.rendered)
    			// console.log(data);
    		})
    	},
    	components: {
    		
    	}
    }
</script>
<style>
	.article-hd{
		text-align: center;
		font-size: 28px;
		margin-bottom: 30px;
	}
	.article-main{
		
	}
</style>
