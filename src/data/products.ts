import acrilicos from '../../public/img/portfolio/acrilicos.jpg';
import oleos from '../../public/img/portfolio/albaoleo.jpg';
import pinceles from '../../public/img/portfolio/Casanartistica.jpg';
import agenda from '../../public/img/portfolio/agendarec.jpg';
import agendaDiaria from '../../public/img/portfolio/agendarec2.jpg';
import resma from '../../public/img/portfolio/ResmaAutor.jpg';
import biblioratos from '../../public/img/portfolio/biblioratosutil.jpg';
import cartuchera from '../../public/img/portfolio/Cartuchera.jpg';
import canoplas from '../../public/img/portfolio/canoplasofia.jpg';
import canopla from '../../public/img/portfolio/carcanopla.jpg';
import carpeta from '../../public/img/portfolio/carpetaKevin.jpg';
import kitty from '../../public/img/portfolio/carpetaKitti.jpg';
import hp from '../../public/img/portfolio/CartuchosHP.jpg';
import epson from '../../public/img/portfolio/epsoncartuchos.jpg';
import toner from '../../public/img/portfolio/tonerhp.jpg';
import cortadores from '../../public/img/portfolio/cortadoresgomaeva.jpg';
import exito from '../../public/img/portfolio/exitorepuesto.jpg';
import rivadavia from '../../public/img/portfolio/rivadavia.jpg';

export const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'artistica', label: 'Artística' },
  { id: 'comercial', label: 'Oficina' },
  { id: 'escolar', label: 'Escolares' },
] as const;

export const products = [
  { name: 'Pinturas acrílicas', category: 'artistica', image: acrilicos, original: 'acrilicos.jpg', detail: 'Color para tus proyectos' },
  { name: 'Pinceles Casan', category: 'artistica', image: pinceles, original: 'Casanartistica.jpg', detail: 'Para cada trazo' },
  { name: 'Resma de papel Autor', category: 'comercial', image: resma, original: 'ResmaAutor.jpg', detail: 'Papel para todos los días' },
  { name: 'Repuestos Rivadavia', category: 'escolar', image: rivadavia, original: 'rivadavia.jpg', detail: 'Para tus apuntes' },
  { name: 'Óleos Alba', category: 'artistica', image: oleos, original: 'albaoleo.jpg', detail: 'Materiales de artística' },
  { name: 'Agenda comercial', category: 'comercial', image: agenda, original: 'agendarec.jpg', detail: 'Organizá tus ideas' },
  { name: 'Biblioratos Útil', category: 'comercial', image: biblioratos, original: 'biblioratosutil.jpg', detail: 'Cada documento en su lugar' },
  { name: 'Cartuchera escolar', category: 'escolar', image: cartuchera, original: 'Cartuchera.jpg', detail: 'Para acompañarte a clase' },
  { name: 'Agenda diaria', category: 'comercial', image: agendaDiaria, original: 'agendarec2.jpg', detail: 'Planificá tu jornada' },
  { name: 'Canoplas escolares', category: 'escolar', image: canoplas, original: 'canoplasofia.jpg', detail: 'Útiles siempre a mano' },
  { name: 'Cartuchera canopla', category: 'escolar', image: canopla, original: 'carcanopla.jpg', detail: 'Organización para la escuela' },
  { name: 'Carpeta escolar Kevin', category: 'escolar', image: carpeta, original: 'carpetaKevin.jpg', detail: 'Tus materias, ordenadas' },
  { name: 'Carpeta Hello Kitty', category: 'escolar', image: kitty, original: 'carpetaKitti.jpg', detail: 'Diseños escolares' },
  { name: 'Cartuchos HP', category: 'comercial', image: hp, original: 'CartuchosHP.jpg', detail: 'Consultá por tu modelo' },
  { name: 'Cartuchos Epson', category: 'comercial', image: epson, original: 'epsoncartuchos.jpg', detail: 'Consultá por tu modelo' },
  { name: 'Tóner HP', category: 'comercial', image: toner, original: 'tonerhp.jpg', detail: 'Para impresoras láser' },
  { name: 'Troqueladores', category: 'artistica', image: cortadores, original: 'cortadoresgomaeva.jpg', detail: 'Detalles para crear' },
  { name: 'Hojas Éxito', category: 'escolar', image: exito, original: 'exitorepuesto.jpg', detail: 'Repuestos escolares' },
];
