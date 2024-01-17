export const fetchJobs = async (query = "usa", job_titles: any) => {
  let apiUrl = "https://jsearch.p.rapidapi.com/search";

  if (query) {
    apiUrl += "?query=" + query;
  }

  if (job_titles) {
    apiUrl += "?job_titles=" + job_titles;
  }
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${process.env.NEXT_RAPID_API_KEY}`,
        "X-RapidAPI-Host": `${process.env.NEXT_RAPID_API_HOST}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed while fetching from API");
    } else {
      const { data } = await response.json();

      return data;
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
