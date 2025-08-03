// Hàm hiển thị form
function showAddForm() {
  const modal = new bootstrap.Modal(document.getElementById("addForm"));
  modal.show();
}

// Dummy function tạm thời để không lỗi
function searchData() {}
function changePageSize() {}
function toggleSelectAll() {}
function deleteSelected() {}

// Gọi render table khi có data
function renderTable() {
  const tbody = $("#dataBody");
  tbody.empty();

  data.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteRow(${item.id})">Xoá</button>
        </td>
        <td>${item.id}</td>
        <td>${item.customer}</td>
        <td>${item.employee}</td>
        <td>${item.amount}</td>
        <td>${item.date}</td>
      </tr>
    `;
    tbody.append(row);
  });
}

// Xóa 1 dòng
function deleteRow(id) {
  const index = data.findIndex(d => d.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    renderTable();
  }
}

// Validate và thêm giao dịch bằng jQuery
$(document).ready(function () {
  $("#transactionForm").submit(function (e) {
    e.preventDefault();

    let isValid = true;
    $(".form-error").text("");

    const customer = $("#customerInput").val().trim();
    const employee = $("#employeeInput").val().trim();
    const amount = $("#amountInput").val().trim();
    const date = $("#dateInput").val().trim();

    if (customer === "") {
      $("#customerInput").next(".form-error").text("Vui lòng nhập tên khách hàng.");
      isValid = false;
    }

    if (employee === "") {
      $("#employeeInput").next(".form-error").text("Vui lòng nhập tên nhân viên.");
      isValid = false;
    }

    if (amount === "") {
      $("#amountInput").next(".form-error").text("Vui lòng nhập số tiền.");
      isValid = false;
    } else if (isNaN(amount) || Number(amount) <= 0) {
      $("#amountInput").next(".form-error").text("Số tiền phải là số dương.");
      isValid = false;
    }

    if (date === "") {
      $("#dateInput").next(".form-error").text("Vui lòng chọn ngày.");
      isValid = false;
    }

    if (isValid) {
      const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
      data.push({
        id: newId,
        customer: customer,
        employee: employee,
        amount: parseFloat(amount),
        date: date,
      });

      $("#transactionForm")[0].reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById("addForm"));
      modal.hide();
      renderTable();
    }
  });

  renderTable(); // Render bảng khi tải trang
});
