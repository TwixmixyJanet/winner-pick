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
        <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel" data-mdb-carousel-init>
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
              <img src="https://plus.unsplash.com/premium_photo-1661574892961-b25a2cac224a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Cliff Above a Stormy Sea" />
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>

            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1606787842788-32ecd7260629?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Sunset Over the City" />
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>


            <div className="carousel-item">
              <img src="https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Canyon at Nigh" />
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>

          </div>

          <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
  );
};

export default Carousels;
