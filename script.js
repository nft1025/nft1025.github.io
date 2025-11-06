
function toggleDetails(card) {
  const details = card.querySelector('.details');
  details.style.display = (details.style.display === "block") ? "none" : "block";
}

window.addEventListener('scroll', () => {
  const skills = document.querySelectorAll('.skill-bar div');
  skills.forEach(skill => {
    const rect = skill.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50) {
      skill.style.width = skill.getAttribute('data-width');
    }
  });
});
