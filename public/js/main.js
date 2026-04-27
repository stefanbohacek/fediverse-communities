import ready from "./modules/ready.js";
import backToTop from "./modules/backToTop.js";
import {
  updateTimestamp,
  applyFiltersAndSort,
  clearFilters,
} from "./modules/UIHelpers.js";

ready(() => {
  backToTop();
  updateTimestamp();
  applyFiltersAndSort();

  document
    .getElementById("filter-form")
    .addEventListener("change", applyFiltersAndSort);

  document.getElementById("clear-filters").addEventListener("click", () => {
    clearFilters();
    applyFiltersAndSort();
  });

  document.getElementById("main").addEventListener("change", (ev) => {
    if (
      ev.target.classList.contains("annual-reports-select") &&
      ev.target.value
    ) {
      window.open(ev.target.value, "_blank");
      ev.target.value = "";
    }
  });
});
