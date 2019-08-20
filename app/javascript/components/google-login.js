// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('Given Name: ' + profile.getGivenName());
//   console.log('Family Name: ' + profile.getFamilyName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

export const googleAuthenticate = () => {
  window.gapi.load('auth2', function() {
    auth2 = window.gapi.auth2.init({
      client_id: '529865086294-4tkbq67f0eq1504dojum974gimd1g0fa.apps.googleusercontent.com',
      fetch_basic_profile: false,
      scope: 'profile'
    });

    // Sign the user in, and then retrieve their ID.
    auth2.signIn().then(function() {
      console.log(auth2.currentUser.get().getGivenName());
      console.log(auth2.currentUser.get().getFamilyName());
      console.log(auth2.currentUser.get().getEmail());
      console.log(auth2.currentUser.get().getImageUrl());
    });
  });
}
