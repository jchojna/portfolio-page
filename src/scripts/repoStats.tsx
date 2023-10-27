export const handleRepo = (repos) => {
  const statsCreated = document.querySelectorAll('.stats__value--js-created');
  const statsUpdated = document.querySelectorAll('.stats__value--js-updated');
  const statsCommits = document.querySelectorAll('.stats__value--js-commits');
  const reposIds = [
    'task-timer',
    'hydrApp',
    'portfolio-page',
    'archviz-website',
    'homepage-gulp',
  ];
  //: FORMAT FETCHED DATES                                             ://
  const getFormattedDate = (date) =>
    date.slice(0, 10).split('-').reverse().join('-');
  //: FILTER SPECIFIC REPOS                                            ://
  const reposFiltered = [...reposIds].map(
    (id) => [...repos].filter((repo) => repo.name === id)[0]
  );
  //: ASSIGN FETCHED DATA TO EACH REPOS                                ://
  for (let i = 0; i < reposFiltered.length; i++) {
    const createdTime = getFormattedDate(reposFiltered[i].created_at);
    const updatedTime = getFormattedDate(reposFiltered[i].updated_at);
    //. ASSIGN DATES                                              .//
    statsCreated[i].innerHTML = createdTime;
    statsUpdated[i].innerHTML = updatedTime;
    //. ASSIGN NUMBER OF TOTAL COMMITS                            .//
    fetch(reposFiltered[i].contributors_url)
      .then((resp) => resp.json())
      .then((resp) => (statsCommits[i].innerHTML = resp[0].contributions));
  }
};
