const mockSeats = [
  // Hàng 1
  { number: 'A1', status: 'available' },
  { number: 'B1', status: 'available' },
  { number: 'C1', status: 'booked' },
  { number: 'D1', status: 'available' },

  // Hàng 2
  { number: 'A2', status: 'booked' },
  { number: 'B2', status: 'booked' },
  { number: 'C2', status: 'available' },
  { number: 'D2', status: 'available' },

  // Hàng 3
  { number: 'A3', status: 'available' },
  { number: 'B3', status: 'available' },
  { number: 'C3', status: 'available' },
  { number: 'D3', status: 'available' },

  // Hàng 4
  { number: 'A4', status: 'available' },
  { number: 'B4', status: 'booked' },
  { number: 'C4', status: 'available' },
  { number: 'D4', status: 'available' },

  // Hàng 5
  { number: 'A5', status: 'available' },
  { number: 'B5', status: 'available' },
  { number: 'C5', status: 'available' },
  { number: 'D5', status: 'booked' },

  // Hàng 6
  { number: 'A6', status: 'available' },
  { number: 'B6', status: 'available' },
  { number: 'C6', status: 'available' },
  { number: 'D6', status: 'available' },

  // Hàng 7
  { number: 'A7', status: 'booked' },
  { number: 'B7', status: 'available' },
  { number: 'C7', status: 'available' },
  { number: 'D7', status: 'available' },

  // Hàng 8
  { number: 'A8', status: 'available' },
  { number: 'B8', status: 'available' },
  { number: 'C8', status: 'booked' },
  { number: 'D8', status: 'booked' },

  // Hàng 9
  { number: 'A9', status: 'available' },
  { number: 'B9', status: 'available' },
  { number: 'C9', status: 'available' },
  { number: 'D9', status: 'available' },

  // Hàng 10
  { number: 'A10', status: 'booked' },
  { number: 'B10', status: 'available' },
  { number: 'C10', status: 'available' },
  { number: 'D10', status: 'available' }
]

// Cách sử dụng trong component React:
// import SeatMap from './SeatMap';
//
// function BookingPage() {
//   const tripId = "trip-123"; // ID chuyến đi ví dụ
//   return (
//     <div>
//       <h1>Chọn ghế cho chuyến đi {tripId}</h1>
//       <SeatMap tripId={tripId} initialSeats={mockSeats} />
//     </div>
//   );
// }

export { mockSeats }