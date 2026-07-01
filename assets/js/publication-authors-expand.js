(function () {
  function animateExpandedAuthors(toggle, dynamicPart, text) {
    let idx = 0;
    dynamicPart.textContent = '';
    const speed = 14;

    function step() {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      idx += 1;
      dynamicPart.textContent = text.slice(0, idx);
      if (idx < text.length) {
        toggle._authorTimer = setTimeout(step, speed);
      }
    }

    step();
  }

  function setCollapsedState(toggle, dynamicPart, collapsedText) {
    toggle.setAttribute('aria-expanded', 'false');
    const row = toggle.closest('.pub-authors--expandable');
    if (row) row.classList.remove('is-expanded');
    dynamicPart.textContent = collapsedText;
    if (toggle._authorTimer) {
      clearTimeout(toggle._authorTimer);
      toggle._authorTimer = null;
    }
  }

  function setExpandedState(toggle, dynamicPart, expandedText) {
    toggle.setAttribute('aria-expanded', 'true');
    const row = toggle.closest('.pub-authors--expandable');
    if (row) row.classList.add('is-expanded');
    if (toggle._authorTimer) {
      clearTimeout(toggle._authorTimer);
      toggle._authorTimer = null;
    }
    animateExpandedAuthors(toggle, dynamicPart, expandedText);
  }

  function init() {
    const toggles = document.querySelectorAll('.pub-authors-toggle');
    toggles.forEach((toggle) => {
      const dynamicPart = toggle.querySelector('.pub-authors-flow-dynamic');
      if (!dynamicPart) return;
      const collapsedText = dynamicPart.getAttribute('data-collapsed') || dynamicPart.textContent || '';
      const expandedText = dynamicPart.getAttribute('data-expanded') || '';

      setCollapsedState(toggle, dynamicPart, collapsedText);

      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          setCollapsedState(toggle, dynamicPart, collapsedText);
        } else {
          setExpandedState(toggle, dynamicPart, expandedText);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
