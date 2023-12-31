import '../../../__mocks__/matchMediaMock'
import React from 'react'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Patient from 'model/Patient'
import Diagnosis from 'model/Diagnosis'
import Permissions from 'model/Permissions'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import Diagnoses from 'patients/diagnoses/Diagnoses'
import * as components from '@hospitalrun/components/src'
import { act } from 'react-dom/test-utils'
import PatientRepository from 'clients/db/PatientRepository'

const expectedPatient = {
  id: '123',
  diagnoses: [
    { id: '123', name: 'diagnosis1', diagnosisDate: new Date().toISOString() } as Diagnosis,
  ],
} as Patient

const mockStore = configureMockStore([thunk])
const history = createMemoryHistory()

let user: any
let store: any

const setup = (patient = expectedPatient, permissions = [Permissions.AddDiagnosis]) => {
  user = { permissions }
  store = mockStore({ patient, user })
  const wrapper = mount(
    <Router history={history}>
      <Provider store={store}>
        <Diagnoses patient={patient} />
      </Provider>
    </Router>,
  )

  return wrapper
}
describe('Diagnoses', () => {
  describe('add diagnoses button', () => {
    beforeEach(() => {
      jest.resetAllMocks()
      jest.spyOn(PatientRepository, 'saveOrUpdate')
    })

    it('should render a add diagnoses button', () => {
      const wrapper = setup()

      const addDiagnosisButton = wrapper.find(components.Button)
      expect(addDiagnosisButton).toHaveLength(1)
      expect(addDiagnosisButton.text().trim()).toEqual('patient.diagnoses.new')
    })

    it('should not render a diagnoses button if the user does not have permissions', () => {
      const wrapper = setup(expectedPatient, [])

      const addDiagnosisButton = wrapper.find(components.Button)
      expect(addDiagnosisButton).toHaveLength(0)
    })

    it('should open the Add Diagnosis Modal', () => {
      const wrapper = setup()

      act(() => {
        const onClick = wrapper.find(components.Button).prop('onClick') as any
        onClick()
      })
      wrapper.update()

      expect(wrapper.find(components.Modal).prop('show')).toBeTruthy()
    })
  })

  describe('diagnoses list', () => {
    it('should list the patients diagnoses', () => {
      const diagnoses = expectedPatient.diagnoses as Diagnosis[]
      const wrapper = setup()

      const list = wrapper.find(components.List)
      const listItems = wrapper.find(components.ListItem)

      expect(list).toHaveLength(1)
      expect(listItems).toHaveLength(diagnoses.length)
    })

    it('should render a warning message if the patient does not have any diagnoses', () => {
      const wrapper = setup({ ...expectedPatient, diagnoses: [] })

      const alert = wrapper.find(components.Alert)

      expect(alert).toHaveLength(1)
      expect(alert.prop('title')).toEqual('patient.diagnoses.warning.noDiagnoses')
      expect(alert.prop('message')).toEqual('patient.diagnoses.addDiagnosisAbove')
    })
  })
})
