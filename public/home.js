window.addEventListener('scroll', function() {
    var introElement = document.getElementById('intro');
    var membersElement = document.getElementById('members');

    var introPosition = introElement.getBoundingClientRect().top;
    var membersPosition = membersElement.getBoundingClientRect().top;

    var windowHeight = window.innerHeight;

    if (introPosition < windowHeight * 0.8) {
      introElement.classList.add('visible');
    } else {
      introElement.classList.remove('visible');
    }

    if (membersPosition < windowHeight * 0.8) {
      membersElement.classList.add('visible');
    } else {
      membersElement.classList.remove('visible');
    }
});

function scrollToPosition(position) {
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
}