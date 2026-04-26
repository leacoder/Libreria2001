/* Librería 2001 — main script */
(() => {
	'use strict';

	const $ = (sel, root = document) => root.querySelector(sel);
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

	/* --- Sticky header style on scroll --- */
	const header = $('.site-header');
	const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });

	/* --- Mobile menu --- */
	const toggle = $('.nav-toggle');
	const nav = $('#primary-nav');
	const closeMenu = () => {
		toggle.setAttribute('aria-expanded', 'false');
		nav.classList.remove('is-open');
		document.body.style.overflow = '';
	};
	toggle.addEventListener('click', () => {
		const open = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!open));
		nav.classList.toggle('is-open', !open);
		document.body.style.overflow = open ? '' : 'hidden';
	});
	$$('#primary-nav a').forEach(a => a.addEventListener('click', closeMenu));
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
	});

	/* --- Active nav link based on section in view --- */
	const navLinks = $$('#primary-nav a[href^="#"]');
	const sections = navLinks
		.map(a => document.getElementById(a.getAttribute('href').slice(1)))
		.filter(Boolean);

	if (sections.length && 'IntersectionObserver' in window) {
		const navObs = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					navLinks.forEach(a => {
						a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
					});
				}
			});
		}, { rootMargin: '-40% 0px -55% 0px' });
		sections.forEach(s => navObs.observe(s));
	}

	/* --- Reveal on scroll --- */
	if ('IntersectionObserver' in window) {
		const revealObs = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					obs.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -10% 0px', threshold: .1 });
		$$('.reveal').forEach(el => revealObs.observe(el));

		// Stagger product cards in
		$$('.product').forEach((p, i) => {
			p.style.transitionDelay = `${Math.min(i * 30, 400)}ms`;
			p.classList.add('reveal');
			revealObs.observe(p);
		});
	} else {
		$$('.reveal').forEach(el => el.classList.add('is-visible'));
	}

	/* --- Product filter --- */
	const filters = $$('.filter');
	const products = $$('.product');
	filters.forEach(btn => {
		btn.addEventListener('click', () => {
			const cat = btn.dataset.filter;
			filters.forEach(f => {
				const active = f === btn;
				f.classList.toggle('is-active', active);
				f.setAttribute('aria-selected', String(active));
			});
			products.forEach(p => {
				const show = cat === 'all' || p.dataset.cat === cat;
				p.classList.toggle('is-hidden', !show);
			});
		});
	});

	/* --- Lightbox (native <dialog>) --- */
	const dialog = $('#lightbox');
	const dialogImg = $('img', dialog);
	const dialogCap = $('figcaption', dialog);
	const dialogClose = $('.lightbox-close', dialog);

	products.forEach(btn => {
		btn.addEventListener('click', () => {
			dialogImg.src = btn.dataset.img;
			dialogImg.alt = btn.dataset.title;
			dialogCap.textContent = btn.dataset.title;
			if (typeof dialog.showModal === 'function') dialog.showModal();
			else dialog.setAttribute('open', '');
		});
	});
	dialogClose.addEventListener('click', () => dialog.close());
	dialog.addEventListener('click', e => {
		// Close on backdrop click (target is the <dialog> itself, not its children)
		if (e.target === dialog) dialog.close();
	});

	/* --- Footer year --- */
	const yearEl = $('#year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
