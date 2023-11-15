import clsx from 'clsx';

import IconLink from '../components/IconLink';

import about from '../content/about.json';
import contactDetails from '../content/contactDetails.json';

import classes from './About.module.scss';

const About = () => {
  return (
    <div id="about" className={clsx(classes.section, classes.about)}>
      <div className={clsx(classes.container, classes.about)}>
        <h2 className={clsx(classes.heading, classes.large, classes.about)}>
          {about.title}
        </h2>
        <img src="assets/img/photo.jpg" className="photo" alt="My photo" />
        <section className="tab description">
          <p className="tab__description about">{about.description}</p>
        </section>
        <div className={classes.contactDetails}>
          {contactDetails.map((details) => (
            <IconLink details={details} view="about" />
          ))}
        </div>
        {/* WORKING KNOWLEDGE */}
        <section className="tab tab--working">
          <h3 className="tab__heading tab__heading--about tab__heading--working">
            Working knowledge
          </h3>
          <ul className="icons icons--working">
            {/* HTML */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#html-1"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded1"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#html-2"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded2"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#html-3"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">html</span>
            </li>
            {/* CSS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#css-1"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded1"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#css-2"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded2"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#css-3"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">css</span>
            </li>
            {/* JAVASCRIPT */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#javascript-1"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded1"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#javascript-2"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded2"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#javascript-3"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">javascript</span>
            </li>
            {/* SASS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#sass"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">sass</span>
            </li>
            {/* BEM */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#bem"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">bem</span>
            </li>
            {/* REACT.JS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#react"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">react.js</span>
            </li>
            {/* GIT */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#git"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">git</span>
            </li>
            {/* VISUAL STUDIO CODE */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#vscode-1"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded1"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#vscode-2"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded2"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#vscode-3"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">vs code</span>
            </li>
            {/* FIGMA */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#figma-1"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded1"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#figma-2"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded2"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#figma-3"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">figma</span>
            </li>
            {/* ILLUSTRATOR */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#illustrator"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">
                illustrator
              </span>
            </li>
            {/* PHOTOSHOP */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#photoshop"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">photoshop</span>
            </li>
          </ul>
        </section>
        {/* KNOW SOMETHING ABOUT */}
        <section className="tab tab--knowing">
          <h3 className="tab__heading tab__heading--about tab__heading--knowing">
            Know something about
          </h3>
          <ul className="icons icons--knowing">
            {/* REDUX */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#redux"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">redux</span>
            </li>
            {/* NPM */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#npm"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">npm</span>
            </li>
            {/* FETCH API / AJAX */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#ajax"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">api / ajax</span>
            </li>
            {/* GULP */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#gulp"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">gulp</span>
            </li>
            {/* JEST */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#jest"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">jest</span>
            </li>
            {/* BOOTSTRAP */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#bootstrap"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">bootstrap</span>
            </li>
            {/* WORDPRESS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#wordpress"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">wordpress</span>
            </li>
          </ul>
        </section>
        {/* WANT TO LEARN */}
        <section className="tab tab--learning">
          <h3 className="tab__heading tab__heading--about tab__heading--learning">
            Want to learn
          </h3>
          <ul className="icons icons--learning">
            {/* NODE.JS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#nodejs"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">node.js</span>
            </li>
            {/* EMOTION */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#emotion"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">emotion</span>
            </li>
            {/* GRAPHQL */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#graphql"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">graphql</span>
            </li>
            {/* D3.JS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#d3js-1"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded1"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#d3js-2"></use>
                </svg>
                <svg
                  className="icons__svg icons__svg--faded2"
                  viewBox="0 0 200 200"
                >
                  <use href="assets/svg/icons.svg#d3js-3"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">d3.js</span>
            </li>
            {/* PT.JS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#p5js"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">p5.js</span>
            </li>
            {/* THREE.JS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#threejs"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">three.js</span>
            </li>
            {/* ELECTRON */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#electron"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">electron</span>
            </li>
            {/* WEBSOCKET */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#websocket"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">websocket</span>
            </li>
            {/* TYPESCRIPT */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#typescript"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">typescript</span>
            </li>
            {/* ENZYME */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#enzyme"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">enzyme</span>
            </li>
            {/* NEXT.JS */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#nextjs"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">next.js</span>
            </li>
            {/* GATSBY */}
            <li className="icons__item">
              <div className="icons__logo icons__logo--about">
                <svg className="icons__svg" viewBox="0 0 200 200">
                  <use href="assets/svg/icons.svg#gatsby"></use>
                </svg>
              </div>
              <span className="icons__name icons__name--about">gatsby</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
