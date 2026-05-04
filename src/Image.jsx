export default function Image() {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5),url('/fruitImages/fruit-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "450px",
          width: "100%",
        }}
        className="row align-content-center justify-content-center text-center text-white"
      >
        <div>
          <h1 className="display-4 fw-bold">Fresh Fruits Deliverd daily </h1>
          <p>.Healthy .Organic .farm Fresh</p>
        </div>
      </div>
    </>
  );
}
