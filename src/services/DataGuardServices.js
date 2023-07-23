const apiUrl = "https://23ca-2a00-20-3046-6640-bd82-2314-2b94-6280.ngrok.io/data";

const dataGuardService = {
  get: async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching data:", error);
    }
  },

  post: async (data) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error("Error posting data:", error);
    }
  },
};

export default dataGuardService;
