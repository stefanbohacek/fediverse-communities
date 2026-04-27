import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

export default (eleventyConfig) => {
  eleventyConfig.addFilter("formatNumber", (num) =>
    new Intl.NumberFormat("en-US").format(num)
  );

  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  eleventyConfig.setChokidarConfig({
    usePolling: true,
    interval: 500,
  });

  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
};
