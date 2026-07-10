class WalkmanUI{
  constructor(){this.viewer=document.getElementById('walkmanViewer')}
  init(){this.viewer?.addEventListener('load',()=>this.viewer.classList.add('ready'))}
  setState(state){document.body.classList.remove('playing','paused','stopped');if(state==='play')document.body.classList.add('playing');if(state==='pause')document.body.classList.add('paused');if(state==='stop')document.body.classList.add('stopped')}
}
window.walkman=new WalkmanUI();
