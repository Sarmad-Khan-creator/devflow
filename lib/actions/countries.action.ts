export const countries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      throw new Error("An error occurred while fetching countries from API");
    } else {
      const countries = await response.json();

      const orderedCountries = countries.sort((a: any, b: any) => {
        if (a.name.common < b.name.common) {
          return -1;
        }

        if (a.name.common > a.name.common) {
          return 1;
        }

        return 0;
      });

      return orderedCountries;
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
