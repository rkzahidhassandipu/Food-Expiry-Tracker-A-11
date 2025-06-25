const getComments = (foodId) => {
    return fetch(`https://assignment-sooty-psi.vercel.app/comments?foodId=${foodId}`, {
        credentials: "include",
    })
    .then((res) => res.json())
}

export default getComments