import { useQuery } from '@tanstack/react-query';
// tasktimer snapshots
import tasktimerSnap1 from '../assets/img/tasktimer/01.jpg';
import tasktimerSnap2 from '../assets/img/tasktimer/02.jpg';
import tasktimerSnap3 from '../assets/img/tasktimer/03.jpg';
import tasktimerSnap4 from '../assets/img/tasktimer/04.jpg';
// archviz snapshots
import archvizSnap1 from '../assets/img/archviz/01.jpg';
import archvizSnap2 from '../assets/img/archviz/02.jpg';
import archvizSnap3 from '../assets/img/archviz/03.jpg';
import archvizSnap4 from '../assets/img/archviz/04.jpg';
import archvizSnap5 from '../assets/img/archviz/05.jpg';
import archvizSnap6 from '../assets/img/archviz/06.jpg';

import projects from '../content/projects.json';
import Project from './Project';

const snapshots: { [key: string]: string[] } = {
  tasktimer: [tasktimerSnap1, tasktimerSnap2, tasktimerSnap3, tasktimerSnap4],
  hydrapp: [''],
  portfolio: [''],
  archviz: [
    archvizSnap1,
    archvizSnap2,
    archvizSnap3,
    archvizSnap4,
    archvizSnap5,
    archvizSnap6,
  ],
  quotes: [''],
};

const Projects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['repoosData'],
    queryFn: () =>
      fetch(`https://api.github.com/users/jchojna/repos`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{`An error occured: ${error.message}`}</div>;

  return (
    <>
      {projects.map(({ name, repoName, about, features, icons }) => (
        <Project
          key={name}
          name={name}
          about={about}
          features={features}
          icons={icons}
          fetchedData={data.find((repo: RepoObj) => repo.name === repoName)}
          snapshots={snapshots[name]}
        />
      ))}
    </>
  );
};

export default Projects;
