$('.cv-btn').on('click', function (event) {

  if ($(this).hasClass('btn-rotate')) {
    $(this).removeClass('btn-rotate');
  } else {
    $(this).addClass('btn-rotate');
  }

});
