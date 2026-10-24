/* 動画受領後、各作品の video に videos/内のファイル名を設定します。 */
const works = [
  {title:'午後の余白、珈琲の時間。',genre:'カフェ紹介',image:'assets/work-1.svg',video:'videos/cafe-fikaletter.mp4'},
  {title:'恋愛運が急上昇する誕生日',genre:'占い',image:'assets/work-2.svg',video:'videos/fortune-birthday.mp4'},
  {title:'パンケーキを作ろう！',genre:'料理・ストーリー',image:'assets/work-3.svg',video:'videos/pancake-story.mp4'},
  {title:'カピバラの休日',genre:'動物・癒やし',image:'assets/work-4.svg',video:'videos/capybara-holiday.mp4'},
  {title:'LUMI by NAGI',genre:'食器・商品紹介',image:'assets/work-5.svg',video:'videos/lumi-by-nagi.mp4'}
];
const grid=document.querySelector('#work-grid');
const dialog=document.querySelector('#video-dialog');
const player=document.querySelector('#video-player');
const pending=document.querySelector('#video-pending');
const status=document.querySelector('#video-status');
let previousOverflow='';
works.forEach((work,index)=>{
 const card=document.createElement('button');card.type='button';card.className='work-card';card.setAttribute('aria-label',work.title+'の動画を開く');
 const thumbnail=document.createElement('div');thumbnail.className='thumbnail';
 const img=document.createElement('img');img.src=work.image;img.alt='';img.width=700;img.height=440;img.loading='lazy';
 const play=document.createElement('span');play.className='play-icon';play.textContent='▶';play.setAttribute('aria-hidden','true');thumbnail.append(img,play);
 const meta=document.createElement('div');meta.className='work-meta';
 const number=document.createElement('span');number.textContent='WORK '+String(index+1).padStart(2,'0');
 const state=document.createElement('span');state.textContent=work.video?'自主制作':'動画準備中';meta.append(number,state);
 const title=document.createElement('h3');title.textContent=work.title;
 const genre=document.createElement('p');genre.className='work-genre';genre.textContent=work.genre;
 card.append(thumbnail,meta,title,genre);grid.append(card);
 card.addEventListener('click',()=>{
  document.querySelector('#video-title').textContent=work.title;document.querySelector('#video-category').textContent=work.genre;
  player.pause();player.removeAttribute('src');player.load();player.poster=work.image;
  player.hidden=!work.video;pending.hidden=!!work.video;
  status.textContent=work.video?'掲載動画は自主制作作品です。':'動画ファイルは未登録です。受領後に再生できる完成版へ更新します。';
  if(work.video)player.src=work.video;
  previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();
 });
});
function closeVideo(){dialog.close()}
document.querySelector('.close-dialog').addEventListener('click',closeVideo);
dialog.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();document.body.style.overflow=previousOverflow});
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeVideo()});
player.addEventListener('error',()=>{if(player.getAttribute('src'))status.textContent='動画を読み込めませんでした。ファイルが videos フォルダーに入っているか確認してください。'});
document.querySelector('#year').textContent=new Date().getFullYear();
