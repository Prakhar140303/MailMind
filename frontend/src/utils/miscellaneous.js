export const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d || "";
    }
  };