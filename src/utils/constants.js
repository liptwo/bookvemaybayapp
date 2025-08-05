let apiRoot = 'http://localhost:8017'

export const flightOptions = [
  { id: 'HAN', label: 'Hà Nội (HAN) - Sân bay Quốc tế Nội Bài' },
  { id: 'SGN', label: 'TP. Hồ Chí Minh (SGN) - Sân bay Quốc tế Tân Sơn Nhất' },
  { id: 'DAD', label: 'Đà Nẵng (DAD) - Sân bay Quốc tế Đà Nẵng' },
  { id: 'CXR', label: 'Nha Trang (CXR) - Sân bay Quốc tế Cam Ranh' },
  { id: 'PQC', label: 'Phú Quốc (PQC) - Sân bay Quốc tế Phú Quốc' },
  { id: 'HUI', label: 'Huế (HUI) - Sân bay Phú Bài' },
  { id: 'VCA', label: 'Cần Thơ (VCA) - Sân bay Quốc tế Cần Thơ' },
  { id: 'DLI', label: 'Đà Lạt (DLI) - Sân bay Liên Khương' },
  { id: 'HPH', label: 'Hải Phòng (HPH) - Sân bay Quốc tế Cát Bi' },
  { id: 'VII', label: 'Vinh (VII) - Sân bay Vinh' }
]
export const TYPESEATS = {
  ECONOMY: 'Phổ Thông',
  ECONOMY_PREMIUM: 'Phổ Thông Đặc Biệt',
  BUSINESS: 'Thương Gia',
  FIRT: 'Hạng Nhất'
}

export const STATUS = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending'
}

export const API_ROOT = apiRoot