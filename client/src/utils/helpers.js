export function formValues(formData) {
  const entries = formData.entries();
  const data = {};

  for (let pair of entries) {
    data[pair[0]] = pair[1];
  }

  return data;
}
