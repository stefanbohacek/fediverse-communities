const el = {
  updated: document.getElementById("communities-updated"),
  sortBy: document.getElementById("sort-by"),
  size: document.getElementById("community-size"),
  age: document.getElementById("community-age"),
  annualReport: document.getElementById("annual-report"),
  clearBtn: document.getElementById("clear-filters"),
  container: document.getElementById("communities-grid"),
  cards: [...document.querySelectorAll("[data-members]")],
};

export const updateTimestamp = () => {
  const diff = Date.now() - new Date(el.updated.dataset.fetchedAt).getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let ago;

  if (days > 0) {
    ago = `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (hours > 0) {
    ago = `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (minutes > 0) {
    ago = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else {
    ago = "just now";
  }

  el.updated.querySelector("span").replaceWith(ago);
};

export const sortCommunities = (sortBy, cards, container) => {
  const sorted = [...cards].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.dataset.name.localeCompare(b.dataset.name);
      case "size-desc":
        return parseInt(b.dataset.members) - parseInt(a.dataset.members);
      case "size-asc":
        return parseInt(a.dataset.members) - parseInt(b.dataset.members);
      case "age-asc":
        return parseInt(a.dataset.year) - parseInt(b.dataset.year);
      case "age-desc":
        return parseInt(b.dataset.year) - parseInt(a.dataset.year);
    }
  });
  sorted.forEach((card) => container.appendChild(card));
};

export const getFilterState = () => ({
  sortBy: el.sortBy.value,
  size: el.size.value,
  age: el.age.value,
  annualReport: el.annualReport.checked,
});

export const hasActiveFilters = () =>
  el.sortBy.value !== "alphabetical" ||
  el.size.value !== "" ||
  el.age.value !== "" ||
  el.annualReport.checked;

export const clearFilters = () => {
  el.sortBy.value = "alphabetical";
  el.size.value = "";
  el.age.value = "";
  el.annualReport.checked = false;
};

export const applyFiltersAndSort = () => {
  const state = getFilterState();
  sortCommunities(state.sortBy, el.cards, el.container);
  applyFilters(state, el.cards);
  el.clearBtn.disabled = !hasActiveFilters();
};

export const applyFilters = (state, cards) => {
  const currentYear = new Date().getFullYear();

  cards.forEach((card) => {
    const members = parseInt(card.dataset.members);
    const year = parseInt(card.dataset.year);
    const reportYear = parseInt(card.dataset.annualReportYear);

    const sizeMatch =
      !state.size ||
      (state.size === "small" && members < 1000) ||
      (state.size === "medium" && members >= 1000 && members < 10000) ||
      (state.size === "large" && members >= 10000);

    const ageMatch =
      !state.age ||
      (state.age === "new" && year >= currentYear - 3) ||
      (state.age === "established" && year < currentYear - 3);

    const reportMatch = !state.annualReport || reportYear >= currentYear - 1;

    const isVisible = sizeMatch && ageMatch && reportMatch;
    card.classList.toggle("d-none", !isVisible);
  });
};
