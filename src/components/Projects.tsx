import { useQuery } from '@tanstack/react-query';

import projects from '../content/projects.json';
import Project from '../views/Project';

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
        />
      ))}
    </>
  );
};

export default Projects;
