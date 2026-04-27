export default {
  getLinkActiveState(itemUrl, pageUrl) {
    let response = "";

    if (itemUrl === pageUrl) {
      response =
        'class="nav-link link-secondary active fw-bold" aria-current="page"';
    } else {
      response = 'class="nav-link link-secondary"';
    }

    return response;
  },
  sortArrayOfObjectsByKey(array, key) {
    return array.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  },
  getMatomoJSSnippet() {
    return process.env.MATOMO_JS ? process.env.MATOMO_JS : "";
  },
};
