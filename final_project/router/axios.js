let axios= require("axios")

/* axios.get("https://zaru6tha-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/").then((res)=>{
    console.log(res.data)
}).catch((e)=>{

    console.log(e);
})

axios.get("https://zaru6tha-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/1").then((res)=>{
    console.log(res.data)
}).catch((e)=>{

    console.log(e);
})


axios.get("https://zaru6tha-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/Hans-Christian-Andersen").then((res)=>{
    console.log(res.data)
}).catch((e)=>{

    console.log(e.message);
})
 */


axios.get("https://zaru6tha-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/Things-Fall-Apart").then((res)=>{
    console.log(res.data)
}).catch((e)=>{

    console.log(e.message);
})
 
