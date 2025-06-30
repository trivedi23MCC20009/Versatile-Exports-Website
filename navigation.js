document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Event delegation for dropdown toggles
  nav.addEventListener('click', function (e) {
    const target = e.target;

    // Main dropdown toggle
    if (target.matches('li.has-nested > a')) {
      e.preventDefault();
      const dropdownMenu = target.nextElementSibling;
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
      }
    }

    // Nested dropdown toggle
    if (target.classList.contains('nested-toggle')) {
      e.preventDefault();
      const nestedDropdown = target.nextElementSibling;
      if (nestedDropdown) {
        nestedDropdown.classList.toggle('show');
        target.classList.toggle('active');
      }
    }
  });

  // Close dropdowns if clicked outside
  document.addEventListener('click', function (e) {
    const productsButton = nav.querySelector('li.has-nested > a');
    const dropdownMenu = nav.querySelector('.dropdown-menu');
    if (productsButton && dropdownMenu && !productsButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('show');
    }

    const nestedToggles = nav.querySelectorAll('.nested-toggle');
    const nestedDropdowns = nav.querySelectorAll('.nested-dropdown');
    nestedToggles.forEach((toggle, index) => {
      const nestedDropdown = nestedDropdowns[index];
      if (nestedDropdown && !toggle.contains(e.target) && !nestedDropdown.contains(e.target)) {
        nestedDropdown.classList.remove('show');
        toggle.classList.remove('active');
      }
    });
  });
});
