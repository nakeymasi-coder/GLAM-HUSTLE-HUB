import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import * as cssTree from 'css-tree';
const root = new URL('../', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
const html=read('referral-hub.html');
const {document}=parseHTML(html);
assert.equal(document.querySelectorAll('h1').length,1);
assert.equal(document.querySelectorAll('.referral-card').length,3);
const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
assert.equal(new Set(ids).size,ids.length,'No duplicate IDs');
for(const node of document.querySelectorAll('[aria-labelledby]')) for (const id of node.getAttribute('aria-labelledby').split(' ')) assert(document.getElementById(id),`Missing label ${id}`);
assert.equal(document.querySelector('[href="#page-content"]').textContent,'Skip to content');
const hrefs=[...document.querySelectorAll('.referral-action')].map(e=>e.getAttribute('href'));
assert.deepEqual(hrefs,['https://app.base44.com/register?ref=C6HKQAD9N5HUFGDM&source=referral_program','https://lovable.dev/invite/XZ8924I','https://muse.ai/join']);
for(const a of document.querySelectorAll('.referral-action')) {
 assert.equal(a.getAttribute('target'),'_blank');
 for(const rel of ['sponsored','noopener','noreferrer'])assert(a.rel.split(' ').includes(rel));
 assert(a.textContent.includes('opens in a new tab'));
}
assert(html.includes('OTPX5R') && html.includes('Opening the link alone won’t apply it.'));
assert(html.indexOf('Referral disclosure:')<html.indexOf('class="referral-grid"'),'Disclosure before referrals');
assert(!/48.hours|free credits|earn \$|no extra cost|👑/.test(html),'No unsupported benefit or cost claims');
for (const file of ['referral-hub.css','harvest-royale.css','scene-controls.css','pinterest-feature.css']) {
 cssTree.parse(read(file));
 assert(!/#(?:d4af37|8a6a16|fff0a6|b88b20|f9dd69|ffcc00)|212, 175, 55|--hr-gold/i.test(read(file)),`Gold remains in ${file}`);
}
for(const page of ['index.html','about.html','best-sellers.html','reviews.html','glam-vault.html','one-on-one.html','referral-hub.html']) {
 const {document:d}=parseHTML(read(page));
 assert(d.querySelector('a[href="tel:+15743501953"]'),`Phone missing in ${page}`);
 if(page!=='one-on-one.html') assert(d.querySelector('a[href="./referral-hub.html"]'),`Hub missing in ${page}`);
 assert(!d.querySelector('footer a[href="./referral-hub.html"]'),`Hub must not be in footer: ${page}`);
 assert(!d.querySelector('#topNav a[href="./referral-hub.html"]'),`Hub must not be in main bar: ${page}`);
 const drawer=d.querySelector('#drawer');
 if(drawer) assert.equal([...drawer.querySelectorAll('a')].at(-1).getAttribute('href'),'./referral-hub.html',`Hub must be last in sidebar: ${page}`);
 assert(read(page).includes('glamorousgrammyglowup@gmail.com'),`Email missing in ${page}`);
}
const script=read('referral-hub.js');
function fixture(clipboard) {
 const {document:d}=parseHTML(html);
 const button=d.getElementById('copy-muse-code');
 let click;
 button.addEventListener=(name,handler)=>{if(name==='click') click=handler};
 vm.runInNewContext(script,{document:d,navigator:clipboard?{clipboard}:{}});
 return {d,button,click,status:d.getElementById('muse-copy-status')};
}
let writes=[];
const happy=fixture({writeText:async text=>writes.push(text)});
assert.equal(happy.button.hidden,false);
await happy.click(); await happy.click();
assert.deepEqual(writes,['OTPX5R','OTPX5R'],'Repeated copying works');
assert.equal(happy.button.disabled,false);
assert(happy.status.textContent.startsWith('Copied.'));
let resolve; writes=[];
const pending=fixture({writeText:text=>{writes.push(text);return new Promise(r=>resolve=r)}});
const first=pending.click(); await pending.click();
assert.deepEqual(writes,['OTPX5R'],'Pending repeated clicks guarded');
assert.equal(pending.button.disabled,true);
resolve();await first;
assert.equal(pending.button.disabled,false);
for(const clipboard of [null,{writeText:async()=>{throw new Error('denied')}}]) {
 const blocked=fixture(clipboard); await blocked.click();
 assert(blocked.status.textContent.includes('Select and copy the code OTPX5R'));
 assert.equal(blocked.button.disabled,false);
 assert.equal(blocked.d.getElementById('muse-referral-code').textContent,'OTPX5R');
}
vm.runInNewContext(script,{document:{getElementById:()=>null},navigator:{}});
assert.equal(document.getElementById('copy-muse-code').hidden,true,'No-JS has no inactive button');
assert.equal(document.getElementById('muse-referral-code').textContent,'OTPX5R','No-JS code visible');
console.log('PASS: referral URLs, disclosure, code, IDs, labels, contact links, CSS syntax, copy success/repeat/pending/failure/no-API/no-JS states.');
