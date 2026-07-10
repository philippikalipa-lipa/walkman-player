class Playlist{
  constructor(){
    this.songs=[
      {title:'Black is back',artist:'Phil Osophski',file:'assets/audio/Black is back.mp3',cover:'assets/images/SCHICKSALS.jpeg'},
      {title:'Black is back (Mashup)',artist:'Phil Osophski',file:'assets/audio/Black is back x Black is back (Mashup).mp3',cover:'assets/images/SCHICKSALS.jpeg'},
      {title:'Gedankenlabyrinthe',artist:'Phil Osophski',file:'assets/audio/Gedankenlabyrinthe.mp3',cover:'assets/images/SCHICKSALS.jpeg'},
      {title:'SCHICKSALSKARUSSELL',artist:'Phil Osophski',file:'assets/audio/SCHICKSALSKARUSSELL.mp3',cover:'assets/images/SCHICKSALS.jpeg'},
      {title:'Pray (Deep Dark Opera Psy-Rap Remix)',artist:'Phil Osophski',file:'assets/audio/Pray (Deep Dark Opera Psy-Rap Remix).mp3',cover:'assets/images/SCHICKSALS.jpeg'},
      {title:'ha ha ha',artist:'Phil Osophski',file:'assets/audio/ha ha ha.mp3',cover:'assets/images/SCHICKSALS.jpeg'},
      {title:'gaywöhnlich',artist:'Phil Osophski',file:'assets/audio/gaywöhnlich.mp3',cover:'assets/images/SCHICKSALS.jpeg'},
      {title:'STUDIO Pflicht!',artist:'Phil Osophski',file:'assets/audio/STUDIO Pflicht!.mp3',cover:'assets/images/SCHICKSALS.jpeg'},
      {title:'PHILIPPIKA LIPA — CRAM INTRO',artist:'Phil Osophski',file:'assets/audio/PHILIPPIKA LIPA — CRAM INTRO.mp3',cover:'assets/images/SCHICKSALS.jpeg'}
    ];
    this.current=Number(localStorage.getItem('walkman-current')??0);this.shuffle=false;this.repeat=false;
  }
  init(){this.render();this.load(this.current)}
  render(){const list=document.getElementById('playlist');if(!list)return;list.innerHTML='';this.songs.forEach((s,i)=>{const li=document.createElement('li');li.textContent=s.title;li.dataset.index=i;li.addEventListener('click',()=>{this.load(i);window.player?.play()});list.appendChild(li)});this.highlight()}
  async load(index){if(index<0||index>=this.songs.length)return;this.current=index;localStorage.setItem('walkman-current',String(index));const s=this.songs[index];document.getElementById('trackTitle').textContent=s.title;document.getElementById('trackArtist').textContent=s.artist;document.getElementById('coverImage').src=s.cover;this.highlight();await window.audioEngine.load(s.file);window.dispatchEvent(new CustomEvent('playlist:songchange',{detail:s}))}
  highlight(){document.querySelectorAll('#playlist li').forEach((li,i)=>li.classList.toggle('active',i===this.current));document.querySelector('#playlist li.active')?.scrollIntoView({block:'nearest'})}
  next(){if(this.shuffle){this.load(Math.floor(Math.random()*this.songs.length));return}this.load((this.current+1)%this.songs.length)}
  previous(){this.load((this.current-1+this.songs.length)%this.songs.length)}
  toggleShuffle(){this.shuffle=!this.shuffle;return this.shuffle}
  toggleRepeat(){this.repeat=!this.repeat;return this.repeat}
}
window.playlist=new Playlist();
