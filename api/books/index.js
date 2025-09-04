import { baseAxios } from "..";

export const getAllBooks = async (filters = {}) => {
  const params = new URLSearchParams();
  
  // Add search
  if (filters.keywords) {
    params.append("search", filters.keywords);
  }

  // Add category slugs
  if (filters.category && filters.category.length > 0) {
    params.append("category_ids", filters.category.join(","));
  }

  // Add genre slugs
  if (filters.genre && filters.genre.length > 0) {
    params.append("genre_ids", filters.genre.join(","));
  }

  // Add format/available_on
  if (filters.season) {
    params.append("available_on", filters.season);
  }

  // Add price range (assuming NPR prices)
  if (filters.minCost !== undefined) {
    params.append("digitalbook_price_min", filters.minCost);
    params.append("paperback_price_min", filters.minCost);
    params.append("audiobook_price_min", filters.minCost);
  }

  if (filters.maxCost !== undefined) {
    params.append("digitalbook_price_max", filters.maxCost);
    params.append("paperback_price_max", filters.maxCost);
    params.append("audiobook_price_max", filters.maxCost);
  }

  const queryString = params.toString();
  const url = `/books/${queryString ? `?${queryString}` : ""}`;

  const { data } = await baseAxios.get(url);
  return data.mainData; // Adjust if your API returns { mainData: ... }
};


export const getBookBySlug = async(slug)=>{
    const { data } = await baseAxios.get(`/books/slug/${slug}/`);
    return data.mainData;
}

export const getAllCategories = async()=>{
    const { data } = await baseAxios.get('/category/')
    return data.mainData;
}

export const getAllGenre = async()=>{
    const { data } = await baseAxios.get('/genre/')
    return data.mainData;
}