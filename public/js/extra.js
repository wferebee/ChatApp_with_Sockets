$($(function () {



  var signUpRow = $("#signUpRow")
  var loginRow = $("#logInRow")
  signUpRow.hide();
  loginRow.hide();


  var loginToggle = $("#loginToggle");
  var signUpToggle = $("#signUpToggle");
  var logoToggle = $("#willChatLogoHeader");

  var isSignUpToggled = false;

  signUpToggle.on("click", function () {

    logoToggle.hide();
    if (isSignUpToggled === false) {
      loginRow.hide();
      isloginToggled = false;
      signUpRow.show();
      isSignUpToggled = true;
    } else {
      signUpRow.hide();
      isSignUpToggled = false;
      logoToggle.show();
    }
  });

  var isloginToggled = false;
  loginToggle.on("click", function () {
    logoToggle.hide();
    if (isloginToggled === false) {
      signUpRow.hide();
      isSignUpToggled = false;
      loginRow.show();
      isloginToggled = true;
    } else {
      loginRow.hide();
      isloginToggled = false;
      logoToggle.show();
    }
  });
}));


