$(document).ready(function() {
  if( $('.login-form-username').val() && $('.login-form-password').val() ) {
    $('.login-form-button').attr('disabled', false);
  }
});

$('.login-form-username, .login-form-password').on('input', function() {
  if( !$('.login-form-username').val() || !$('.login-form-password').val() ) {
    $('.login-form-button').attr('disabled', true);
  } else {
    $('.login-form-button').attr('disabled', false);
  }
});

$('.login-form').on('submit', function(event) {
  event.preventDefault();
  alert('submit');
});

$('.login-quit').on('click', function(event) {
  event.preventDefault();
  alert('quit');
});
