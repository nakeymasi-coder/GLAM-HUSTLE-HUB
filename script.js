const drawer=document.getElementById('drawer'),shade=document.getElementById('shade'),nav=document.getElementById('topNav');
document.getElementById('openDrawer').onclick=()=>{drawer.classList.add('open');shade.classList.add('on')};
document.getElementById('closeDrawer').onclick=closeDrawer;shade.onclick=closeDrawer;
function closeDrawer(){drawer.classList.remove('open');shade.classList.remove('on')}
document.getElementById('menuButton').onclick=()=>nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.rise').forEach(item=>observer.observe(item));
