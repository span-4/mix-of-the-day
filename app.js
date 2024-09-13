const flavors = {
  "almond ice cream": "images/almond ice cream.webp",
  apple: "images/apple.webp",
  baical: "images/baical.webp",
  banana: "images/banana.webp",
  "banana souffle": "images/banana souffle.webp",
  barberry: "images/barberry.webp",
  basil: "images/basil.webp",
  "berry halls": "images/berry halls.webp",
  "berry lemonade": "images/berry lemonade.webp",
  "berry sorbet": "images/berry sorbet.webp",
  "black currant": "images/black currant.webp",
  "black tea": "images/black tea.webp",
  blueberry: "images/blueberry.webp",
  "blueberry yogurt": "images/blueberry yogurt.webp",
  brownie: "images/brownie.webp",
  "bubble gum": "images/bubble gum.webp",
  caramel: "images/caramel.webp",
  "caribbean rum": "images/caribbean rum.webp",
  champagne: "images/champagne.png",
  cheesecake: "images/cheesecake.webp",
  cherry: "images/cherry.webp",
  "chupa graper": "images/chupa graper.webp",
  cinnabon: "images/cinnabon.webp",
  "citrus mix": "images/citrus mix.webp",
  coconut: "images/coconut.webp",
  cola: "images/cola.webp",
  "corn sticks": "images/corn sticks.webp",
  cranberry: "images/cranberry.webp",
  "creme brulee": "images/creme brulee.webp",
  "cucumber gin": "images/cucumber gin.webp",
  "cucumber lemonade": "images/cucumber lemonade.webp",
  currant: "images/currant.webp",
  elderberry: "images/elderberry.webp",
  feijoa: "images/feijoa.webp",
  fruitella: "images/fruitella.webp",
  grape: "images/grape.webp",
  grapefruit: "images/grapefruit.webp",
  "green apple": "images/green apple.webp",
  "green tea": "images/green tea.webp",
  "grenade juice": "images/grenade juice.webp",
  guava: "images/guava.webp",
  haribo: "images/haribo.webp",
  honey: "images/honey.webp",
  "honey halls": "images/honey halls.webp",
  ice: "images/ice.webp",
  "ice cream": "images/ice cream.webp",
  "irish cream": "images/irish cream.webp",
  jackfruit: "images/jackfruit.webp",
  kiwi: "images/kiwi.webp",
  lemon: "images/lemon.webp",
  "lemon lime": "images/lemon lime.webp",
  "lemon sweets": "images/lemon sweets.webp",
  lime: "images/lime.webp",
  lychee: "images/lychee.webp",
  mango: "images/mango.webp",
  "mango passion fruit": "images/mango passion fruit.webp",
  melon: "images/melon.webp",
  "melon halls": "images/melon halls.webp",
  "milk rice": "images/milk rice.webp",
  mirinda: "images/mirinda.webp",
  muesli: "images/muesli.webp",
  needles: "images/needles.webp",
  nutella: "images/nutella.webp",
  orange: "images/orange.webp",
  papaya: "images/papaya.webp",
  "passion fruit": "images/passion fruit.webp",
  peach: "images/peach.webp",
  "peach yogurt": "images/peach yogurt.webp",
  pear: "images/pear.webp",
  "pear lemonade": "images/pear lemonade.webp",
  "pina colada": "images/pina colada.webp",
  pineapple: "images/pineapple.webp",
  "pineapple rings": "images/pineapple rings.png",
  "pineapple yogurt": "images/pineapple_yogurt.png",
  pistachio: "images/pistachio.webp",
  "pistachio ice cream": "images/pistachio ice cream.webp",
  pomegranate: "images/pomegranate.png",
  rapsberry: "images/rapsberry.webp",
  "red orange": "images/red orange.webp",
  sandal: "images/sandal.webp",
  strawberry: "images/strawberry.webp",
  "strawberry coconut": "images/strawberry coconut.webp",
  "strawberry jam": "images/strawberry jam.webp",
  "strawberry kiwi": "images/strawberry kiwi.webp",
  tarhun: "images/tarhun.webp",
  "tic tac": "images/tic tac.webp",
  "tropic juice": "images/tropic juice.webp",
  watermelon: "images/watermelon.webp",
  "wild berries": "images/wild berries.webp",
  zephyr: "images/zephyr.webp",
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Не удалось загрузить изображение: ${src}`));
    img.src = src;
  });
}

// Список активных вкусов
let activeFlavors = Object.keys(flavors);

// Обработчик события для генерации рандомного микса
document.getElementById("randomMixBtn").addEventListener("click", () => {
  const randomFlavors = getRandomFlavors(3);
  document.getElementById("flavor1").value = randomFlavors[0];
  document.getElementById("flavor2").value = randomFlavors[1];
  document.getElementById("flavor3").value = randomFlavors[2];
});

// Получаем случайные вкусы из активных
function getRandomFlavors(count) {
  const shuffled = [...activeFlavors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Функция для генерации иконок вкусов с ползунками
function generateFlavorIcons() {
  const flavorIconsContainer = document.querySelector(".flavor-icons");
  flavorIconsContainer.innerHTML = ""; // Очищаем контейнер перед добавлением

  Object.keys(flavors).forEach((flavor) => {
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("flavor-icon");

    const img = document.createElement("img");
    img.src = flavors[flavor];
    img.alt = flavor;
    img.addEventListener("click", () => setFlavorInput(flavor));

    const label = document.createElement("label");
    label.innerText = flavor;

    const toggle = document.createElement("div");
    toggle.classList.add("toggle");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.addEventListener("change", () =>
      toggleFlavor(flavor, checkbox.checked)
    );

    toggle.appendChild(checkbox);

    iconContainer.appendChild(img);
    iconContainer.appendChild(label);
    iconContainer.appendChild(toggle);

    flavorIconsContainer.appendChild(iconContainer);
  });
}

// Установка выбранного вкуса в один из инпутов
function setFlavorInput(flavor) {
  for (let i = 1; i <= 3; i++) {
    const input = document.getElementById(`flavor${i}`);
    if (!input.value) {
      input.value = flavor;
      break;
    }
  }
}

// Включение или выключение вкуса
function toggleFlavor(flavor, isChecked) {
  if (isChecked) {
    if (!activeFlavors.includes(flavor)) {
      activeFlavors.push(flavor);
    }
  } else {
    activeFlavors = activeFlavors.filter((f) => f !== flavor);
  }
}

// Генерация иконок при загрузке страницы
generateFlavorIcons();

async function generateMix() {
  const canvas = document.getElementById("mixCanvas");
  const ctx = canvas.getContext("2d");

  // Очистка canvas перед рисованием
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Загрузить статичный фон
  try {
    const background = await loadImage("images/background.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  } catch (error) {
    console.error(error);
    alert("Ошибка при загрузке фона!");
    return;
  }

  // Текстовые элементы: KISLOROD, lounge bar и Mix of the day
  ctx.font = "bold 80px Arial"; // Жирный шрифт для KISLOROD
  ctx.fillStyle = "yellow";
  ctx.textAlign = "center"; // Центрирование текста
  ctx.fillText("KISLOROD", canvas.width / 2, 200); // Центрирование KISLOROD
  ctx.fillStyle = "white";
  ctx.font = "normal 60px Georgia";
  ctx.fillText("lounge bar", canvas.width / 2, 270); // Центрирование lounge bar

  ctx.font = "italic 90px Georgia"; // Увеличение шрифта для Mix of the day
  ctx.fillText("Mix of the day", canvas.width / 2, 380); // Центрирование Mix of the day

  ctx.font = "italic 90px Georgia"; // Шрифт для цифры 35
  ctx.textAlign = "right"; // Выровняем по правому краю
  const gelX = canvas.width - 55; // Отступ 55px от правого края

  const yPosition = 1700; // Одинаковая координата по Y для обоих элементов

  // Высчитываем ширину текста "35" и "GEL", чтобы корректно разместить
  const text35Width = ctx.measureText("35").width;
  ctx.fillStyle = "yellow";

  // Рисуем 35 и GEL с учетом отступа
  ctx.fillText("35", gelX - text35Width - 102, yPosition); // Координата Y равная для обоих
  ctx.fillText("GEL", gelX, 1715); // GEL по той же Y координате

  // Текст "*offer valid until 8 pm*" и "*предложение действует до 20:00*"
  ctx.font = "normal 30px Georgia";
  ctx.fillStyle = "white"; // Белый цвет для нижних строк
  ctx.textAlign = "right"; // Выровняем текст по правому краю
  ctx.fillText("*offer valid until 8 pm*", canvas.width - 55, 1775); // Отступ 55px от правого края
  ctx.fillText("*предложение действует до 20:00*", canvas.width - 55, 1825); // Отступ 55px от правого края

  const positions = [
    { y: 435 }, // Обновим позиции для изображений
    { y: 860 },
    { y: 1310 },
  ];

  const images = [];

  // Собираем названия вкусов из инпутов
  for (let i = 1; i <= 3; i++) {
    const flavorInput = document
      .getElementById(`flavor${i}`)
      .value.toLowerCase();
    const imageSrc = flavors[flavorInput];

    if (imageSrc) {
      try {
        const image = await loadImage(imageSrc);
        images.push({ image, flavorInput });
      } catch (error) {
        console.error(error);
        alert(`Ошибка при загрузке изображения для вкуса "${flavorInput}"!`);
        return;
      }
    } else {
      alert(`Изображение для вкуса "${flavorInput}" не найдено!`);
      return;
    }
  }

  const maxAllowedWidth = 484; // Максимальная ширина для изображения

  // Найдем максимальную ширину среди всех изображений
  const maxImageWidth = Math.max(
    ...images.map(({ image }) =>
      Math.min(maxAllowedWidth, (350 * image.width) / image.height)
    )
  );

  images.forEach(({ image, flavorInput }, index) => {
    const aspectRatio = image.width / image.height;
    let height = 350; // Фиксированная высота
    let width = height * aspectRatio; // Пропорциональная ширина

    // Если ширина изображения больше максимальной, уменьшаем его пропорционально
    if (width > maxAllowedWidth) {
      width = maxAllowedWidth;
      height = width / aspectRatio; // Корректируем высоту согласно новому соотношению
    }

    // Рассчитаем смещение для центрирования относительно максимальной ширины
    const offsetX = (maxImageWidth - width) / 2;
    const imageY = positions[index].y + (350 - height) / 2; // Центрирование изображения по оси Y

    // Рисуем изображение на канвасе
    ctx.drawImage(image, 50 + offsetX, imageY, width, height);

    // Центрирование текста относительно высоты изображения
    const textY = imageY + height / 2; // Вертикальный центр изображения

    const flavorWords = flavorInput.split(" ");

    ctx.font = "normal 55px Georgia";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    // Проверка количества слов и выравнивание
    if (flavorWords.length === 3) {
      ctx.fillText(`${flavorWords[0]} ${flavorWords[1]}`, 630, textY - 30); // Первое и второе слово на одной строке
      ctx.fillText(flavorWords[2], 630, textY + 30); // Третье слово на второй строке
    } else if (flavorWords.length === 2) {
      // Если два слова, пишем в две строки
      ctx.fillText(flavorWords[0], 630, textY - 15); // Первое слово
      ctx.fillText(flavorWords[1], 630, textY + 45); // Второе слово
    } else {
      // Если одно слово, пишем его по центру относительно изображения
      ctx.fillText(flavorInput, 630, textY + 15);
    }
  });
}
// Добавляем функционал для кнопки скачивания
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "mix_of_the_day.png"; // Имя файла для скачивания
  link.click();
});

document.getElementById("generateBtn").addEventListener("click", generateMix);
document.getElementById("downloadBtn").addEventListener("click", () => {
  const canvas = document.getElementById("mixCanvas");

  // Создаем изображение с полным разрешением 1080x1920
  const dataURL = canvas.toDataURL("image/png", 1.0); // 1.0 означает максимальное качество

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "mix_of_the_day.png"; // Имя файла для скачивания
  link.click();
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY; // Текущая вертикальная прокрутка
  const blurStart = 180; // Начало размытия при прокрутке
  const blurEnd = 500; // Полное размытие при прокрутке

  // const bodyBefore = document.querySelector("body::before");

  if (scrollY > blurStart) {
    let blurValue =
      Math.min((scrollY - blurStart) / (blurEnd - blurStart), 1) * 5; // Максимальное размытие 10px
    document.body.style.setProperty("--blur-value", `${blurValue}px`);
  } else {
    document.body.style.setProperty("--blur-value", `0px`);
  }
});

// Обработчик для кнопки очистки
document.getElementById("clearInputsBtn").addEventListener("click", () => {
  // Очищаем все три поля ввода
  document.getElementById("flavor1").value = "";
  document.getElementById("flavor2").value = "";
  document.getElementById("flavor3").value = "";
});
