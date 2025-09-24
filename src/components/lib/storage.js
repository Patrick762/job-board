const KEY = "job-favorites";

const addFavorite = (id) => {
  const favorites = getFavorites();

  favorites.push(id);

  localStorage.setItem(KEY, JSON.stringify(favorites));
};

const removeFavorite = (id) => {
  const favorites = getFavorites();

  const index = favorites.indexOf(id);

  if (index === -1) {
    // ID not in localstorage
    return;
  }

  const filtered = favorites.filter(item => item !== id);

  localStorage.setItem(KEY, JSON.stringify(filtered));
};

export const toggleFavorite = (id) => {
  if (isFavorite(id)) {
    removeFavorite(id);
    return false;
  }

  addFavorite(id);
  return true;
};

export const isFavorite = (id) => {
  const favorites = getFavorites();

  const index = favorites.indexOf(id);

  return index !== -1;
};

export const getFavorites = () => {
  const favoritesString = localStorage.getItem(KEY);

  if (!favoritesString) {
    return [];
  }

  const favorites = JSON.parse(favoritesString);

  if (!Array.isArray(favorites)) {
    console.error("Invalid data in localstorage!");
    return [];
  }

  return favorites;
};
