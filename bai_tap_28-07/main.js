let danhSach = [
  {
    maSV: "2251061749",
    hoTen: "Nguyễn Quang Dũng",
    email: "dungdung282004@gmail.com",
    gioiTinh: "Nam",
    ngaySinh: "2004-02-08"
  },
  {
    maSV: "2251061760",
    hoTen: "Nguyễn Trí Duy",
    email: "triduyng@gmail.com",
    gioiTinh: "Nam",
    ngaySinh: "2004-01-25"
  },
  {
    maSV: "2251061761",
    hoTen: "Nguyễn Khánh Duy",
    email: "duykongur@gmail.com",
    gioiTinh: "Nam",
    ngaySinh: "2004-12-21"
  },
  {
    maSV: "2251061768",
    hoTen: "Trần Đăng Hiếu",
    email: "trdhieu@gmail.com",
    gioiTinh: "Nam",
    ngaySinh: "2004-12-19"
  },
  {
    maSV: "2251061779",
    hoTen: "Nguyễn Khắc Trung",
    email: "lucidtide@gmail.com",
    gioiTinh: "Nam",
    ngaySinh: "2004-03-15"
  }
];

document.getElementById("formSinhVien").addEventListener("submit", function (e) {
  e.preventDefault();
  themSinhVien();
});

function themSinhVien() {
  const maSV = document.getElementById("maSV").value.trim();
  const hoTen = document.getElementById("hoTen").value.trim();
  const email = document.getElementById("email").value.trim();
  const gioiTinh = document.getElementById("gioiTinh").value;
  const ngaySinh = document.getElementById("ngaySinh").value;

  if (!maSV || !hoTen || !email || !gioiTinh || !ngaySinh) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  const index = danhSach.findIndex(sv => sv.maSV === maSV);
  const sinhVien = { maSV, hoTen, email, gioiTinh, ngaySinh };

  if (index >= 0) {
    danhSach[index] = sinhVien;
    thongBao("Cập nhật sinh viên thành công!");
  } else {
    danhSach.push(sinhVien);
    thongBao("Thêm sinh viên thành công!");
  }

  renderDanhSach();
  resetForm();
}

function renderDanhSach() {
  const tbody = document.querySelector("#danhSachSinhVien tbody");
  tbody.innerHTML = "";

  danhSach.forEach((sv, index) => {
    const row = document.createElement("tr");
    const ngaySinhFormatted = dinhDangNgaySinh(sv.ngaySinh);

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${sv.maSV}</td>
      <td>${sv.hoTen}</td>
      <td>${sv.email}</td>
      <td>${sv.gioiTinh}</td>
      <td>${ngaySinhFormatted}</td>
      <td><a href="#" onclick="suaSinhVien('${sv.maSV}')">Sửa</a>|<a href="#" onclick="xoaSinhVien('${sv.maSV}')">Xóa</a></td>
    `;

    tbody.appendChild(row);
  });
}

function suaSinhVien(maSV) {
  const sv = danhSach.find(sv => sv.maSV === maSV);
  if (!sv) return;

  document.getElementById("maSV").value = sv.maSV;
  document.getElementById("hoTen").value = sv.hoTen;
  document.getElementById("email").value = sv.email;
  document.getElementById("gioiTinh").value = sv.gioiTinh;
  document.getElementById("ngaySinh").value = sv.ngaySinh;
}

function xoaSinhVien(maSV) {
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    danhSach = danhSach.filter(sv => sv.maSV !== maSV);
    renderDanhSach();
    thongBao("Đã xóa sinh viên!");
  }
}

function resetForm() {
  document.getElementById("formSinhVien").reset();
}

function thongBao(msg) {
  const tb = document.getElementById("thongBao");
  tb.innerText = msg;
  setTimeout(() => tb.innerText = "", 2000);
}

function dinhDangNgaySinh(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

// Khởi tạo hiển thị
renderDanhSach();
