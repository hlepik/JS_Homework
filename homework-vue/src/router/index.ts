import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/identity/Login.vue';
import Register from '../views/identity/Register.vue';
import City from '../views/City/Index.vue';
import CityEdit from '../views/City/Edit.vue';
import CityCreate from '../views/City/Create.vue';
import CityDetails from '../views/City/Details.vue';
import County from '../views/County/Index.vue';
import CountyEdit from '../views/County/Edit.vue';
import CountyCreate from '../views/County/Create.vue';
import CountyDetails from '../views/County/Details.vue';
import Picture from '../views/Pictures/Index.vue';
import PictureEdit from '../views/Pictures/Edit.vue';
import PictureCreate from '../views/Pictures/Create.vue';
import PictureDetails from '../views/Pictures/Details.vue';
import PictureDelete from '../views/Pictures/Delete.vue';

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
        path: '/Pictures/Index',
        name: 'picture-index',
        component: Picture,
    },
    {
        path: '/Pictures/Edit/:id?',
        name: 'PictureEdit',
        component: PictureEdit,
        props: true
    },
    {
        path: '/Pictures/Create',
        name: 'PictureCreate',
        component: PictureCreate,
    },
    {
        path: '/Pictures/Details/:id?',
        name: 'PictureDetails',
        component: PictureDetails,
        props: true
    },
    {
        path: '/Pictures/Delete/:id?',
        name: 'PictureDelete',
        component: PictureDelete,
        props: true
    },
    {
        path: '/city/index',
        name: 'city-index',
        component: City,
    },
    {
        path: '/City/Edit/:id?',
        name: 'CityEdit',
        component: CityEdit,
        props: true
    },
    {
        path: '/City/Details/:id?',
        name: 'CityDetails',
        component: CityDetails,
        props: true
    },
    {
        path: '/City/Create',
        name: 'CityCreate',
        component: CityCreate
    },
    {
        path: '/county/index',
        name: 'county-index',
        component: County,
    },
    {
        path: '/County/Edit/:id?',
        name: 'CountyEdit',
        component: CountyEdit,
        props: true
    },
    {
        path: '/County/Details/:id?',
        name: 'CountyDetails',
        component: CountyDetails,
        props: true
    },
    {
        path: '/County/Create',
        name: 'CountyCreate',
        component: CountyCreate,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
