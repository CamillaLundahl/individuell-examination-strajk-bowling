import { http, HttpResponse } from 'msw';

const BOOKING_API_URL = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking';

export const handlers = [
  http.post(BOOKING_API_URL, async ({ request }) => {
    const data = await request.json();

    const pricePerPerson = 120;
    const pricePerLane = 100;
    const calculatedTotalAmount = (parseInt(data.people) * pricePerPerson) + (parseInt(data.lanes) * pricePerLane);

    return HttpResponse.json(
      {
        bookingDetails: {
          when: data.when,
          time: data.time,
          people: parseInt(data.people),
          lanes: parseInt(data.lanes),
          shoes: data.shoes,
          bookingId: 'MOCK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          price: calculatedTotalAmount,
        },
        message: 'Bokningen är bekräftad!',
      },
      { status: 201 }
    );
  }),

];
