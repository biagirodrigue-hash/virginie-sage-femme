module.exports = function (eleventyConfig) {
  // Fichiers statiques copiés tels quels dans le site généré
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("admin");

  // Filtre de date pour les articles de blog (ex: "12 mars 2026")
  eleventyConfig.addFilter("dateFr", (value) => {
    const d = new Date(value);
    return d.toLocaleDateString("fr-BE", { year: "numeric", month: "long", day: "numeric" });
  });

  // Collection des articles de blog, triés du plus récent au plus ancien
  eleventyConfig.addCollection("blogPosts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
