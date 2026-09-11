const header = document.querySelector(".site-header"),
  toggle = document.querySelector(".menu-toggle"),
  mobile = document.querySelector(".mobile-nav");
const setHeader = () => header.classList.toggle("scrolled", scrollY > 24);
setHeader();
addEventListener("scroll", setHeader, { passive: true });
toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  mobile.classList.toggle("open");
  toggle.setAttribute("aria-expanded", mobile.classList.contains("open"));
});
document.querySelectorAll(".mobile-nav a").forEach((a) =>
  a.addEventListener("click", () => {
    toggle.classList.remove("open");
    mobile.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }),
);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
const dot = document.querySelector(".cursor-dot");
addEventListener("pointermove", (e) => {
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
});
document.getElementById("year").textContent = new Date().getFullYear();

// Substitua WHATSAPP_NUMBER pelo número oficial com DDI + DDD, somente dígitos. Ex.: 5511999999999
const WHATSAPP_NUMBER = "";
const DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Voe Alto Pipas e gostaria de conhecer os produtos disponíveis.";
document.querySelectorAll("[data-whatsapp]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const message = a.dataset.message || DEFAULT_MESSAGE;
    if (!WHATSAPP_NUMBER) {
      window.open(
        "https://www.instagram.com/voealtopipas/",
        "_blank",
        "noopener",
      );
      return;
    }
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener",
    );
  });
});

const modal = document.getElementById("productModal"),
  title = modal.querySelector("h2"),
  cat = modal.querySelector(".modal-category"),
  desc = modal.querySelector(".modal-description"),
  modalWa = modal.querySelector("[data-whatsapp]");
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".feature-card").forEach((card) =>
  card.addEventListener("click", () => {
    title.textContent = card.dataset.product;
    cat.textContent = card.dataset.category.toUpperCase();
    desc.textContent = card.dataset.description;
    modalWa.dataset.message = `Olá! Vim pelo site da Voe Alto Pipas e gostaria de saber mais sobre: ${card.dataset.product}.`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }),
);
modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
const heroLine = document.querySelector(".hero-line");
if (heroLine) {
  addEventListener(
    "scroll",
    () => {
      const y = scrollY;
      heroLine.style.transform = `translateY(${y * 0.08}px)`;
    },
    { passive: true },
  );
}

// Slides independentes das categorias.
// Para trocar as fotos, substitua em assets/images:
// pipas-1/2/3, linhas-1/2/3, rabiolas-1/2/3,
// acessorios-1/2/3 e novidades-1/2/3.
document.querySelectorAll(".category-slider").forEach((slider, index) => {
  const slides = [...slider.querySelectorAll(".category-slide")];
  if (slides.length < 2) return;
  let current = 0;
  let timer;
  const delay = 10000 + index * 370; // cada quadrado muda em um momento diferente
  const next = () => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  };
  const start = () => {
    if (!timer) timer = setInterval(next, delay);
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  start();
  slider.closest(".mock-product")?.addEventListener("mouseenter", stop);
  slider.closest(".mock-product")?.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start(),
  );
});


// Slides dos itens "Em destaque na Voe Alto".
document.querySelectorAll("[data-feature-slider]").forEach((slider,index)=>{
  const slides=[...slider.querySelectorAll(".featured-slide")];
  if(slides.length<2)return;
  let current=0,timer=null;
  const delay=3300+(index*420);
  const next=()=>{
    slides[current].classList.remove("active");
    current=(current+1)%slides.length;
    slides[current].classList.add("active");
  };
  const start=()=>{if(!timer)timer=setInterval(next,delay)};
  const stop=()=>{if(timer)clearInterval(timer);timer=null};
  start();
  const card=slider.closest(".feature-card");
  card?.addEventListener("mouseenter",stop);
  card?.addEventListener("mouseleave",start);
});


/* ===== V5: sliders das cinco categorias ===== */
(() => {
  document.querySelectorAll("[data-category-slider]").forEach((slider,index) => {
    const slides = Array.from(slider.querySelectorAll(".category-slide"));
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;
    const delay = 3000 + (index * 330);

    slides.forEach((slide,i) => slide.classList.toggle("active", i === 0));

    const next = () => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    };

    const start = () => {
      if (!timer) timer = window.setInterval(next, delay);
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    start();

    const card = slider.closest(".mock-product");
    if (card) {
      card.addEventListener("mouseenter", stop);
      card.addEventListener("mouseleave", start);
    }
  });
})();
