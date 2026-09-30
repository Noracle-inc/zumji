
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
	const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!isOpen));
	mainNav.classList.toggle('open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		menuToggle.setAttribute('aria-expanded', 'false');
		mainNav.classList.remove('open');
	});
});

const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('.hero-content').classList.add('visible');

document.querySelectorAll('.filter-list button').forEach((button) => {
	button.addEventListener('click', () => {
		document.querySelector('.filter-list button.active').classList.remove('active');
		button.classList.add('active');
		const filter = button.dataset.filter;
		document.querySelectorAll('.gallery-item').forEach((item) => {
			item.hidden = filter !== 'all' && item.dataset.category !== filter;
		});
	});
});

const enquiryForm = document.querySelector('#enquiry-form');
const successMessage = document.querySelector('#success-message');
const successLink = successMessage.querySelector('a');
successMessage.hidden = true;

const emailField = document.createElement('label');
emailField.innerHTML = 'Email address<input type="email" name="email" autocomplete="email" placeholder="you@example.com">';
enquiryForm.insertBefore(emailField, enquiryForm.querySelector('[name="eventType"]').parentElement);

const consentField = document.createElement('label');
consentField.className = 'consent full';
consentField.innerHTML = '<input type="checkbox" name="consent" required><span>I agree to be contacted by Zumji about this enquiry.</span>';
enquiryForm.insertBefore(consentField, enquiryForm.querySelector('button[type="submit"]'));

const preferredDate = enquiryForm.querySelector('[name="date"]');
preferredDate.min = new Date().toISOString().split('T')[0];
const mapCard = document.querySelector('.map-card');
const mapLink = document.createElement('a');
mapLink.className = 'map-open';
mapLink.href = 'https://www.google.com/maps/search/?api=1&query=RVF8%2BQRW%2C%20Jos%20930103%2C%20Plateau%2C%20Nigeria';
mapLink.target = '_blank';
mapLink.rel = 'noreferrer';
mapLink.innerHTML = 'Open exact location <span>↗</span>';
mapCard.append(mapLink);

document.querySelector('.gallery-item:nth-child(1) img').src = 'assets/zumji-hall-1.jpg';
document.querySelector('.gallery-item:nth-child(2) img').src = 'assets/zumji-conference-1.jpg';
document.querySelector('.gallery-item:nth-child(3) img').src = 'assets/zumji-hospitality.jpg';
document.querySelector('.gallery-item:nth-child(4) img').src = 'assets/zumji-conference-2.jpg';
document.querySelector('.stay-image img').src = 'assets/zumji-accommodation.jpg';
document.querySelector('.offer-large img').src = 'assets/zumji-hall-2.jpg';
document.querySelector('.venue-image img').src = 'assets/zumji-hall-1.jpg';
document.querySelector('.image-card img').src = 'assets/zumji-hospitality.jpg';

enquiryForm.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!enquiryForm.checkValidity()) {
		enquiryForm.reportValidity();
		return;
	}
	const formData = new FormData(enquiryForm);
	const whatsappMessage = `Hello Zumji, I would like to enquire about a ${formData.get('eventType')} on ${formData.get('date') || 'a date to be confirmed'}. Name: ${formData.get('name')}. Phone: ${formData.get('phone')}. Guests: ${formData.get('guests') || 'to be confirmed'}. Service: ${formData.get('service')}. ${formData.get('message') || ''}`;
	successLink.href = `https://wa.me/2348181061616?text=${encodeURIComponent(whatsappMessage)}`;
	enquiryForm.hidden = true;
	successMessage.hidden = false;
	successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
