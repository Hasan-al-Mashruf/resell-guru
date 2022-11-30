import { useEffect, useState } from "react"

const useAdmin = email => {
    const [admin, setAdmin] = useState(false)
    const [adminLoader, setAdminLoader] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/user/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.isAdmin)
                })
                .finally(() => { setAdminLoader(false) })
        }
    }, [email])
    return [admin, adminLoader];
}

export default useAdmin;