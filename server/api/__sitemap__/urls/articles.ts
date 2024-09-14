export default defineSitemapEventHandler(async (event) => {
  const prisma = usePrisma(event);
  const articles = await prisma.article.findMany();
  return articles.map((article) =>
    asSitemapUrl({
      loc: `/articles/${article.id}`,
      lastmod: article.updatedAt,
      images: article.image ? [{ loc: article.image }] : undefined,
      _sitemap: "articles",
    }),
  );
});
