import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';


/*import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  loading: 'static/images/loading.gif'
});
*/
import ArticleList from './components/article-list/ArticleList.vue';
import Single from './components/single/Single.vue';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

Vue.http.options.root = 'http://vue.dev/wp-json/wp/v2';


var router = new VueRouter({
	linkActiveClass:'on',
	routes: [
		// {path: '', component: ArticleList, name: 'home'},
		{ path: '/:page(\\d+)?', component: ArticleList, name: 'home'},
		{path: '/posts/:id', component: Single, name: 'post-single'},
		{path: '/category/:name', component: ArticleList, name: 'category'},
		{path: '/category/:name/:page(\\d+)?', component: ArticleList, name: 'category-page'},
		// {path: '/category/:id', component: ArticleList, name: 'category'},
		{path: '/*', redirect: '/'}
	]
});

/*var router = new VueRouter({
	linkActiveClass:'on',
	routes: [
		// {path: '', component: ArticleList, name: 'home'},
		{ path: '/:page(\\d+)?', component: ArticleList, name: 'home'},
		{path: '/posts/:id', component: Single, name: 'post-single'},
		{path: '/category', component: ArticleList,  children: [
			{path: ':name', component: ArticleList, name: 'category'},
			{path: ':name/:page(\\d+)?', component: ArticleList, name: 'category-page'}
		]},
		{path: '/*', redirect: '/'}
	]
});
*/

var store = new Vuex.Store({
	state: {
		title: ''
	},
	mutations: {
		changeTitle: function(state, data){
			state.title = data;
			document.title = ( state.title ? state.title + ' - ' : '' );
		}
	}
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
