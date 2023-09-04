import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: '39222353-2d5e0c48aaf2951727d31d2d4',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  const response = await axios.get(`?${params}`);
  return response.data;
}
