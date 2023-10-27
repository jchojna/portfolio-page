export const removeTransitionsOnEvent = (e, element, classname) => {
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
