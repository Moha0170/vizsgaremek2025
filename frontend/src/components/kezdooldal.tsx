import React from 'react';

const IndexPage = () => {
  return (
    <div className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        <title>Vizsgaremek2025</title>
        <link rel="shortcut icon" type="image/icon" href="assets/logo/favicon.png" />
        <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="assets/css/linearicons.css" />
        <link rel="stylesheet" href="assets/css/animate.css" />
        <link rel="stylesheet" href="assets/css/flaticon.css" />
        <link rel="stylesheet" href="assets/css/slick.css" />
        <link rel="stylesheet" href="assets/css/slick-theme.css" />
        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="assets/css/bootsnav.css" />	
        <link rel="stylesheet" href="assets/css/style.css" />
        <link rel="stylesheet" href="assets/css/responsive.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>

      <body>
        <section id="home" className="welcome-hero">
          <div className="container">
            <div className="welcome-hero-txt">
              <h2>Üdvözöllek a HyperchargeMarketban! <br /> Itt mindent megtalálsz amire szükséged van</h2>
              <p>Találd meg a legjobb termékeket, kedvező áron, csak 1 kattintással.</p>
            </div>
            <div className="welcome-hero-serch-box">
              <div className="welcome-hero-form">
                <div className="single-welcome-hero-form">
                  <h3>Mit keresel?</h3>
                  <form action="index.html">
                    <input className="input" type="text" placeholder="élelmiszer, elektronika, stb..." />
                  </form>
                </div>
              </div>
              <div className="welcome-hero-serch">
                <button className="welcome-hero-btn" onClick={() => window.location.href='#'}>
                  keresés <i data-feather="search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="list-topics" className="list-topics">
          <div className="container">
            <div className="list-topics-content">
              <ul>
                <li>
                  <div className="single-list-topics-content">
                    <div className="single-list-topics-icon">
                      <i className="flaticon-restaurant"></i>
                    </div>
                    <h2><a href="#">Élelmiszer</a></h2>
                    <p>150 darab</p>
                  </div>
                </li>
                <li>
                  <div className="single-list-topics-content">
                    <div className="single-list-topics-icon">
                      <i className="flaticon-travel"></i>
                    </div>
                    <h2><a href="#">elektronika</a></h2>
                    <p>214 darab</p>
                  </div>
                </li>
                <li>
                  <div className="single-list-topics-content">
                    <div className="single-list-topics-icon">
                      <i className="flaticon-building"></i>
                    </div>
                    <h2><a href="#">Bútor</a></h2>
                    <p>185 darab</p>
                  </div>
                </li>
                <li>
                  <div className="single-list-topics-content">
                    <div className="single-list-topics-icon">
                      <i className="flaticon-pills"></i>
                    </div>
                    <h2><a href="#">Háztartás</a></h2>
                    <p>200 darab</p>
                  </div>
                </li>
                <li>
                  <div className="single-list-topics-content">
                    <div className="single-list-topics-icon">
                      <i className="flaticon-transport"></i>
                    </div>
                    <h2><a href="#">Ruha</a></h2>
                    <p>120 darab</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="explore" className="explore">
          <div className="container">
            <div className="section-header">
              <h2>termékek</h2>
              <p>Fedezd fel legújabb termék kinálatunkat</p>
            </div>
            <div className="explore-content">
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="single-explore-item">
                    <div className="single-explore-img">
                      <img src="" alt="delllaptop" />
                      <div className="single-explore-img-info">
                        <button onClick={() => window.location.href='#'}>Legjobb értékelés</button>
                        <div className="single-explore-image-icon-box">
                          <ul>
                            <li>
                              <div className="single-explore-image-icon">
                                <i className="fa fa-arrows-alt"></i>
                              </div>
                            </li>
                            <li>
                              <div className="single-explore-image-icon">
                                <i className="fa fa-bookmark-o"></i>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="single-explore-txt bg-theme-1">
                      <h2><a href="#">Dell Laptop</a></h2>
                      <p className="explore-rating-price">
                        <span className="explore-rating">5.0</span>
                        <a href="#"> 58 értékelés</a> 
                        <span className="explore-price-box">
                          <span className="explore-price">250000FT</span>
                        </span>
                        <a href="#">Laptop</a>
                      </p>
                      <div className="explore-person">
                        <div className="row">
                          <div className="col-sm-2"></div>
                          <div className="col-sm-10">
                            <p>Csúcskategóriás laptop, legkedvezőbb áron</p>
                          </div>
                        </div>
                      </div>
                      <div className="explore-open-close-part">
                        <div className="row">
                          <div className="col-sm-7">
                            <div className="explore-map-icon">
                              <a href="#"><i data-feather="heart"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer id="footer" className="footer">
          <div className="container">
            <div className="footer-menu">
              <div className="row">
                <div className="col-sm-3">
                  <div className="navbar-header">
                    <a className="navbar-brand" href="index.html">Hypercharge<span>Market</span></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="hm-footer-copyright">
              <div className="row">
                <div className="col-sm-5">
                  <p>&copy;copyright. designed and developed by <a href="https://github.com/Moha0170/vizsgaremek2025/tree/main">Vizsgaremek2025</a></p>
                </div>
                <div className="col-sm-7">
                  <div className="footer-social">
                    <span><i className="fa fa-phone">+36701234567</i></span>
                    <a href="https://www.facebook.com"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://www.x.com"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.tiktok.com"><i className="fa-brands fa-tiktok"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="scroll-Top">
            <div className="return-to-top">
              <i className="fa fa-angle-up" id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
            </div>
          </div>
        </footer>

       
      </body>
    </div>
  );
};

export default IndexPage;
