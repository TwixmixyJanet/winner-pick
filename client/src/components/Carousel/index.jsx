import { useEffect } from "react";

// Initialization for ES Users
import { Carousel, initMDB } from "mdb-ui-kit";

initMDB({ Carousel });

// ... (imports)

const Carousels = () => {
  useEffect(() => {
    initMDB({ Carousel });
  });

  return (
    <div className="caraBox pt-5 mb-1">
      {/* <!-- Carousel wrapper --> */}
      <div
        id="carouselBasicExample"
        className="carousel slide carousel-fade"
        data-mdb-ride="carousel"
        data-mdb-carousel-init
      >
        {/* <!-- Indicators --> */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner rounded-5 shadow-3-strong">
          <div className="carousel-item">
            <img
              src="https://paramountshop.com/cdn/shop/files/survivor-mobile-updated.png?v=1695833270"
              className="d-block w-100"
              alt="Winner Pick"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://parade.com/.image/ar_1.91%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_1200/MjAzMDQ3ODg4NzI3NTgxODc4/the-bachelor-joey-graziadei.jpg"
              className="d-block w-100"
              alt="Raccoon Survivor"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

          <div className="carousel-item">
            <img
              src="https://www.etonline.com/sites/default/files/images/2017-04/1280_rachel_lindsay_bachelorette_twitter.jpg"
              className="d-block w-100"
              alt="Bachelor Squirrel"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousels;
