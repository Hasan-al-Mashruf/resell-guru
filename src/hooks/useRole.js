import { useEffect, useState } from "react"

const useRole = (email) => {
    const [role, setRole] = useState()
    const [adminLoader, setAdminLoader] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/myUsers/role/${email}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data.user)
                })
                .finally(() => { setAdminLoader(false) })
        }
    }, [email])
    return [role, adminLoader];

}
export default useRole;