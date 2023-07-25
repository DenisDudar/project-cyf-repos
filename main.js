import repos from "/data/repos.js";

export default function buildPage() {
    // Creating table
    let root = document.querySelector("div#root");
    createTable(root, 4, repos.length);
    function createTable(parent, cols, rows) {
        let table = document.createElement("table");
        let headerRow = document.createElement("tr");
        let headers = ["Name", "Description", "Link", "Updated At"];

        for (let h = 0; h < cols; h++) {
            let th = document.createElement("th");
            th.innerText = headers[h];
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);
        
        for (let i = 0; i < rows; i++) {
            let tr = document.createElement("tr");
            let nameCell = document.createElement("td");
            nameCell.innerText = repos[i].name;
            tr.appendChild(nameCell);

            let descriprionCell = document.createElement("td");
            descriprionCell.innerText = repos[i].description || "No description available";
            tr.appendChild(descriprionCell);

            let linkCell = document.createElement("td");
            let link = document.createElement("a");
            link.innerText = repos[i].html_url;
            link.target = "_blank";
            linkCell.appendChild(link);
            tr.appendChild(linkCell);

            let updatedCell = document.createElement("td");
            updatedCell.innerText = repos[i].updated_at;
            tr.appendChild(updatedCell);
            table.appendChild(tr);
        }
        root.appendChild(table);

    }

    // Creating container
    let container = document.createElement("div");
    container.setAttribute("id", "container");
    root.appendChild(container);

    let sortDropdown = document.createElement("select");
    let sortName = document.createElement("option");
    sortName.value = "name";
    sortName.textContent = "Name";
    sortName.selected = "selected";
    sortDropdown.appendChild(sortName);

    let sortDescription = document.createElement("option");
    sortDescription.value = "description";
    sortDescription.textContent = "Description";
    sortDropdown.appendChild(sortDescription);

    let sortUpdate = document.createElement("option");
    sortUpdate.value = "update";
    sortUpdate.textContent = "Updated At";
    sortDropdown.appendChild(sortUpdate);
    container.appendChild(sortDropdown);
}



function sort(event) {

}

function search(event) {
    
}

function setPagination() {
    
}

export {buildPage, sort, search, setPagination};