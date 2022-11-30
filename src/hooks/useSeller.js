import { useEffect, useState } from "react"

const useSeller = email => {
    const [seller, setSeller] = useState(false)
    const [adminLoader, setAdminLoader] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://resell-bike-guru.vercel.app/user/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    setSeller(data.isAdmin)
                    console.log(seller)
                })
                .finally(() => { setAdminLoader(false) })
        }
    }, [email, seller])
    return [seller, adminLoader];
}

export default useSeller;