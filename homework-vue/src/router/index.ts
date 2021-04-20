import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/identity/Login.vue';
import Register from '../views/identity/Register.vue';
import City from '../views/City/Index.vue';
import County from '../views/County/Index.vue';
import Picture from '../views/Pictures/Index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        props: true,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/identity/login',
        name: 'identity-login',
        component: Login,
    },
    {
        path: '/identity/register',
        name: 'identity-register',
        component: Register,
    },

    {
        path: '/pictures/index',
        name: 'picture-index',
        component: Picture,
    },
    {
        path: '/city/index',
        name: 'city-index',
        component: City,
    },
    {
        path: '/county/index',
        name: 'county-index',
        component: County,
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
