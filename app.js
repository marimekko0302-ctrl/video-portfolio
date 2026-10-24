/* 作品データ：実際の動画フレームを表紙にし、一覧内で再生します。 */
const works = [
  {title:'午後の余白、珈琲の時間。',genre:'カフェ紹介',image:'assets/poster-1.jpg',video:'videos/cafe-fikaletter.mp4'},
  {title:'恋愛運が急上昇する誕生日',genre:'占い',image:'assets/poster-2.jpg',video:'videos/fortune-birthday.mp4'},
  {title:'パンケーキを作ろう！',genre:'料理・ストーリー',image:'assets/poster-3.jpg',video:'videos/pancake-story.mp4'},
  {title:'カピバラの休日',genre:'動物・癒やし',image:'assets/poster-4.jpg',video:'videos/capybara-holiday.mp4'},
  {title:'LUMI by NAGI',genre:'食器・商品紹介',image:'assets/poster-5.jpg',video:'videos/lumi-by-nagi.mp4'}
];
const grid=document.querySelector('#work-grid');
const players=[];
works.forEach((work,index)=>{
 const card=document.createElement('article');card.className='work-card';
 const video=document.createElement('video');video.className='work-video';video.controls=true;video.playsInline=true;video.preload='none';video.poster=work.image;video.src=work.video;video.setAttribute('aria-label',work.title);video.setAttribute('aria-describedby','video-status-'+index);
 players.push(video);
 video.addEventListener('play',()=>players.forEach(other=>{if(other!==video)other.pause()}));
 const meta=document.createElement('div');meta.className='work-meta';
 const number=document.createElement('span');number.textContent='WORK '+String(index+1).padStart(2,'0');
 const state=document.createElement('span');state.textContent='自主制作';meta.append(number,state);
 const title=document.createElement('h3');title.textContent=work.title;
 const genre=document.createElement('p');genre.className='work-genre';genre.textContent=work.genre;
 const status=document.createElement('p');status.className='video-error';status.id='video-status-'+index;status.setAttribute('role','status');status.hidden=true;
 video.addEventListener('error',()=>{status.hidden=false;status.textContent='動画を読み込めませんでした。ページを再読み込みしてお試しください。'});
 card.append(video,meta,title,genre,status);grid.append(card);
});
document.querySelector('#year').textContent=new Date().getFullYear();
