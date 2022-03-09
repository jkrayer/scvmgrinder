export const handleTableRoll = (name, matches) => (roll) => {
  const radios = document.getElementsByName(name);
  let key = matches[roll];

  radios[key].dispatchEvent(new MouseEvent("click"));
};

export const handleFieldRoll = (name) => (roll) => {
  const handleFieldRoll = document.getElementsByName(name);

  handleFieldRoll[0].value = roll;
};
