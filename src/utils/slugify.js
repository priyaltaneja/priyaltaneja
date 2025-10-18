// Utility function to convert article titles to URL-friendly slugs
export const slugify = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
};

// Utility function to find article by slug
export const findArticleBySlug = (articles, slug) => {
  return articles.findIndex(article => slugify(article.title) === slug);
};
