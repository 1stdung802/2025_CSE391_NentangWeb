$(document).ready(function () {
  const $tbody = $("tbody");

  // 1. Hàm hiển thị danh sách nhân viên
  function renderEmployees(data) {
    $tbody.empty(); // Xóa các dòng cũ
    data.forEach((employee, index) => {
      const row = `
        <tr>
          <td><input type="checkbox"></td>
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.address}</td>
          <td>${employee.phone}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      `;
      $tbody.append(row);
    });
  }

  // 2. Gọi hiển thị dữ liệu mẫu từ file data.js
  renderEmployees(employeeData);

  // 3. Xử lý khi submit form thêm nhân viên
  $("form").submit(function (e) {
    e.preventDefault();

    // Lấy giá trị từ form
    const name = $("input[type='text']").eq(0).val().trim();
    const email = $("input[type='email']").val().trim();
    const address = $("input[type='text']").eq(1).val().trim();
    const phone = $("input[type='text']").eq(2).val().trim();

    // Kiểm tra hợp lệ
    if (!name || !email || !address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Kiểm tra định dạng email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ.");
      return;
    }

    // Kiểm tra định dạng số điện thoại (10 chữ số)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại phải gồm 10 chữ số.");
      return;
    }

    // Tạo đối tượng nhân viên mới
    const newEmployee = { name, email, address, phone };

    // Thêm vào mảng và cập nhật bảng
    employeeData.push(newEmployee);
    renderEmployees(employeeData);

    // Reset form
    this.reset();

    // Đóng modal
    $("#addEmployeeModal").modal("hide");
  });
});
