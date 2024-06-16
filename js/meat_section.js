const recipeCards = document.querySelectorAll('.recipe-card');

recipeCards.forEach((card) => {
  card.addEventListener('mouseover', () => {
    card.style.transform = 'scale(1.1)';
    card.style.transition = 'all 0.5s ease-in-out';
  });

  card.addEventListener('mouseout', () => {
    card.style.transform = 'scale(1)';
    card.style.transition = 'all 0.5s ease-in-out';
  });
});
