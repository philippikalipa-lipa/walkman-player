class Player{
  constructor(){this.audio=window.audioEngine;this.playlist=window.playlist;this.progress=document.getElementById('progressBar');this.currentTime=document.getElementById('currentTime');this.duration=document.getElementById('duration');this.volume=document.getElementById('volumeSlider')}
  init(){this.bind();this.volume.value=this.audio.volume;this.playlist.init();this.update()}
  bind(){
    document.getElementById('playBtn').onclick=()=>this.play();document.getElementById('pauseBtn').onclick=()=>this.pause();document.getElementById('stopBtn').onclick=()=>this.stop();document.getElementById('nextBtn').onclick=()=>this.next();document.getElementById('previousBtn').onclick=()=>this.previous();document.getElementById('shuffleBtn').onclick=e=>e.currentTarget.classList.toggle('active',this.playlist.toggleShuffle());document.getElementById('repeatBtn').onclick=e=>e.currentTarget.classList.toggle('active',this.playlist.toggleRepeat());document.getElementById('muteBtn').onclick=e=>{e.currentTarget.classList.toggle('active',this.audio.toggleMute())};this.volume.oninput=e=>this.audio.setVolume(e.target.value);
    this.progress.oninput=e=>{const d=this.audio.getDuration();if(d)this.audio.seek(d*(Number(e.target.value)/100))};
    document.getElementById('fullscreenBtn').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
    window.addEventListener('audio:timeupdate',()=>this.update());window.addEventListener('audio:loadedmetadata',()=>this.update());window.addEventListener('audio:play',()=>{document.body.classList.add('playing');document.body.classList.remove('paused','stopped');window.visualizer?.start();window.walkman?.setState('play')});window.addEventListener('audio:pause',()=>{if(!this.audio.audio.ended){document.body.classList.add('paused');document.body.classList.remove('playing');window.visualizer?.stop();window.walkman?.setState('pause')}});window.addEventListener('audio:stop',()=>{document.body.classList.add('stopped');document.body.classList.remove('playing','paused');window.visualizer?.stop();window.walkman?.setState('stop');this.update()});window.addEventListener('audio:ended',()=>{if(this.playlist.repeat){this.play()}else{this.next(true)}});
    document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.code==='Space'){e.preventDefault();this.audio.isPlaying()?this.pause():this.play()}if(e.key==='ArrowRight')this.next();if(e.key==='ArrowLeft')this.previous();if(e.key==='ArrowUp')this.audio.setVolume(this.audio.volume+.05);if(e.key==='ArrowDown')this.audio.setVolume(this.audio.volume-.05);if(e.key.toLowerCase()==='m')this.audio.toggleMute()});
  }
  async play(){await this.audio.play()}
  pause(){this.audio.pause()}
  stop(){this.audio.stop()}
  async next(auto=false){this.playlist.next();if(auto||this.audio.isPlaying())setTimeout(()=>this.play(),120)}
  async previous(){this.playlist.previous();if(this.audio.isPlaying())setTimeout(()=>this.play(),120)}
  setVolume(v){this.audio.setVolume(v)}
  format(sec){sec=Math.floor(sec||0);return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')}
  update(){const c=this.audio.getCurrentTime();const d=this.audio.getDuration();this.currentTime.textContent=this.format(c);this.duration.textContent=this.format(d);this.progress.value=d?(c/d)*100:0;this.volume.value=this.audio.volume}
}
window.player=new Player();
