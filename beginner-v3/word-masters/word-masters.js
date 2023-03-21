 const getWord = async () =>{
    const wordAPI = "https://words.dev-apis.com/word-of-the-day"
    const promise = await fetch(wordAPI)
    const processedResponse = await promise.json();
    return processedResponse.
}
const word =  getWord().then((response) => {console.log(response)}