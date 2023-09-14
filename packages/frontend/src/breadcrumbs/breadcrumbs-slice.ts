import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Breadcrumb from 'model/Breadcrumb'

interface BreadcrumbsState {
  breadcrumbs: Breadcrumb[]
}

const initialState: BreadcrumbsState = {
  breadcrumbs: [],
}

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    addBreadcrumbs(state: { breadcrumbs: any[] }, { payload }: PayloadAction<Breadcrumb[]>) {
      state.breadcrumbs = [...state.breadcrumbs, ...payload].sort(
        (b1, b2) => b1.location.length - b2.location.length,
      )
    },
    removeBreadcrumbs(state: { breadcrumbs: any[] }, { payload }: PayloadAction<Breadcrumb[]>) {
      const locations = payload.map((b: { location: any }) => b.location)
      state.breadcrumbs = state.breadcrumbs.filter(
        (breadcrumb: { location: any }) => !locations.includes(breadcrumb.location),
      )
    },
  },
})

export const { addBreadcrumbs, removeBreadcrumbs } = breadcrumbsSlice.actions

export default breadcrumbsSlice.reducer
