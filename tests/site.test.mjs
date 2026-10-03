import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import { gzipSync } from 'node:zlib';

const root = path.resolve('dist');
const origin = 'https://libreria2001.com.ar';
async function walk(dir) {
  const entries=await readdir(dir,{withFileTypes:true});
  return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();
}
const files=await walk(root);
const pages=await Promise.all(files.filter(f=>f.endsWith('.html')&&!path.basename(f).startsWith('google')).map(async file=>{
  const html=await readFile(file,'utf8');
  const relative=path.relative(root,file).split(path.sep).join('/');
  const route=relative==='index.html'?'/':`/${relative.replace(/index\.html$/,'')}`;
  return {file,html,route,$:load(html)};
}));
const documentForRoute = route => pages.find(p=>p.route===route||p.route===`${route}/`);

test('Every indexable route has one H1, unique metadata and a canonical on the established host',()=>{
  const titles=new Set();
  for(const p of pages) {
    assert.equal(p.$('h1').length,1,p.route);
    assert.equal(p.$('html').attr('lang'),'es-AR');
    const title=p.$('title').text();
    assert.ok(title.length>20 && !titles.has(title),p.route);
    titles.add(title);
    assert.ok(p.$('meta[name="description"]').attr('content')?.length>50,p.route);
    assert.equal(p.$('link[rel="canonical"]').attr('href'),origin+p.route);
    assert.equal(p.$('meta[property="og:url"]').attr('content'),origin+p.route);
    if(p.route!=='/404.html') assert.equal(p.$('meta[name="robots"][content*="noindex"]').length,0,p.route);
  }
  assert.equal(pages.length,6);
});

test('All local links, anchors, optimized images and script/style references resolve',async()=>{
  for(const p of pages) {
    const references=p.$('a[href], img[src], script[src], link[href]').toArray();
    for(const el of references) {
      const raw=p.$(el).attr('href')||p.$(el).attr('src');
      if(!raw||/^(tel:|mailto:|data:)/.test(raw)) continue;
      const url=new URL(raw,origin+p.route);
      if(url.origin!==origin) continue;
      const pathname=decodeURIComponent(url.pathname);
      const diskPath=path.join(root,pathname.endsWith('/')?`${pathname}index.html`:pathname);
      const info=await stat(diskPath).catch(()=>null);
      assert.ok(info?.isFile(),`${p.route}: missing ${raw}`);
      if(url.hash) {
        const target=documentForRoute(url.pathname);
        assert.ok(target,`No document for ${raw}`);
        assert.ok(target.$('[id]').toArray().some(node=>target.$(node).attr('id')===decodeURIComponent(url.hash.slice(1))),`${p.route}: broken anchor ${raw}`);
      }
    }
    p.$('img[src]').each((_,el)=>{
      assert.ok(p.$(el).attr('alt')!==undefined,`${p.route}: missing alt`);
      assert.ok(Number(p.$(el).attr('width'))>0 && Number(p.$(el).attr('height'))>0,`${p.route}: missing image dimensions`);
    });
  }
});

test('Sitemap and robots agree and include every public landing page',async()=>{
  const xml=load(await readFile(path.join(root,'sitemap.xml'),'utf8'),{xml:true});
  const urls=xml('loc').toArray().map(el=>xml(el).text()).sort();
  assert.deepEqual(urls,pages.filter(p=>p.route!=='/404.html').map(p=>origin+p.route).sort());
  assert.ok((await readFile(path.join(root,'robots.txt'),'utf8')).includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.equal((await readFile(path.join(root,'CNAME'),'utf8')).trim(),'libreria2001.com.ar');
  assert.equal((await readFile(path.join(root,'googleee7e0b8129d134e0.html'),'utf8')).trim(),'google-site-verification: googleee7e0b8129d134e0.html');
});

test('Structured business information and contact destinations stay consistent',()=>{
  for(const p of pages) {
    const data=JSON.parse(p.$('script[type="application/ld+json"]').text());
    const business=data['@graph'].find(item=>item['@type']==='Store');
    assert.equal(business.foundingDate,'1992');
    assert.equal(business.telephone,'+5491128995506');
    assert.equal(business.url,origin+'/');
    assert.equal(business.address.addressLocality,'Avellaneda');
    p.$('a[data-contact="phone"]').each((_,el)=>assert.equal(p.$(el).attr('href'),'tel:+5491128995506'));
    p.$('a[data-contact="whatsapp"][href]').each((_,el)=>{
      const link=new URL(p.$(el).attr('href'));
      assert.equal(link.origin,'https://wa.me');
      assert.equal(link.pathname,'/5491128995506');
      assert.ok(link.searchParams.get('text'));
    });
    const map=p.$('iframe');
    assert.equal(map.length,p.$('#section-contact').length,p.route);
    if(map.length) {
      assert.equal(map.attr('loading'),'lazy');
      assert.equal(new URL(map.attr('src')).searchParams.get('z'),'14');
      assert.ok(map.attr('title')?.includes('Avellaneda'));
    }
    assert.equal(p.$('[onclick]').length,0,'No inline Analytics click handlers');
  }
});

test('The homepage preserves legacy section links and all 18 products in its HTML',()=>{
  const home=documentForRoute('/');
  for(const id of ['header','Section-about','section-main','section-works','section-contact']) assert.equal(home.$(`[id="${id}"]`).length,1,id);
  assert.equal(home.$('[data-product]').length,18);
  assert.equal(home.$('[data-product][hidden]').length,0,'Products must remain available without JavaScript');
  assert.ok(home.$('h1').text().includes('Avellaneda'));
  assert.ok(home.$('h1').text().includes('1992'));
  assert.equal(home.$('.hero img[loading="eager"][fetchpriority="high"]').length,1);
});

test('Client JavaScript stays small and excludes the legacy runtime',async()=>{
  for(const p of pages) {
    const modules=p.$('script[type="module"]').toArray();
    assert.equal(modules.length,1,p.route);
    const chunks=await Promise.all(modules.map(async el=>{
      const src=p.$(el).attr('src');
      return src ? readFile(path.join(root,decodeURIComponent(new URL(src,origin).pathname))) : Buffer.from(p.$(el).text());
    }));
    // Astro may inline a small module; measure both output forms.
    const script=Buffer.concat(chunks);
    assert.ok(script.length>0 && script.length<15000,`${p.route}: client JS is ${script.length} bytes`);
    assert.ok(gzipSync(script).length<6000);
    assert.ok(!/jQuery|skrollr|niceScroll|fancybox/.test(script.toString()));
    assert.ok(!p.html.includes('http://fonts.googleapis.com'));
  }
});
