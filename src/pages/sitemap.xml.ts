import { business } from '../data/business';
import { services,servicePath } from '../data/services';

export function GET() {
  const paths = ['/', ...services.map(s=>servicePath(s.slug))];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`\n  <url><loc>${business.site}${path}</loc></url>`).join('')}\n</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
