import { useContext, useEffect, useState } from "react";
import {AuthContext} from '../../Providers/AuthProvider';
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";


const Bookings = () => {
    const {user} = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>setBookings(data))
    },[url])

    const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                  Swal.fire("Deleted!", "Your service has been deleted.", "success");
                    const remaining = bookings.filter(booking => booking._id !== id)
                    setBookings(remaining)
                }
              });
          }
        });
      };

    //   handle confirm
    const handleConfirm = id =>{
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH', 
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res=> res.json())
        .then(data =>{
            console.log(data);
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Confirmed Successfully!',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                  const remaining = bookings.filter(booking => booking._id !== id)
                  const update = bookings.find(booking => booking._id === id)
                  update.status = 'confirm'
                  const newBooking = [update, ...remaining]
                  setBookings(newBooking)
            }
        })
    }
    return (
        <div>
            <h1>Your Bookings: {bookings.length}</h1>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Image</th>
        <th>Service</th>
        <th>Date</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        bookings.map(booking => <BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleConfirm={handleConfirm}></BookingRow>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Bookings;