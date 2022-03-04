export const newProvisions = (daysoffood = 1) => ({
  type: "provisions",
  waterskin: true,
  daysofwater: 4,
  daysoffood: 2,
});

export const provisionTitle = (provision) => {
  let prov = "";

  if (provision.waterskin) prov = `A waterskin`;
  if (provision.daysoffood > 0)
    prov = `${prov.length ? " and " : ""} ${
      provision.daysoffood
    } days of food.`;

  return prov;
};
