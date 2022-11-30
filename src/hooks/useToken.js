import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState(null);
    const [adminLoader, setAdminLoader] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        setAdminLoader(true)
                        console.log(data.accessToken)
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(data.accessToken)
                        setAdminLoader(false)
                    }
                })
        }
    }, [email])
    return [token, adminLoader];
}
export default useToken;