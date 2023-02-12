export const getLanguages = (str) => {
  let result = str.split(/(?<!\-)(?=[A-Z]|\))/);
  result = result.map((item) => {
    if (item.trim().toLowerCase() === "native") {
      item = `<span style="background-color:#DAF2DC;padding: 2px; border-radius: 5px; color: #017912">${item.trim()}</span>`;
    }
    if (
      item.trim().toLowerCase() === "advanced" ||
      item.trim().toLowerCase() === "upper-intermediate" ||
      item.trim().toLowerCase() === "pre-intermediate" ||
      item.trim().toLowerCase() === "beginner" ||
      item.trim().toLowerCase() === "intermediate" ||
      item.trim().toLowerCase() === "proficient"
    ) {
      item = `<span style="background-color:#C3F5FA;padding: 2px; border-radius: 5px; color: #016887">${item.trim()}</span>`;
    }
    return item;
  });
  const languageSet = [];
  for (let i = 0; i < result.length; i++) {
    if (i === 0) {
      languageSet.push(result[i]);
    } else {
      if (result[i].includes("Chinese (")) {
        languageSet.push(
          result[i] + result[i + 1] + result[i + 2] + " " + result[i + 3]
        );
        i = i + 3;
      } else {
        languageSet.push(result[i] + " " + result[i + 1]);
        i = i + 1;
      }
    }
  }
  return languageSet;
};

export const languageProficiencyValues = [
  {
    value: "Native",
    label: "Native",
  },
  {
    value: "Proficient",
    label: "Proficient",
  },
  {
    value: "Advanced",
    label: "Advanced",
  },
  {
    value: "Upper-Intermediate",
    label: "Upper-Intermediate",
  },
  {
    value: "Intermediate",
    label: "Intermediate",
  },
  {
    value: "Pre-Intermediate",
    label: "Pre-Intermediate",
  },
  {
    value: "Beginner",
    label: "Beginner",
  },
];
