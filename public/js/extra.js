$($(function () {

  const loginToggle = $("#loginToggle");
  const signUpToggle = $("#signUpToggle");
  const logoToggle = $("#willChatLogoHeader");

  const isSignUpToggled = false;

  const signUpRow = $("#signUpRow")
  const loginRow = $("#logInRow")
  signUpRow.hide();
  loginRow.hide();



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

  const isloginToggled = false;
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