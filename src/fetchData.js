const container = document.querySelector(".container")
const searchBtn = document.querySelector(".searchBtn")
const input = document.querySelector(".input")
const sectionTwo = document.querySelector("sectionTwo")


export async function fetchData () {

    const inpValue= '';
    const apiKey = "67DXDJ9NRVKSNRHWDVGKB7WQ4";

   try {
    searchBtn.addEventListener ("click", async () => {
    
        inpValue = input.value;

        const response =  await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inpValue}?unitGroup=us&key=${apiKey}&contentType=json`,
            { mode: "cors" },
          );

    })
    
   } catch (error) {
    
   }


}

fetchData()

