import { useState, useEffect } from "react";
import dataGuardService from "../services/DataGuardServices";

export function useDataGuardCards(props) {
  const { cardDetails, plugins, tabTitle, allData } = props;
  const [result, setResult] = useState([]);

  const handleIconClick = (id) => {
    setResult((prevResult) =>
      prevResult.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === "active" ? "inactive" : "active"; // Toggle the status of icon
          return {
            ...item,
            status: newStatus, // Update the new status
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const processArray = (array, status, plugins) => {
      const newItems = array.map((item) => ({
          id: item,
          status: status,
          name: plugins[item].title,
          description: plugins[item].description,
          tabName: tabTitle
        }));
        return newItems;
    };

    const activeItems = processArray(cardDetails.active, "active", plugins);
    const disabledItems = processArray(cardDetails.disabled, "disabled", plugins);
    const inactiveItems = processArray(cardDetails.inactive, "inactive", plugins);

    const sortArray = ([...activeItems, ...disabledItems, ...inactiveItems]);

    sortArray.sort((a, b) => {
        const getIdNumber = (id) => parseInt(id.replace(/[^\d]/g, '')); // Extract number
        return getIdNumber(a.id) - getIdNumber(b.id);
    });

    setResult(sortArray);

  }, [cardDetails, plugins, tabTitle]);

  useEffect(() => {
    const formNewData = (result) => {
        let activePlugins = result.filter((item) => item.status === "active").map((item) => item.id);
        let inactivePlugins = result.filter((item) => item.status === "inactive").map((item) => item.id);
        let disabledPlugins = result.filter((item) => item.status === "disabled").map((item) => item.id);

        const tabData = {
          title: cardDetails.title,
          icon: "icon-" + cardDetails.title.toLowerCase(),
          active: activePlugins,
          disabled: disabledPlugins,
          inactive: inactivePlugins,
        };
        return tabData;
    };

    allData.tabdata[tabTitle] = formNewData(result);
    const handleSubmit = async () => {
      try {
        const response = await dataGuardService.post(allData);
        console.log("Post request successful");
      } catch (error) {
        console.error("Error in post request:", error);
      }
    };
    handleSubmit();
    
  }, [result]);

  return { result, handleIconClick };
}
