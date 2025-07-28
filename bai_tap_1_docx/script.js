document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");
  const form = document.querySelector(".modal-content");
  const nameInput = form.querySelector('input[type="text"]:nth-child(1)');
  const emailInput = form.querySelector('input[type="email"]');
  const addressInput = form.querySelectorAll('input[type="text"]')[1];
  const phoneInput = form.querySelectorAll('input[type="text"]')[2];

  // Hàm render dữ liệu từ data.js
  function renderEmployees(data) {
    tableBody.innerHTML = ""; // Clear table
    data.forEach((emp, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox"></td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.address}</td>
        <td>${emp.phone}</td>
        <td>
          <i class="fas fa-pencil-alt text-warning me-2" role="button"></i>
          <i class="fas fa-trash-alt text-danger" role="button"></i>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Kiểm tra dữ liệu đầu vào
  function isValidData(name, email, address, phone) {
    if (!name || !email || !address || !phone) {
      alert("Vui lòng điền đầy đủ tất cả các trường!");
      return false;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ! Phải bắt đầu bằng số 0 và có đúng 10 chữ số.");
      return false;
    }

    return true;
  }

  // Xử lý khi submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const address = addressInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!isValidData(name, email, address, phone)) {
      return;
    }

    // Thêm vào bảng
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="checkbox"></td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${address}</td>
      <td>${phone}</td>
      <td>
        <i class="fas fa-pencil-alt text-warning me-2" role="button"></i>
        <i class="fas fa-trash-alt text-danger" role="button"></i>
      </td>
    `;
    tableBody.appendChild(newRow);

    // Reset form
    form.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
    modal.hide();

    alert("Thêm nhân viên thành công!");
  });

  // Render dữ liệu giả lập ban đầu
  renderEmployees(employeeData);
});
