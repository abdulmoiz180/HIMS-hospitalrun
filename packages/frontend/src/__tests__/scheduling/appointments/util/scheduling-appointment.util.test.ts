import Appointment from 'model/Appointment'
import { getAppointmentLabel } from '../../../../scheduling/appointments/util/scheduling-appointment.util'

describe('scheduling appointment util', () => {
  describe('getAppointmentLabel', () => {
    it('should return the locale string representation of the start time and end time', () => {
      // const options = {
      //   year: 'numeric',
      //   month: '2-digit',
      //   day: '2-digit',
      //   hour: '2-digit',
      //   minute: '2-digit',
      // }
      const options: any = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };
      
      const appointment = {
        id: '123',
        startDateTime: '2020-03-07T18:15:00.000Z',
        endDateTime: '2020-03-07T20:15:00.000Z',
      } as Appointment

      const startDateLabel = new Date(appointment.startDateTime).toLocaleString([], options)  
       const endDateLabel = new Date(appointment.endDateTime).toLocaleString([], options)
  
     expect(getAppointmentLabel(appointment)).toEqual(`${startDateLabel} - ${endDateLabel}`)
    })

    it('should return the appointment id when start time is not defined', () => {
      const appointment = {
        id: '123',
        startDateTime: '2020-03-07T18:15:00.000Z',
      } as Appointment

      expect(getAppointmentLabel(appointment)).toEqual('123')
    })

    it('should return the appointment id when end time is not defined', () => {
      const appointment = {
        id: '123',
        endDateTime: '2020-03-07T20:15:00.000Z',
      } as Appointment

      expect(getAppointmentLabel(appointment)).toEqual('123')
    })

    it('should return the appointment id when start time and end time are not defined', () => {
      const appointment = {
        id: '123',
      } as Appointment

      expect(getAppointmentLabel(appointment)).toEqual('123')
    })
  })
})



// No overload matches this call.
//   Overload 1 of 3, '(locales?: LocalesArgument, options?: DateTimeFormatOptions | undefined): string', gave the following error.
//     Argument of type '{ year: string; month: string; day: string; hour: string; minute: string; }' is not assignable to parameter of type 'DateTimeFormatOptions'.
//       Types of property 'year' are incompatible.
//         Type 'string' is not assignable to type '"numeric" | "2-digit" | undefined'.
//   Overload 2 of 3, '(locales?: string | string[] | undefined, options?: DateTimeFormatOptions | undefined): string', gave the following error.
//     Argument of type '{ year: string; month: string; day: string; hour: string; minute: string; }' is not assignable to parameter of type 'DateTimeFormatOptions'.