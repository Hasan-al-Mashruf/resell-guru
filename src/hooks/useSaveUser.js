import { useEffect, useState } from "react"

const useSaveUser = (myUser) => {
    const [saveUser, setSaveUser] = useState(null)
    const [adminLoader, setAdminLoader] = useState(true)
    useEffect(() => {
        if (myUser) {
            fetch('https://resell-bike-guru-mashrufhasan.vercel.app/myUsers', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(myUser),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    if (data.acknowledged) {
                        setSaveUser(myUser)
                    }
                })
                .finally(() => { setAdminLoader(false) })
        }

    }, [myUser])
    return [saveUser, adminLoader];

}
export default useSaveUser;