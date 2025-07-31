let pageSize = 5;
let currentPage = 1;

function formatCurrency(number) {
  return new Intl.NumberFormat('vi-VN').format(number);
}

function renderTable() {
  const body = document.getElementById("dataBody");
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, data.length);
  const visibleData = data.slice(start, end);

  body.innerHTML = visibleData.map(item => `
    <tr>
      <td><input type="checkbox" class="row-checkbox" data-id="${item.id}"></td>
      <td>
        <button class="action-btn btn-view"><i class="fa fa-eye"></i></button>
        <button class="action-btn btn-edit"><i class="fa fa-pen"></i></button>
        <button class="action-btn btn-delete" onclick="deleteRecord(${item.id})"><i class="fa fa-trash"></i></button>
      </td>
      <td>${item.id}</td>
      <td>${item.customer}</td>
      <td>${item.employee}</td>
      <td>${formatCurrency(item.amount)}</td>
      <td>${item.date}</td>
    </tr>
  `).join("");

  renderPagination();
  document.getElementById("resultInfo").textContent = `Hiển thị ${start + 1}–${end} của ${data.length} kết quả`;
  document.getElementById("pageInfo").textContent = `Trang ${currentPage} / ${Math.ceil(data.length / pageSize)}`;
}

function renderPagination() {
  const totalPages = Math.ceil(data.length / pageSize);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderTable();
}

function changePageSize() {
  pageSize = parseInt(document.getElementById("entries").value);
  currentPage = 1;
  renderTable();
}

function toggleSelectAll(source) {
  document.querySelectorAll(".row-checkbox").forEach(cb => cb.checked = source.checked);
}

function deleteSelected() {
  const selectedIds = Array.from(document.querySelectorAll(".row-checkbox:checked"))
    .map(cb => parseInt(cb.getAttribute("data-id")));
  if (selectedIds.length === 0) {
    alert("Vui lòng chọn ít nhất một dòng để xóa.");
    return;
  }
  if (confirm("Bạn có chắc chắn muốn xóa các bản ghi đã chọn không?")) {
    data = data.filter(item => !selectedIds.includes(item.id));
    renderTable();
  }
}

function deleteRecord(id) {
  if (confirm("Xác nhận xóa bản ghi này?")) {
    data = data.filter(item => item.id !== id);
    renderTable();
  }
}

function searchData() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  if (!keyword.trim()) return renderTable();
  const filtered = data.filter(item =>
    item.customer.toLowerCase().includes(keyword) ||
    item.employee.toLowerCase().includes(keyword) ||
    item.id.toString().includes(keyword)
  );
  const body = document.getElementById("dataBody");
  body.innerHTML = filtered.map(item => `
    <tr>
      <td></td>
      <td>
        <button class="action-btn btn-view"><i class="fa fa-eye"></i></button>
        <button class="action-btn btn-edit"><i class="fa fa-pen"></i></button>
        <button class="action-btn btn-delete" onclick="deleteRecord(${item.id})"><i class="fa fa-trash"></i></button>
      </td>
      <td>${item.id}</td>
      <td>${item.customer}</td>
      <td>${item.employee}</td>
      <td>${formatCurrency(item.amount)}</td>
      <td>${item.date}</td>
    </tr>
  `).join("");
  document.getElementById("resultInfo").textContent = `Hiển thị ${filtered.length} kết quả tìm kiếm`;
  document.getElementById("pageInfo").textContent = "";
  document.getElementById("pagination").innerHTML = "";
}

function showAddForm() {
  const modal = new bootstrap.Modal(document.getElementById("addForm"));
  modal.show();
}

document.getElementById("transactionForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const customer = document.getElementById("customerInput").value.trim();
  const employee = document.getElementById("employeeInput").value.trim();
  const amount = parseInt(document.getElementById("amountInput").value.trim());
  const date = document.getElementById("dateInput").value;
  const errorBox = document.getElementById("formError");
  if (!customer || !employee || isNaN(amount) || !date) {
    errorBox.textContent = "Vui lòng điền đầy đủ thông tin.";
    return;
  }
  const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1001;
  const newItem = {
    id: newId,
    customer,
    employee,
    amount,
    date: new Date(date).toLocaleString("vi-VN")
  };
  data.push(newItem);
  this.reset();
  errorBox.textContent = "";
  bootstrap.Modal.getInstance(document.getElementById("addForm")).hide();
  renderTable();
});

document.addEventListener("DOMContentLoaded", renderTable);
