const TextCard = ({ title, text }) => (
  <div className="tab tab--resume tab--info">
    <h3 className="tab__heading tab__heading--resume">Personal Info</h3>
    <div className="tab__wrapper js-expandable js-minHeight">
      <p className="tab__description tab__description--resume">
        As an architect I have a background in programming parametric
        architecture using tools like Grasshopper and Kangaroo. Long experience
        in 3d graphic and architectural visualization industry had a strong
        impact on my sense of aesthetics and visual composition. I also had an
        encounter with motion design and compositing. During my one year stay in
        Slovenia, I had an opportunity to work in English-speaking environment.
        As an individual, I think I would describe myself as a self-taught,
        multipotentialite person with a certain dose of perfectionism.
      </p>
      <p className="tab__description tab__description--resume">
        After I had created my first personal portfolio website in Wordpress, I
        decided to take my chances in frontend development about one year ago
        and learn it after hours. I have taken some online courses, but first of
        all I focused on writing my own projects and learning by practice. I
        tried to avoid using external libraries where I possibly could while
        writing the code, to get better understanding of HTML, CSS and JS
        basics. What I like about frontend web development is an endless process
        of learning, logical and analytical thinking and that it enables me to
        connect my previous experience backgrounds at some level.
      </p>
    </div>
    <button className="tab__readMore tab__readMore--resume tab__readMore--js">
      Read more
    </button>
  </div>
);

export default TextCard;
