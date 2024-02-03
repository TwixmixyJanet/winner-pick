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
              src="https://private-user-images.githubusercontent.com/117195025/302066037-5c680cd8-7a3a-467d-ac3b-b036323cae40.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDcwMDA5MTQsIm5iZiI6MTcwNzAwMDYxNCwicGF0aCI6Ii8xMTcxOTUwMjUvMzAyMDY2MDM3LTVjNjgwY2Q4LTdhM2EtNDY3ZC1hYzNiLWIwMzYzMjNjYWU0MC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMjAzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDIwM1QyMjUwMTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05ZGIwNmRmOWFlZjkyYzFiMjAwMjc1OTE4OWY0YTY1OTRhZDJmZmVhMzJjZmU5YjE4MDljOGJiMzViMjZmZDAwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.se3Oi0lnusvNg_WdjoVZ-Xy68xYwOHsK7D5ZJbk1Mro"
              className="d-block w-100"
              alt="Winner Pick"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://private-user-images.githubusercontent.com/117195025/302066036-09f02585-7b6d-4230-a669-268445cde6c9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDcwMDA5MTQsIm5iZiI6MTcwNzAwMDYxNCwicGF0aCI6Ii8xMTcxOTUwMjUvMzAyMDY2MDM2LTA5ZjAyNTg1LTdiNmQtNDIzMC1hNjY5LTI2ODQ0NWNkZTZjOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMjAzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDIwM1QyMjUwMTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lNWM4MWM2ZjNlNjAxODVhMjJhOWJiN2RiNTAyNWY5NTQ0NGZjNGQ0OTcwYjAyMzkwYmIxNmQ5OTc1NWQ1ZTdjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.kmO0x1N_jdGr9sCKdUnD8aawZls7v6GVAqDmlLYwTUU"
              className="d-block w-100"
              alt="Raccoon Survivor"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

          <div className="carousel-item">
            <img
              src="https://private-user-images.githubusercontent.com/117195025/302066034-ddc7bb42-dd70-4bef-bf5b-79c384adcbe9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDcwMDA5MTQsIm5iZiI6MTcwNzAwMDYxNCwicGF0aCI6Ii8xMTcxOTUwMjUvMzAyMDY2MDM0LWRkYzdiYjQyLWRkNzAtNGJlZi1iZjViLTc5YzM4NGFkY2JlOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMjAzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDIwM1QyMjUwMTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04ZjAwOTUyZDNiZjg4MTQ0MGE4YWYwZjg4MzFmM2I0ODFhMDZlNDU5NjMxM2FmNzMzZDQ4ZWEzOTZlZWJlOTBiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.tsPxo7HsTrjH5m_CjJUoB60jmT1RjQOkFq3qGmaOfpw"
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
