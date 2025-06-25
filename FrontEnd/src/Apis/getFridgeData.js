const getFridgeData = () => {
  return fetch("https://assignment-sooty-psi.vercel.app/fridge", {
    credentials: 'include',
  })
    .then((res) => res.json());
};

export default getFridgeData;