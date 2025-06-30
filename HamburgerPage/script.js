function setupImageHover(selector, defaultSrc, hoverSrc) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.addEventListener('mouseover', () => {
    el.src = hoverSrc;
  });

  el.addEventListener('mouseout', () => {
    el.src = defaultSrc;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupImageHover('.getintouch', 'Images/touch.png', 'Images/touch_s.png');
  setupImageHover('.contactHamburger', 'Images/contacts.png', 'Images/contacts_s.png');
  setupImageHover('.scheduleHamburger', 'Images/schedule.png', 'Images/schedule_s.png');
  setupImageHover('.crew', 'Images/crew.png', 'Images/crew_s.png');
});
