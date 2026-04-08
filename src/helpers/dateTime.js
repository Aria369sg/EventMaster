const pad = (value) => String(value).padStart(2, "0");

export const formatEventDateTime = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    const normalizedValue = value.trim();
    const directMatch = normalizedValue.match(
      /(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})/,
    );

    if (directMatch) {
      const [, year, month, day, hour, minute] = directMatch;
      return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    const dateOnlyMatch = normalizedValue.match(/(\d{4})-(\d{2})-(\d{2})/);

    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch;
      return `${year}-${month}-${day}`;
    }
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(value);
  }

  const year = parsedDate.getFullYear();
  const month = pad(parsedDate.getMonth() + 1);
  const day = pad(parsedDate.getDate());
  const hour = pad(parsedDate.getHours());
  const minute = pad(parsedDate.getMinutes());

  return `${year}-${month}-${day} ${hour}:${minute}`;
};
