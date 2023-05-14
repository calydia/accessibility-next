(function() {
  document.getElementById('skip').addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.getElementById('skip-target');
    target.setAttribute('tabindex', '-1');
    target.focus();
  });
  document.getElementById('skip-search').addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.getElementById('search-input');
    target.focus();
  });
})();
