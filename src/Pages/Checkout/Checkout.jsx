import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Checkout = () => {
    const {user} = useContext(AuthContext)
  const service = useLoaderData();
  const { title, _id , price} = service;
  const handleBookService = event=>{
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const order={
        customerName: name,
        email,
        date,
        service: _id,
        price: price
    }
    console.log(order);
  }
  return (
          <div>
            <h2 className="text-center text-3xl">Book service</h2>
            <div className="card-body">
            <form onSubmit={handleBookService}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                defaultValue={user?.displayName}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={user?.email}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
                type="text"
                placeholder="Price"
                defaultValue={'$'+price}
                className="input input-bordered"
              />
            </div>
            </div>
            <div className="form-control mt-6">
              <input className="btn bg-[#FF3811] border-none" type="submit" value="Order Confirm" />
            </div>
            </form>
          </div>
          </div>
  );
};

export default Checkout;
