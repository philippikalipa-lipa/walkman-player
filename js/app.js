class App{async init(){await window.audioEngine.init();window.visualizer.init();window.walkman.init();window.player.init();if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{})}}}
window.app=new App();
window.addEventListener('DOMContentLoaded',()=>window.app.init());
