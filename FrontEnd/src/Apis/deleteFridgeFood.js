const deleteFridgeFood = async (id) => {
    try {
        const respons = await fetch(`https://assignment-sooty-psi.vercel.app/fridgeFood/${id}`, {
            method: 'DELETE',
            credentials: "include",
        })
        return await respons.json()
    } catch (error) {
        console.log(error)
    }
}

export default deleteFridgeFood;