import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import * as cssTree from 'css-tree';

const root = new URL('../', import.meta.url);
const html = fs.readFileSync(new URL('index.html', root), 'utf8');
const script = fs.readFileSync(new URL('mansion-video.js', root), 'utf8');
cssTree.parse(fs.readFileSync(new URL('mansion-video.css', root), 'utf8'));
const flush = () => new Promise(resolve => setImmediate(resolve));

function fixture({source='./videos/test-only.mp4', reduced=false, saveData=false, preference=null, blocked=false}={}) {
  const {document, window} = parseHTML(html);
  const video = document.getElementById('mansionVideo');
  const control = document.getElementById('mansionMotion');
  video.dataset.src = source;
  video.paused = true;
  video.canPlayType = () => 'probably';
  let plays = 0;
  const event = name => new window.Event(name);
  video.pause = () => { video.paused = true; video.dispatchEvent(event('pause')); };
  video.play = () => {
    plays++;
    if (blocked) return Promise.reject(new Error('Autoplay blocked'));
    video.paused = false;
    video.dispatchEvent(event('playing'));
    return Promise.resolve();
  };
  const media = new EventTarget();
  media.matches = reduced;
  const pageWindow = new EventTarget();
  pageWindow.matchMedia = () => media;
  const sessionStorage = {getItem: () => preference, setItem: (_key, value) => { preference = value; }};
  vm.runInNewContext(script, {document,window:pageWindow,navigator:{connection:{saveData}},sessionStorage});
  return {document, video, control, media, pageWindow, event, plays:()=>plays};
}

const dormant = fixture({source:''});
assert.equal(dormant.plays(), 0, 'No missing video request while awaiting the approved asset');
assert(dormant.control.hidden && dormant.video.hidden, 'Still image and existing UI retained');

const normal = fixture();
await flush();
assert.equal(normal.plays(), 1);
assert(normal.video.muted && normal.video.loop && normal.video.playsInline);
assert.equal(normal.video.hidden, false);
assert.equal(normal.control.textContent, 'Pause animation');
normal.control.click();
assert(normal.video.paused);
normal.document.hidden = true;
normal.document.dispatchEvent(normal.event('visibilitychange'));
normal.document.hidden = false;
normal.document.dispatchEvent(normal.event('visibilitychange'));
assert.equal(normal.plays(), 1, 'Visitor pause survives switching away and back');
normal.control.click();
await flush();
assert.equal(normal.plays(), 2);
normal.document.hidden = true;
normal.document.dispatchEvent(normal.event('visibilitychange'));
assert(normal.video.paused, 'Hidden tabs stop playback');
normal.document.hidden = false;
normal.document.dispatchEvent(normal.event('visibilitychange'));
await flush();
assert.equal(normal.plays(), 3, 'Playing visitor resumes after returning');
normal.media.matches = true;
normal.media.dispatchEvent(new Event('change'));
assert(normal.video.paused, 'Enabling reduced motion stops playback');

for (const options of [{reduced:true},{saveData:true},{preference:'paused'}]) {
  const f = fixture(options);
  assert.equal(f.plays(), 0, 'Respect motion, data and visitor preferences');
  assert.equal(f.video.getAttribute('src'), null, 'No video download until requested');
  f.control.click();
  await flush();
  assert.equal(f.video.hidden, false, 'Manual play remains available');
}
const denied = fixture({blocked:true});
await flush();
assert(denied.video.hidden && !denied.control.hidden);
assert.equal(denied.control.textContent, 'Play animation', 'Autoplay block offers manual play');
normal.video.dispatchEvent(normal.event('error'));
assert(normal.video.hidden && normal.control.hidden, 'Media failure restores the original image');
assert.equal(normal.document.querySelectorAll('.mansion-hotspot').length, 10);
assert(normal.document.querySelector('#openDrawer'));
console.log('PASS: video state checks (simulated media): dormant source, autoplay, pause/resume, background tabs, reduced motion, data saving, autoplay denial, and media failure. Real MP4 and visual tests pending.');
