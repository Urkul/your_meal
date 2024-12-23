// export const getData = url => {
//     const response = fetch(url).then(response => console.log(response));
//     console.log('response: ', response);
// }

export const getData = async (url) => {
    const response = await fetch(url);
    // console.log('response: ', response);

    if (response.ok) {
        return response.json();
    }
}