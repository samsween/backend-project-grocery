let formatToJson = async (xmlDir, tagNames) => {
  return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4) {
        xmlDoc = xmlHttp.responseXML;
        let obj = {};
        for (let i = 0; i < tagNames.length; i++) {
          obj[tagNames[i]] = Array.from(
            xmlDoc.getElementsByTagName(tagNames[i])
          ).map((x) => x.childNodes[0].nodeValue);
        }
        let headerNames = Object.keys(obj);
        let data = [];
        for (const [key, value] of Object.entries(obj)) {
          value.forEach((v, i) => {
            if (data[i] === undefined) {
              data[i] = {};
            }
            data[i][key] = v;
          });
        }
        resolve({
          headerNames,
          data,
        });
      }
    };
    xmlHttp.open("GET", xmlDir, true);
    xmlHttp.send(null);
  });
};

let createHTML = (data, headerNames, sort = "asc") => {
  let headers = `
    <thead>
        <tr class="text-left border border-gray-300 bg-slate-950 text-white text-xs md:text-base">
            ${headerNames
              .map(
                (h) =>
                  `<td class="sort" data-id="${h}" data-sort="${sort}">${h}</td>`
              )
              .join("")}
        </tr>
    </thead>
    `;
  let tableData = "<tbody class='text-xs md:text-base'>";
  data.forEach((d, i) => {
    let row =
      i % 2 === 0
        ? "<tr class='border border-gray-300 bg-slate-200'>"
        : "<tr class='border border-gray-300 bg-slate-300'>";
    for (const [key, value] of Object.entries(d)) {
      row += `<td>${value}</td>`;
    }
    row += "</tr>";
    tableData += row;
  });
  tableData += "</tbody>";
  return headers + tableData;
};

const addSortEvents = () => {
  document.querySelectorAll(".sort").forEach((s) => {
    s.addEventListener("click", (e) => {
      let data = JSON.parse(localStorage.getItem("data"));
      let headerNames = JSON.parse(localStorage.getItem("headerNames"));
      let sortType = e.target.getAttribute("data-sort");
      let sortId = e.target.getAttribute("data-id");

      let sortedData;
      if (isNaN(data[0][sortId])) {
        if (sortType === "asc") {
          sortedData = data.sort((a, b) => a[sortId].localeCompare(b[sortId]));
        } else {
          sortedData = data.sort(
            (a, b) =>
              (sortedData = data.sort((a, b) =>
                b[sortId].localeCompare(a[sortId])
              ))
          );
        }
      } else {
        if (sortType === "asc") {
          sortedData = data.sort((a, b) => a[sortId] - b[sortId]);
        } else {
          sortedData = data.sort((a, b) => b[sortId] - a[sortId]);
        }
      }

      document.getElementById("table").innerHTML = createHTML(
        sortedData,
        headerNames,
        sortType === "asc" ? "desc" : "asc"
      );
      addSortEvents();
    });
  });
};

const showXml = async (xmlDir, tagNames) => {
  let { headerNames, data } = await formatToJson(xmlDir, tagNames);
  document.getElementById("table").innerHTML = createHTML(data, headerNames);
  addSortEvents();
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("headerNames", JSON.stringify(headerNames));
};

document.getElementById("search").addEventListener("input", (e) => {
  let data = JSON.parse(localStorage.getItem("data"));
  let headerNames = JSON.parse(localStorage.getItem("headerNames"));
  let filteredData = data.filter((d) => {
    for (const [key, value] of Object.entries(d)) {
      if (
        value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });
  document.getElementById("table").innerHTML = createHTML(
    filteredData,
    headerNames
  );
  addSortEvents();
});

window.onload = () => {
  showXml("Product/product.xml", [
    "ProductCode",
    "ProductName",
    "ProductQuantity",
    "ProductPrice",
  ]);
};
document.getElementById("select").addEventListener("change", (e) => {
  switch (e.target.value) {
    case "Products":
      showXml("Product/product.xml", [
        "ProductCode",
        "ProductName",
        "ProductQuantity",
        "ProductPrice",
      ]);
      break;
    case "Employees":
      showXml("Employee/employee.xml", ["Username", "Password"]);
      break;
    case "Orders":
      showXml("Order/order.xml", [
        "OrderNo",
        "OrderDate",
        "CustNo",
        "ProductCode",
        "ProductName",
        "ProductQuantity",
        "ProductPrice",
        "Total",
      ]);
      break;
    default:
      showXml("Product/product.xml", [
        "ProductCode",
        "ProductName",
        "ProductQuantity",
        "ProductPrice",
      ]);
      break;
  }
});
