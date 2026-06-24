const timeElement = document.querySelector("#time");
const dateElement = document.querySelector("#date");
const labelElement = document.querySelector("#label");
const languageButtons = document.querySelectorAll("[data-language]");

const messages = {
  ja: {
    documentLanguage: "ja",
    label: "現在時刻",
    locale: "ja-JP",
  },
  en: {
    documentLanguage: "en",
    label: "Current time",
    locale: "en-US",
  },
  zh: {
    documentLanguage: "zh-Hans",
    label: "当前时间",
    locale: "zh-CN",
  },
};

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem("clock-language");

  if (savedLanguage && messages[savedLanguage]) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language.toLowerCase();

  if (browserLanguage.startsWith("ja")) {
    return "ja";
  }

  if (browserLanguage.startsWith("zh")) {
    return "zh";
  }

  return "en";
}

let currentLanguage = getInitialLanguage();

function updateClock() {
  const now = new Date();
  const { locale } = messages[currentLanguage];

  timeElement.textContent = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  dateElement.textContent = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(now);

  timeElement.dateTime = now.toISOString();
}

function applyLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("clock-language", language);
  document.documentElement.lang = messages[language].documentLanguage;
  labelElement.textContent = messages[language].label;

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateClock();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.language);
  });
});

applyLanguage(currentLanguage);
setInterval(updateClock, 1000);
