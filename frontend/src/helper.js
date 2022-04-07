export async function filter_images(value) {
    let response = await fetch("http://localhost:8080/v1/imgResults/"+ value);
    let images = await response.json();
    return images;
}

export async function filter_subcategories(evalue) {
    let response = await fetch("http://localhost:8080/v1/subcategories/"+ evalue)
    let subcat_options = await response.json();
    return subcat_options;
}

export async function all_categories() {
    let response = await fetch("http://localhost:8080/v1/categories")
    let cat_options = await response.json();
    return cat_options;
}
