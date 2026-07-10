class AudioEngine{
  constructor(){
    this.audio=document.getElementById('audioPlayer');this.context=null;this.source=null;this.masterGain=null;this.analyser=null;this.initialized=false;this.volume=Number(localStorage.getItem('walkman-volume')??0.9);this.muted=false;
  }
  async init(){
    if(this.initialized)return;
    const AC=window.AudioContext||window.webkitAudioContext;
    if(AC){this.context=new AC();this.source=this.context.createMediaElementSource(this.audio);this.masterGain=this.context.createGain();this.analyser=this.context.createAnalyser();this.analyser.fftSize=2048;this.masterGain.gain.value=this.volume;this.source.connect(this.masterGain);this.masterGain.connect(this.analyser);this.analyser.connect(this.context.destination)}
    this.audio.volume=this.volume;this.attachEvents();this.initialized=true;
  }
  attachEvents(){['play','pause','ended','timeupdate','loadedmetadata','volumechange','seeked'].forEach(type=>this.audio.addEventListener(type,()=>window.dispatchEvent(new CustomEvent('audio:'+type))));}
  async load(file){await this.init();if(!file)return;this.audio.src=file;this.audio.load();window.dispatchEvent(new CustomEvent('songloaded',{detail:{file}}));}
  async play(){await this.init();if(this.context&&this.context.state==='suspended')await this.context.resume();await this.audio.play();}
  pause(){this.audio.pause()}
  stop(){this.audio.pause();this.audio.currentTime=0;window.dispatchEvent(new CustomEvent('audio:stop'))}
  seek(seconds){if(!Number.isFinite(seconds))return;this.audio.currentTime=Math.max(0,Math.min(seconds,this.audio.duration||0))}
  setVolume(value){this.volume=Math.max(0,Math.min(1,Number(value)));this.audio.volume=this.volume;if(this.masterGain)this.masterGain.gain.value=this.muted?0:this.volume;localStorage.setItem('walkman-volume',String(this.volume));window.dispatchEvent(new CustomEvent('audio:volumechange'))}
  toggleMute(){this.muted=!this.muted;if(this.masterGain)this.masterGain.gain.value=this.muted?0:this.volume;this.audio.muted=this.muted;return this.muted}
  isPlaying(){return !this.audio.paused&&!this.audio.ended}
  getCurrentTime(){return this.audio.currentTime||0}
  getDuration(){return this.audio.duration||0}
  getFrequencyData(){const data=new Uint8Array(this.analyser?.frequencyBinCount||0);if(this.analyser)this.analyser.getByteFrequencyData(data);return data}
  getWaveformData(){const data=new Uint8Array(this.analyser?.fftSize||0);if(this.analyser)this.analyser.getByteTimeDomainData(data);return data}
}
window.audioEngine=new AudioEngine();
