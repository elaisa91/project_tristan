export async function refreshResult() {
    let response = await fetch("http://localhost:8080/v1/imgResults/null");
    let images = await response.json();
    return images;
}