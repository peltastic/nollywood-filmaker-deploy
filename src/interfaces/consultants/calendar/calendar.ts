export interface IGetCalendarAppointmentResponse {
  _id: string;
  date: string;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  booktime: string;
  nameofservice: string;
  orderId: string;
  chat_title: string;
  user: {
    fname: string
    lname: string
    email: string
    profilepics: string
  }
}
