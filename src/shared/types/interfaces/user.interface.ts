export interface User {
  MaKH?: number;
  HoTen?: string;
  NgaySinh?: string;
  CMND?: string;
  DiaChi?: string;
  MaTK?: string;
  NgayLap?: string;
  SoDu?: number;
  TrangThai?: string;
  LoaiTK?: string;
  email?: string;
  mat_khau?: string;
}

export interface LoginPayload {
  email: string;
  mat_khau: string;
}
