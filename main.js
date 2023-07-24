import repos from "/data/repos.js";

export default function buildPage() {
    let root = document.querySelector("div#root");
    //root.innerText = "Hello!";
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
        parent.appendChild(table);

    }
}

function sort(event) {
    // implement sort functionality
}

function search(event) {
    // implement search functionality
}

function setPagination() {
    // implement pagination functionality
}

export {buildPage, sort, search, setPagination};