export const fetchJobsByIds = async (ids) => {
  let result = null;

  try {
    const apiURL = `/api/jobs?_per_page=20`;
    const res = await fetch(apiURL);
    const data = await res.json();

    if (!Array.isArray(data)) {
      return null;
    }

    result = data.filter(job => ids.includes(job.id));
  } catch (error) {
    console.error(error);
  }

  return result;
};
