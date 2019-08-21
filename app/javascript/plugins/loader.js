import Typed from 'loader.js';

const typed = () => {
 // const typedTitle = new Typed(‘.marketing-title’, {
 //   strings: [“Never let Mister Bear alone!“],
 //   typeSpeed: 100
 // });
 const typedSubtitle = new Typed(‘.marketing-subtitle’, {
   strings: [“”, “”],
   typeSpeed: 50,
   showCursor: false,
   loop: true
 });
}
export { typed };
