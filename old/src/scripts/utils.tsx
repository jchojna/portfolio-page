export const removeTransitionsOnEvent = (
  e: Event,
  element: HTMLElement,
  classname: string
) => {
  if (e) {
    !element.classList.contains(`${classname}--noTransition`)
      ? element.classList.add(`${classname}--noTransition`)
      : false;
  } else {
    element.classList.contains(`${classname}--noTransition`)
      ? element.classList.remove(`${classname}--noTransition`)
      : false;
  }
};
