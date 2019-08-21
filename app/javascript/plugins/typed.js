import Typed from 'typed.js';

const typed = () => {
  // const typedTitle = new Typed('.marketing-title', {
  //   strings: ["Never let Mister Bear alone!"],
  //   typeSpeed: 100
  // });
  const typedSubtitle = new Typed('#search_query', {
    strings: ["London", "Paris", "New-York", "Hong-Kong", "Mexico", "New Dehli", "Bangkok"],
    typeSpeed: 50,
    showCursor: false,
    loop: true
  });
}

export { typed };
