// Phan Media — shared scripts
(function () {
  // Nav scroll state (chỉ áp dụng khi nav không phải dạng "solid" cố định)
  var nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('solid')) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Mobile menu
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
      });
    });
  }

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .14 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Toast
  function showToast(t) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = t; toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }

  // Booking form -> Zalo
  // Gom thông tin -> copy clipboard -> mở Zalo để dán & gửi (không cần server).
  // Muốn nhận thẳng vào email: tạo Formspree/Google Form rồi đổi <form action=...> method=POST.
  var ZALO = '0976722420';
  var form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = ev.target;
      var text = [
        'YÊU CẦU CHỤP ẢNH',
        'Họ tên: ' + (f.name.value || '—'),
        'SĐT: ' + (f.phone.value || '—'),
        'Loại hình: ' + f.type.value,
        'Ngày dự kiến: ' + (f.date.value || '—'),
        'Mong muốn: ' + (f.msg.value || '—')
      ].join('\n');
      var open = function () { window.open('https://zalo.me/' + ZALO, '_blank'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showToast('Đã sao chép thông tin — dán vào Zalo và gửi nhé!');
          setTimeout(open, 700);
        }).catch(function () { showToast('Đang mở Zalo…'); open(); });
      } else { showToast('Đang mở Zalo…'); open(); }
    });
  }
})();
