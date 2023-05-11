

const ServiceCard = ({service}) => {
    const {title, img, price}=service
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[rgba(68, 68, 68, 1)] font-bold text-2xl">{title}</h2>
        <p className="text-[#FF3811] font-semibold text-xl">Price: ${price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
