// export const getData = url => {
//     const response = fetch(url).then(response => console.log(response));
//     console.log('response: ', response);
// }

// export const getData = url => {
//     const response = new Promise((resolve, reject) => {
//         const xml = new XMLHttpRequest();
//         xml.open('get', url);

//         xml.addEventListener('load', () => {
//             // console.log(xml.status);
//             if (xml.status === 200) {
//                 resolve(xml.response);
//             } else {
//                 reject(new Error(xml.statusText));
//             }
//         });
        
//         xml.send();
//     });
//     return response;
//     // console.log('response: ', response);

// }

export const getData = async (url) => {
    const response = await fetch(url);
    // console.log('response: ', response);

    if (response.ok) {
        return response.json();
    }
}