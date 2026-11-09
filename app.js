'use strict';
const REPO = 'fiksriots/FinTrack-Distribution';
const API = `https://api.github.com/repos/${REPO}/releases?per_page=6`;
const dateLabel = value => new Intl.DateTimeFormat('id-ID', {day:'numeric', month:'short', year:'numeric',timeZone:'Asia/Jakarta'}).format(new Date(value));
const safeUrl = (value) => {try {const u = new URL(value); return u.protocol === 'https:' && u.hostname === 'github.com' && u.pathname.startsWith(`/${REPO}/`) ? u.href : null;} catch {return null;}};
async function refreshReleases() {
 try {
  const response = await fetch(API, {headers: {Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error('GitHub unavailable');
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid releases');
  const releases = data.filter(r => !r.draft && !r.prerelease && r.assets?.some(a => a.name.endsWith('.apk') && safeUrl(a.browser_download_url)));
  if (!releases.length) throw new Error('No APK available');
  const latest = releases[0];
  const apk = latest.assets.find(a => a.name === 'fintrack.apk') || latest.assets.find(a => a.name.endsWith('.apk') && safeUrl(a.browser_download_url));
  const url = safeUrl(apk.browser_download_url);
  if (!url) throw new Error('Invalid download URL');
  document.querySelectorAll('.download-link').forEach(el => el.href=url);
  document.querySelectorAll('.version').forEach(el => el.textContent=latest.tag_name);
  document.querySelectorAll('.file-size').forEach(el => el.textContent=`${new Intl.NumberFormat('id-ID',{maximumFractionDigits:1}).format(apk.size/1000000)} MB`);
  document.querySelectorAll('.release-date').forEach(el => el.textContent=dateLabel(latest.published_at));
  const hash = apk.digest?.match(/^sha256:([a-f0-9]{64})$/i)?.[1];
  document.querySelector('.checksum').hidden=!hash;
  if(hash) document.getElementById('digest').textContent=hash;
  const list=document.getElementById('release-list');
  list.replaceChildren();
  releases.slice(0,4).forEach((r,index)=>{
   const href=safeUrl(r.html_url); if(!href) return;
   const row=document.createElement('a'); row.className='release-row';row.href=href;row.target='_blank';row.rel='noopener';
   const version=document.createElement('span');version.textContent=r.tag_name;
   if(!index){const badge=document.createElement('small');badge.textContent='TERBARU';version.append(' ',badge);}
   const date=document.createElement('span');date.textContent=dateLabel(r.published_at);
   const detail=document.createElement('span');detail.textContent='Detail rilis ↗';row.append(version,date,detail);list.append(row);
  });
  document.getElementById('release-status').textContent='Informasi rilis diperbarui langsung dari GitHub.';
 } catch {
  document.getElementById('release-status').textContent='Menampilkan rilis terverifikasi 9 November 2026. Lihat GitHub untuk memeriksa pembaruan terbaru.';
 }
}
document.getElementById('copy-hash').addEventListener('click',async()=>{
 const status=document.getElementById('copy-status');
 try {await navigator.clipboard.writeText(document.getElementById('digest').textContent);status.textContent='Checksum disalin.';} catch {status.textContent='Pilih dan salin teks checksum di atas.';}
});
refreshReleases();

// Presentation-only tabs; every amount and profile in the preview is fictional.
const previewTabs = [...document.querySelectorAll('[data-preview]')];
function selectPreview(tab) {
 previewTabs.forEach(item => {
  const selected = item === tab;
  item.setAttribute('aria-selected', String(selected));
  item.tabIndex = selected ? 0 : -1;
  document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
 });
}
previewTabs.forEach((tab,index) => {
 tab.addEventListener('click', () => selectPreview(tab));
 tab.addEventListener('keydown', event => {
  let next;
  if (event.key === 'ArrowRight') next=(index+1)%previewTabs.length;
  if (event.key === 'ArrowLeft') next=(index+previewTabs.length-1)%previewTabs.length;
  if (event.key === 'Home') next=0;
  if (event.key === 'End') next=previewTabs.length-1;
  if (next === undefined) return;
  event.preventDefault();selectPreview(previewTabs[next]);previewTabs[next].focus();
 });
});
