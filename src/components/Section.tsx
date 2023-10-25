import logos from '../assets/svg/logos.svg';

import './Section.scss';

const About = () => {
  return (
    <article id="resume" className="section section--resume section--js">
      <div className="section__container section__container--resume section__container--js">
        <h2 className="section__heading section__heading--large section__heading--resume">
          Jakub Chojna
        </h2>

        <div className="logo logo--resume">
          <svg className="logo__base logo__base--resume" viewBox="0 0 512 512">
            <use href={`${logos}#resume-base`}></use>
          </svg>
          <svg
            className="logo__shadow logo__shadow--resume"
            viewBox="0 0 512 512"
          >
            <use href={`${logos}#resume-shadow`}></use>
          </svg>
        </div>
        <section className="tab tab--resume tab--info">
          <h3 className="tab__heading tab__heading--resume">Personal Info</h3>
          <div className="tab__wrapper js-expandable js-minHeight">
            <p className="tab__description tab__description--resume">
              As an architect I have a background in programming parametric
              architecture using tools like Grasshopper and Kangaroo. Long
              experience in 3d graphic and architectural visualization industry
              had a strong impact on my sense of aesthetics and visual
              composition. I also had an encounter with motion design and
              compositing. During my one year stay in Slovenia, I had an
              opportunity to work in English-speaking environment. As an
              individual, I think I would describe myself as a self-taught,
              multipotentialite person with a certain dose of perfectionism.
            </p>
            <p className="tab__description tab__description--resume">
              After I had created my first personal portfolio website in
              Wordpress, I decided to take my chances in frontend development
              about one year ago and learn it after hours. I have taken some
              online courses, but first of all I focused on writing my own
              projects and learning by practice. I tried to avoid using external
              libraries where I possibly could while writing the code, to get
              better understanding of HTML, CSS and JS basics. What I like about
              frontend web development is an endless process of learning,
              logical and analytical thinking and that it enables me to connect
              my previous experience backgrounds at some level.
            </p>
          </div>
          <button className="tab__readMore tab__readMore--resume tab__readMore--js">
            Read more
          </button>
        </section>
        <section className="tab tab--resume tab--experience tab--js-resume">
          <h3 className="tab__header tab__header--resume">
            <button className="tab__button tab__button--resume tab__button--js-resume">
              <span className="mark mark--resume"></span>
              <span>Experience</span>
            </button>
          </h3>
          <div className="container">
            <div className="content">
              <section className="subtab subtab--resume subtab--js-resume">
                <h4 className="subtab__header subtab__header--resume">
                  <button className="subtab__button subtab__button--resume subtab__button--js-resume">
                    <span className="mark mark--resume"></span>
                    <span>Architecture</span>
                  </button>
                </h4>
                <div className="container">
                  <ul className="content__list">
                    <li className="content__item content__item--resume content__item--experience">
                      <p className="content__title content__title--experience">
                        2017 - present
                      </p>
                      <p className="content__description content__description--primary">
                        Freelance Architect
                      </p>
                      <p className="content__description content__description--secondary">
                        self-employed
                      </p>
                      <p className="content__description content__description--additional">
                        Remote
                      </p>
                    </li>
                    <li className="content__item content__item--resume content__item--experience">
                      <p className="content__title content__title--experience">
                        2018
                      </p>
                      <p className="content__description content__description--primary">
                        Architect / 3d Visualizer
                      </p>
                      <p className="content__description content__description--secondary">
                        Svet Vmes
                      </p>
                      <p className="content__description content__description--additional">
                        Ljubljana, Slovenia
                      </p>
                    </li>
                    <li className="content__item content__item--resume content__item--experience">
                      <p className="content__title content__title--experience">
                        2015 - 2017
                      </p>
                      <p className="content__description content__description--primary">
                        Architect / 3d Visualizer
                      </p>
                      <p className="content__description content__description--secondary">
                        Mofo Architekci
                      </p>
                      <p className="content__description content__description--additional">
                        Warsaw, Poland
                      </p>
                    </li>
                    <li className="content__item content__item--resume content__item--experience">
                      <p className="content__title content__title--experience">
                        2011 - 2013
                      </p>
                      <p className="content__description content__description--primary">
                        Architect
                      </p>
                      <p className="content__description content__description--secondary">
                        Activum Projektowanie
                      </p>
                      <p className="content__description content__description--additional">
                        Warsaw, Poland
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
              <section className="subtab subtab--resume subtab--js-resume">
                <h4 className="subtab__header subtab__header--resume">
                  <button className="subtab__button subtab__button--resume subtab__button--js-resume">
                    <span className="mark mark--resume"></span>
                    <span>3d Graphics</span>
                  </button>
                </h4>
                <div className="container">
                  <ul className="content__list">
                    <li className="content__item content__item--resume content__item--experience">
                      <p className="content__title content__title--experience">
                        2008 - present
                      </p>
                      <p className="content__description content__description--primary">
                        Freelance 3d Visualizer
                      </p>
                      <p className="content__description content__description--secondary">
                        self-employed
                      </p>
                      <p className="content__description content__description--additional">
                        Remote
                      </p>
                    </li>
                    <li className="content__item content__item--resume content__item--experience">
                      <p className="content__title content__title--experience">
                        2010 - 2013
                      </p>
                      <p className="content__description content__description--primary">
                        3d software tutor
                      </p>
                      <p className="content__description content__description--secondary">
                        Euro Info Group
                      </p>
                      <p className="content__description content__description--additional">
                        Warsaw, Poland
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
              <section className="subtab subtab--resume subtab--js-resume">
                <h4 className="subtab__header subtab__header--resume">
                  <button className="subtab__button subtab__button--resume subtab__button--js-resume">
                    <span className="mark mark--resume"></span>
                    <span>Frontend Web Dev</span>
                  </button>
                </h4>
                <div className="container">
                  <ul className="content__list">
                    <li className="content__item content__item--resume content__item--frontend">
                      <p className="content__title content__title--experience content__title--fullWidth">
                        No professional experience yet ...
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </section>
        <section className="tab tab--resume tab--education tab--js-resume">
          <h3 className="tab__header tab__header--resume">
            <button className="tab__button tab__button--resume tab__button--js-resume">
              <span className="mark mark--resume"></span>
              <span>Education</span>
            </button>
          </h3>
          <div className="container">
            <ul className="content__list">
              <li className="content__item content__item--resume content__item--education">
                <p className="content__title">2011 - 2014</p>
                <p className="content__description content__description--primary">
                  Warsaw University of Technology
                </p>
                <p className="content__description content__description--secondary">
                  Faculty of Architecture
                </p>
                <p className="content__description content__description--additional">
                  Master's Degree
                </p>
              </li>
              <li className="content__item content__item--resume content__item--education">
                <p className="content__title">2006 - 2010</p>
                <p className="content__description content__description--primary">
                  Warsaw University of Technology
                </p>
                <p className="content__description content__description--secondary">
                  Faculty of Architecture
                </p>
                <p className="content__description content__description--additional">
                  Bachelor's Degree
                </p>
              </li>
              <li className="content__item content__item--resume content__item--education">
                <p className="content__title">2003 - 2006</p>
                <p className="content__description content__description--primary">
                  Joachim Lelewel High School No. XLI
                </p>
                <p className="content__description content__description--secondary">
                  Mathematics - Physics profile
                </p>
                <p className="content__description content__description--additional">
                  Warsaw, Poland
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section className="tab tab--resume tab--languages tab--js-resume">
          <h3 className="tab__header tab__header--resume">
            <button className="tab__button tab__button--resume tab__button--js-resume">
              <span className="mark mark--resume"></span>
              <span>Languages</span>
            </button>
          </h3>
          <div className="container">
            <ul className="content__list">
              <li className="content__item content__item--resume content__item--languages">
                <p className="content__title">English</p>
                <p className="content__description content__description--secondary">
                  Proficient
                </p>
              </li>
              <li className="content__item content__item--resume content__item--languages">
                <p className="content__title">German</p>
                <p className="content__description content__description--secondary">
                  Elementary
                </p>
              </li>
              <li className="content__item content__item--resume content__item--languages">
                <p className="content__title">Polish</p>
                <p className="content__description content__description--secondary">
                  Native
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
};

export default About;
