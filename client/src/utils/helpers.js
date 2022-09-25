export function formValues(formData) {
  const entries = formData.entries();
  const data = {};

  for (let pair of entries) {
    data[pair[0]] = pair[1];
  }

  return data;
}

export function formatDateForInput(dateString) {
  console.log(dateString);
  const date = new Date(dateString);
  console.log;
  return date
    .toLocaleDateString("en-UK", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
}
