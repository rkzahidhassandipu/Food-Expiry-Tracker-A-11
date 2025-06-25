const getEmailData = async (email,accessToken) => {
  const res = await fetch(`https://assignment-sooty-psi.vercel.app/fridgeEmail?email=${email}`, {
    credentials: 'include',
    headers: {
        authorization: `Bearer ${accessToken}`
    }
  });
  const data = await res.json();
  return data;
};


export default getEmailData