export const handleTableRoll = (name) => (roll) => {
  const radios = document.getElementsByName(name);
  let key = name === "equipment-one" ? roll - 2 : roll - 1;
  key = key < 0 ? 0 : key;

  radios[key].dispatchEvent(new MouseEvent("click"));
};
