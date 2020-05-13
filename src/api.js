export const fetchStories = async (page = 1) =>
  (
    await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`,
    )
  ).json();
