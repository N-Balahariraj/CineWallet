import Cookies from 'js-cookie'

export default async function refreshToken(){

    const refreshToken = Cookies.get('REFRESH_TOKEN')
    const globalHost = 'https://cinewallet.onrender.com/refresh'
    const localHost = 'http://localhost:4500/refresh'

    try {
        const res = await fetch(globalHost,{
            headers:{
                'content-type':'Application/json',
                'authorization':`JWT ${refreshToken}`
            }
        })
        if(!res.ok) throw new Error("Token refresh unsuccessfull")
        const data = await res.json()
        console.log(data.message)
    } 
    
    catch (error) {
        console.log("err : ",error)
    }
}

setInterval(()=>refreshToken(),13*60*1000)