// script.js
let currentPage = 1;
const rowsPerPage = 5;

function renderTable() {
  const tbody = $("#employeeTableBody");
  tbody.empty();

  const keyword = $("#searchInput").val().toLowerCase();
  const filtered = employees.filter(emp =>
    `${emp.hoDem} ${emp.ten} ${emp.diaChi}`.toLowerCase().includes(keyword)
  );

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = filtered.slice(start, end);

  pageData.forEach((emp, index) => {
    tbody.append(`
      <tr>
        <td><input type="checkbox" class="selectRow" data-index="${start + index}"></td>
        <td>${emp.hoDem}</td>
        <td>${emp.ten}</td>
        <td>${emp.diaChi}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteEmployee(${start + index})">🗑️ Xóa</button>
        </td>
      </tr>
    `);
  });

  renderPagination(filtered.length);
}

function renderPagination(totalRows) {
  const pageCount = Math.ceil(totalRows / rowsPerPage);
  const pagination = $("#pagination");
  pagination.empty();

  for (let i = 1; i <= pageCount; i++) {
    pagination.append(`
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
      </li>
    `);
  }
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

function deleteEmployee(index) {
  if (confirm("Bạn có chắc muốn xóa nhân viên này?")) {
    employees.splice(index, 1);
    renderTable();
  }
}

$(document).ready(function () {
  renderTable();

  $("#addEmployeeForm").submit(function (e) {
    e.preventDefault();
    const hoDem = $("#hoDem").val().trim();
    const ten = $("#ten").val().trim();
    const diaChi = $("#diaChi").val().trim();

    if (!hoDem || !ten || !diaChi) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    employees.push({ hoDem, ten, diaChi });
    $("#addModal").modal("hide");
    this.reset();
    renderTable();
  });

  $("#searchInput").on("input", function () {
    currentPage = 1;
    renderTable();
  });

  $("#selectAll").change(function () {
    $(".selectRow").prop("checked", this.checked);
  });

  $(document).on("change", ".selectRow", function () {
    const allChecked = $(".selectRow").length === $(".selectRow:checked").length;
    $("#selectAll").prop("checked", allChecked);
  });

  $("#deleteSelected").click(function () {
    const selectedIndexes = $(".selectRow:checked")
      .map(function () {
        return parseInt($(this).data("index"));
      })
      .get();

    if (selectedIndexes.length === 0) {
      alert("Chưa chọn nhân viên nào!");
      return;
    }

    if (confirm("Bạn có chắc muốn xóa các nhân viên đã chọn?")) {
      employees = employees.filter((_, idx) => !selectedIndexes.includes(idx));
      renderTable();
    }
  });
});
