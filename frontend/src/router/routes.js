
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/submit',
    component: () => import('pages/Submit.vue')
  },
  {
    path: '/discounts',
    component: () => import('pages/Home.vue')
  },
  {
    path: '/new',
    component: () => import('pages/Home.vue')
  },
  {
    path: '/addProduct',
    component: () => import('pages/AddProduct.vue')
  },
  {
    path: '/product/:id',
    component: () => import('pages/Product.vue')
  },
 
  {
    path: '/login',
    component: () => import('pages/LogIn.vue')
  },
  {
    path: '/profile',
    component: () => import('pages/Profile.vue')
  },
  {
    path: '/viewedProducts',
    component: () => import('pages/ViewedProducts.vue')
  },
  {
    path: '/favourite',
    component: () => import('pages/Favourite.vue')
  },
  {
    path: '/:path/:fprice:fbrand:fram:fmemInt:fstock:fnet',
    component: () => import('pages/Home.vue')
  },
  {
    path: '/:path/:a',
    component: () => import('pages/Home.vue')
  },
 
  {
    path: '/home',
    component: () => import('pages/Home.vue')
  },
  {
    path: '/cart',
    component: () => import('pages/Cart.vue'),
    
  },

]

export default routes
