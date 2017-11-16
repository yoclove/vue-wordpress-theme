<template>
	<div class="header">
		<a href="" class="logo"></a>
		<div class="wp">
			<ul class="nav">
				<li  v-for="menu in menus"><router-link :exact="!getUrlName(menu.url)" :to="{ name: 'category', params: { name: getUrlName(menu.url) } }">{{ menu.title }}</router-link></li>
				<!-- <li v-for="menu in menus"><router-link :to="'/category/' + menu.id"><a>{{ menu.name }}</a></router-link></li> -->
				<!-- <li v-for="menu in menus"><a @click="goPage(menu.url)">{{ menu.title }}</a></li> -->
				<!-- :exact={ getUrlName(menu.url) == '/' } -->
			</ul>
		</div>
	</div>
</template>

<script>
    export default {
    	data: function () {
    		return {
    			menus: ''
    		}
    	},
    	methods: {
    		getUrlName: function( url ) {
    				const array = url.split( '/' );
    				return array[ array.length - 2 ];
    			},
    		goPage: function(url){
    			this.$router.push({
    				name: 'category',
    				params: {
    					'name': this.getUrlName(url)
    				}
    			})
    		}
    	},
  
    	filters: {
    	
    	},
    	created: function(){
    	/*	this.$http.get('categories').then(function(response){
    			return response.json()
    		}).then(function(data){
    			this.menus = data;
    			console.log(data);
    		})*/
    		
    		
    		this.$http.get( 'http://vue.dev/wp-json/wp-api-menus/v2/menu-locations/primary-menu' )
					.then( ( res ) => {
						// vm.menus = res.data;
		    			this.menus = res.data;
		    			console.dir(res.data);
					})
					.catch( ( res ) => {
						
					});

    	},
    	components: {
    		
    	}
    }
</script>
<style>
	.header{
		color: rgba(0,0,0,.3);
		height: 65px;
		left: 0;
		line-height: 65px;
		z-index: 2;
		margin-bottom: 50px;
		box-shadow: 0 0 1px rgba(0,0,0,.15);
	}
	.nav li >  a {
	    color: rgba(0,0,0,.44);
	    display: inline-block;
	    font-size: 14px;
	    cursor: pointer;
	}
	.nav li {
	    display: inline-block;
	    margin-right: 20px;
	}
	.nav .on{
		color: #f00;
	}
</style>
