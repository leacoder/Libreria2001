export const business = {
  name: 'Librería 2001',
  site: 'https://libreria2001.com.ar',
  founded: '1992',
  address: 'Av. Mitre 634',
  premises: 'Locales 7 y 10',
  city: 'Avellaneda, Buenos Aires',
  phone: '+541173981174',
  phoneDisplay: '11 7398-1174',
  whatsapp: '5491128995506',
  whatsappDisplay: '11 2899-5506',
  email: 'libreria2001@hotmail.com',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=-34.661290%2C-58.366276',
  instagram: 'https://www.instagram.com/libreria2001/',
  facebook: 'https://www.facebook.com/pages/Libreria-2001/152006401586229',
};

export function whatsappUrl(message = 'Hola, me contacto desde la web de Librería 2001. Quisiera hacer una consulta.') {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const storeSchema = {
  '@type': 'Store',
  '@id': `${business.site}/#negocio`,
  name: business.name,
  url: `${business.site}/`,
  foundingDate: business.founded,
  telephone: business.phone,
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${business.address}, locales 7 y 10`,
    addressLocality: 'Avellaneda',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -34.661290, longitude: -58.366276 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '13:00' },
  ],
  sameAs: [business.instagram, business.facebook],
};
