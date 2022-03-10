export const handleTableRoll = (name, matches) => (roll) => {
  const radios = document.getElementsByName(name);
  let key = matches[roll];

  radios[key].dispatchEvent(new MouseEvent("click"));
};

export const handleFieldRoll = (name) => (roll) => {
  const handleFieldRoll = document.getElementsByName(name);

  handleFieldRoll[0].value = roll;
};

export const getFormData = (formEl) => {
  const formData = new FormData(formEl);

  const data = {};

  for (let field of formData) {
    const [key, value] = field;
    data[key] = value;
  }

  return data;
};

export const findForm = (path) => {
  for (let i = 0; i < path.length; i++) {
    if (path[i].matches("form")) return path[i];
  }

  return null;
};
