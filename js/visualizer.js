class Visualizer{
  constructor(){this.canvas=document.getElementById('visualizerCanvas');this.ctx=this.canvas.getContext('2d');this.running=false;this.raf=0}
  init(){this.resize();addEventListener('resize',()=>this.resize())}
  resize(){this.canvas.width=this.canvas.clientWidth*devicePixelRatio;this.canvas.height=this.canvas.clientHeight*devicePixelRatio;this.ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
  start(){if(this.running)return;this.running=true;this.draw()}
  stop(){this.running=false;cancelAnimationFrame(this.raf);this.clear()}
  clear(){this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight)}
  draw(){if(!this.running)return;this.raf=requestAnimationFrame(()=>this.draw());const ctx=this.ctx,w=this.canvas.clientWidth,h=this.canvas.clientHeight;ctx.fillStyle='#050505';ctx.fillRect(0,0,w,h);const data=window.audioEngine.getFrequencyData();if(!data.length)return;const bars=96,step=Math.max(1,Math.floor(data.length/bars)),bw=w/bars;for(let i=0;i<bars;i++){let v=data[i*step]||0;let bh=(v/255)*h;ctx.fillStyle=`hsl(${180+v*.7},90%,60%)`;ctx.fillRect(i*bw,h-bh,Math.max(2,bw-2),bh)}ctx.fillStyle='rgba(0,229,255,.08)';ctx.fillRect(0,0,w,h)}
}
window.visualizer=new Visualizer();
