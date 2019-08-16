import Typed from 'typed.js';

const loadDynamicBannerText = () => {
  new Typed('#search_query', {
    strings: ["London", "Paris", "New York", "Rome", "Vancouver", "Bali"],
    typeSpeed: 20,
    loop: true
  });
}
export { loadDynamicBannerText };
