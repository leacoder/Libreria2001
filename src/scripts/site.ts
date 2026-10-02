export {};

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

const header = document.querySelector<HTMLElement>('[data-header]');
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const nav = document.querySelector<HTMLElement>('#site-navigation');
if (header && menuButton && nav) {
  const mobile = window.matchMedia('(max-width: 900px)');
  const setMenu = (open: boolean) => {
    header.classList.toggle('menu-open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open ? 'Cerrar menú' : 'Abrir menú');
  };
  header.classList.add('is-enhanced');
  menuButton.hidden = false;
  setMenu(false);
  menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
  nav.addEventListener('click',event=>{
    if (event.target instanceof Element && event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && header.classList.contains('menu-open')) {setMenu(false);menuButton.focus();}
  });
  document.addEventListener('click',event=>{
    if(event.target instanceof Node && !header.contains(event.target)) setMenu(false);
  });
  mobile.addEventListener('change',()=>setMenu(false));
}

const gallery = document.querySelector<HTMLElement>('[data-gallery]');
if (gallery) {
  const cards = Array.from(gallery.querySelectorAll<HTMLElement>('[data-product]'));
  const filters = Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const controls = gallery.querySelector<HTMLElement>('[data-gallery-controls]');
  const count = gallery.querySelector<HTMLElement>('[data-gallery-count]');
  const more = gallery.querySelector<HTMLButtonElement>('[data-show-more]');
  let selected = 'todos';
  let limit = 8;
  const render = () => {
    const matches = cards.filter(card=>selected==='todos'||card.dataset.category===selected);
    cards.forEach(card=>{card.hidden=!matches.includes(card)||matches.indexOf(card)>=limit;});
    filters.forEach(filter=>{const active=filter.dataset.filter===selected;filter.setAttribute('aria-pressed',String(active));filter.classList.toggle('is-active',active);});
    if(count) count.textContent=`${Math.min(limit,matches.length)} de ${matches.length} productos`;
    if(more) more.hidden=limit>=matches.length;
  };
  if(controls) controls.hidden=false;
  filters.forEach(filter=>filter.addEventListener('click',()=>{selected=filter.dataset.filter||'todos';limit=8;render();}));
  more?.addEventListener('click',()=>{
    const previousLimit=limit;
    limit+=8;
    render();
    const next=cards.filter(card=>!card.hidden)[previousLimit];
    next?.querySelector<HTMLAnchorElement>('a')?.focus({preventScroll:true});
  });
  render();

  const dialog=gallery.querySelector<HTMLDialogElement>('[data-product-dialog]');
  const dialogImage=gallery.querySelector<HTMLImageElement>('[data-dialog-image]');
  const title=gallery.querySelector<HTMLElement>('#dialog-title');
  const contact=gallery.querySelector<HTMLAnchorElement>('[data-dialog-contact]');
  let opener: HTMLAnchorElement | null=null;
  if(dialog && typeof dialog.showModal==='function' && dialogImage && title && contact) {
    gallery.querySelectorAll<HTMLAnchorElement>('[data-preview]').forEach(link=>link.addEventListener('click',event=>{
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey) return;
      event.preventDefault();
      opener=link;
      const name=link.dataset.productName||'Producto';
      dialogImage.src=link.dataset.preview||link.href;
      dialogImage.alt=name;
      title.textContent=name;
      const productContact=link.closest('article')?.querySelector<HTMLAnchorElement>('[data-contact="whatsapp"]');
      if(productContact) contact.href=productContact.href;
      contact.dataset.item=name;
      dialog.showModal();
      document.body.classList.add('dialog-open');
    }));
    gallery.querySelector('[data-close-dialog]')?.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog) dialog.close();});
    dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');opener?.focus({preventScroll:true});});
  }
}

document.querySelectorAll<HTMLElement>('[data-map-panel]').forEach(panel=>{
  const button=panel.querySelector<HTMLButtonElement>('[data-load-map]');
  const container=panel.querySelector<HTMLElement>('[data-map-container]');
  if(!button||!container) return;
  button.hidden=false;
  button.addEventListener('click',()=>{
    const frame=document.createElement('iframe');
    frame.title='Ubicación de Librería 2001 en Av. Mitre 634, Avellaneda';
    frame.src='https://maps.google.com/maps?q=-34.661290%2C-58.366276&z=17&output=embed';
    frame.loading='lazy';
    frame.referrerPolicy='no-referrer-when-downgrade';
    frame.allowFullscreen=true;
    container.append(frame);
    container.hidden=false;
    panel.classList.add('map-ready');
    button.disabled=true;
    button.textContent='Mapa cargado';
  },{once:true});
});

// Measurement is optional and never intercepts navigation or sends message text.
document.addEventListener('click',event=>{
  if(!(event.target instanceof Element)) return;
  const link=event.target.closest<HTMLAnchorElement>('a[data-contact]');
  if(!link || typeof window.gtag!=='function') return;
  const names:Record<string,string>={whatsapp:'contact_whatsapp',phone:'contact_phone',directions:'get_directions',email:'contact_email'};
  const name=names[link.dataset.contact||''];
  if(!name) return;
  try {
    window.gtag('event',name,{contact_location:link.dataset.location||'site',...(link.dataset.item ? {item_name:link.dataset.item}:{}),transport_type:'beacon'});
  } catch { /* Contact links remain usable if an analytics integration fails. */ }
});
