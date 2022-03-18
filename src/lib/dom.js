import { setMenuState } from "../stores/Settings";

export const openMenu = () => {
  document.body.style.overflow = "hidden";
  setMenuState(true);
};

export const closeMenu = () => {
  document.body.style.overflow = "auto";
  setMenuState(false);
};
