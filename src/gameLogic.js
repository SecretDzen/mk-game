export const createElem = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
      if (Array.isArray(className)) {
          className.forEach(item => {
              $tag.classList.add(item);
          })
      } else {
          $tag.classList.add(className);
      }

  }

  return $tag;
}

export function dateGenerator() {
  const date = new Date();
  const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
  return `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;
}

export function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

export function createReloadButton() {
  const $reloadWrap = createElem('div', 'reloadWrap');
  const $reloadButton = createElem('button', 'button');
  $reloadButton.innerText = 'Reload';
  $reloadButton.addEventListener('click', () => window.location.pathname = '');
  $reloadWrap.appendChild($reloadButton);
  return $reloadWrap;
}