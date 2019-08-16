import Typed from 'typed.js';

const loadDynamicBannerText = () => {
  new Typed('#banner-typed-text', {
    strings: ["Become a king", "Learn to make cocktails"],
    typeSpeed: 20,
    loop: true
  });
}
export { loadDynamicBannerText };
