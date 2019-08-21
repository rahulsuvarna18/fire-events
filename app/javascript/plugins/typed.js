import Typed from 'typed.js';

const typed = () => {

 const typedSubtitle = new Typed('#typed', {
   strings: ["Putting your location in", "Setting up the heatmap", "Compiling the results", "Found the best events for you"],
   typeSpeed: 50,
   showCursor: false,
   loop: true
 });
}

export { typed };
