import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

import { API_ROOT } from '~/utils/constants'

export const fecthBookingSeatAPI = createAsyncThunk(
  'notifications/fecthBookingSeatAPI',
  async () => {
    const respone = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/bookings/my-bookings`
    )
    // axios trả về qua data
    return respone.data
  }
)

export const updateBookingSeatAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ bookingId, seat }) => {
    const respone = await authorizedAxiosInstance.put(
      `${API_ROOT}/v1/bookings/${bookingId}`,
      { seat }
    )
    return respone.data
  }
)

export const activeNotiSlice = createSlice({
  name: 'noti',
  initialState: {
    currentNoti: []
  },

  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNoti= null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNoti = action.payload
    },
    addNotifications: (state, action) => {
      const imcomingInvi = action.payload
      state.currentNoti.unshift(imcomingInvi)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fecthBookingSeatAPI.fulfilled, (state, action) => {
      const incommingNoti= action.payload
      state.currentNoti = Array.isArray(incommingNoti)
        ? incommingNoti.reverse()
        : []
    })

    builder.addCase(updateBookingSeatAPI.fulfilled, (state, action) => {
      const incommingNoti = action.payload

      const getInvitation = state.currentNoti.find(
        (i) => i._id === incommingNoti._id
      )
      getInvitation.boardInvitation = incommingNoti.boardInvitation
    })
  }
})

export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotifications
} = activeNotiSlice.actions
// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useselector() để lấy dữ liệu từ trong
// kho redux store ra sử dụng
export const selectCurrentNoti = (state) => {
  return state.noti.currentNoti
}
// dù tên là activeBoardSlice nhưng phải lấy reducer mới đúng !!! lưu ý
export const activeNotiReducer = activeNotiSlice.reducer