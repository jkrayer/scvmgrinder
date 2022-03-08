export const handleTableRoll = (name) => (roll) => {
  const radios = document.getElementsByName(name);
  let key = name === "equipment-one" ? roll - 2 : roll - 1;
  key = key < 0 ? 0 : key;

  radios[key].dispatchEvent(new MouseEvent("click"));
};

export const handleFieldRoll = (name) => (roll) => {
  const handleFieldRoll = document.getElementsByName(name);

  handleFieldRoll[0].value = roll;
};
