export const LocalStorage = {
  user: 'userShopeeSuper',
  accessToken: 'accessTokenShopeeSuper',
  refreshToken: 'refreshTokenShopeeSuper',
  profile: 'profileShopeeSuper'
}

export const config = {
  baseUrl: 'https://api-ecom.duthanhduoc.com/',
  maxSizeUploadAvatar: 1048576
}

export const purchaseStatus = {
  inCart: -1, // Sản phẩm đang trong giỏ hàng
  all: 0, // Tất cả sản phẩm
  waitForConfirmation: 1, // Sản phẩm đang đợi xác nhận từ chủ shop
  waitForGetting: 2, // Sản phẩm đang được lấy hàng
  inProgress: 3, // Sản phẩm đang vận chuyển
  delivered: 4, // Sản phẩm đã được giao
  cancelled: 5 // Sản phẩm đã bị hủy
} as const

export const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const

export const sortBy = {
  createAt: 'createdAt',
  view: 'view',
  price: 'price',
  sold: 'sold'
} as const

export const order = {
  asc: 'asc',
  desc: 'desc'
} as const