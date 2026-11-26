/* Feature flows: the phone still becomes a short walk through the real app (about 15 seconds),
   built from real simulator frames. It plays only while on screen, and never for reduced motion,
   where the original still stays as it was. */
(()=>{
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".phone[data-flow]").forEach(phone=>{
    const base=phone.dataset.base||"", steps=phone.dataset.flow.split("|").map(s=>{const fade=s.startsWith("~");const [src,cap]=s.replace(/^~/,"").split("::");return {src:base+src,cap,fade}});
    const screen=document.createElement("div"); screen.className="screen";
    const first=phone.querySelector("img"); phone.insertBefore(screen,first); screen.appendChild(first);
    first.classList.add("on");
    const imgs=[first];
    steps.slice(1).forEach(s=>{const i=new Image();i.src=s.src;i.alt="";i.loading="lazy";screen.appendChild(i);imgs.push(i)});
    const cap=document.createElement("figcaption"); cap.className="flowcap"; cap.setAttribute("aria-live","off");
    const dots=document.createElement("span"); dots.className="flowdots";
    steps.forEach(()=>dots.appendChild(document.createElement("i")));
    const txt=document.createElement("span"); cap.append(dots,txt);
    /* phone and caption travel together, so the page grid still sees one item */
    const wrap=document.createElement("div"); wrap.className="flowwrap"; phone.parentNode.insertBefore(wrap,phone); wrap.append(phone,cap);
    const hold=Math.round(15000/steps.length);
    let n=0,timer=null;
    /* a new screen slides in like an iPhone push; a change within the same screen (~) cross-fades */
    let cur=0;
    const show=k=>{
      if(k!==cur){const inc=imgs[k],out=imgs[cur],mode=steps[k].fade||k===0?"fade":"push";
        imgs.forEach(im=>im.classList.remove("leave","enter","push","fade"));
        out.classList.remove("on");out.classList.add("leave",mode);
        inc.classList.add("enter",mode);void inc.offsetWidth;inc.classList.remove("enter");inc.classList.add("on");cur=k}
      else imgs[k].classList.add("on");[...dots.children].forEach((d,j)=>d.classList.toggle("on",j===k));txt.textContent=steps[k].cap||""};
    show(0);
    const tick=()=>{n=(n+1)%steps.length;show(n)};
    new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting&&!timer){timer=setInterval(tick,hold)}
      else if(!e.isIntersecting&&timer){clearInterval(timer);timer=null}
    }),{threshold:.35}).observe(phone);
  });
})();
