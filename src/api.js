export const fetchStories = async () =>
  (
    await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story')
  ).json();
