import * as moment from "moment";

export const filterDateRange = value => {
  if (value === 1) {
    return moment().subtract(6, "d").format("YYYY-MM-DD");
  }
  if (value === 2) {
    return moment().subtract(29, "d").startOf("month").format("YYYY-MM-DD");
  }
  if (value === 3) {
    return moment().subtract(5, "months").startOf("month").format("YYYY-MM-DD");
  }
  if (value === 4) {
    return moment().subtract(11, "months").startOf("month").format("YYYY-MM-DD");
  }
  return moment().format("YYYY-MM-DD");
};
