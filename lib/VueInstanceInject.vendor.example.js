export default function (Vue) {
    Vue.instance = new Vue([
        //!!REQUIRES!!
    ].find(i => document.querySelector(i.el)));
}