const SearchFood = async (search = "") => {
  const res = await fetch(`https://assignment-sooty-psi.vercel.app/fridge?search=${search}`, {
    credentials: 'include', 
  });
  const data = await res.json();
  return data;
};


export default SearchFood;