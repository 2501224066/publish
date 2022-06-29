
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/promote/promote","pages/forward/forward","pages/lottery/lottery","pages/my/my","pages/register/register","pages/reveal/reveal","pages/shop/shop","pages/login/login","pages/activity/activity"],"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#F74239","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#cccccc","selectedColor":"#F74239","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/promote/promote","iconPath":"static/tab_1.png","selectedIconPath":"static/tab_1_s.png","text":"推广"},{"pagePath":"pages/forward/forward","text":"转发","iconPath":"static/tab_2.png","selectedIconPath":"static/tab_2_s.png"},{"pagePath":"pages/lottery/lottery","text":"抽奖","iconPath":"static/tab_3.png","selectedIconPath":"static/tab_3_s.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/tab_4.png","selectedIconPath":"static/tab_4_s.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"publish","compilerVersion":"3.4.15","entryPagePath":"pages/promote/promote","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/promote/promote","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"推广","enablePullDownRefresh":false}},{"path":"/pages/forward/forward","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"转发朋友圈","enablePullDownRefresh":false}},{"path":"/pages/lottery/lottery","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"参与抽奖","enablePullDownRefresh":false}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarBackgroundColor":"transparent","enablePullDownRefresh":false,"navigationBarTextStyle":"white","titleNView":false}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/reveal/reveal","meta":{},"window":{"navigationBarTitleText":"活动信息","enablePullDownRefresh":false}},{"path":"/pages/shop/shop","meta":{},"window":{"navigationBarTitleText":"店铺信息","enablePullDownRefresh":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/activity/activity","meta":{},"window":{"navigationBarTitleText":"活动","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});