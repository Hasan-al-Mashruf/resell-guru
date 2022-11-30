import { useEffect, useState } from "react"

const useBuyer = email => {
    const [buyer, setBuyer] = useState(false)
    const [adminLoader, setAdminLoader] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://resell-bike-guru.vercel.app/user/buyer/${email}`)
                .then(res => res.json())
                .then(data => {
                    setBuyer(data.isAdmin)
                })
                .finally(() => { setAdminLoader(false) })
        }
    }, [email])
    return [buyer, adminLoader];
}

export default useBuyer;