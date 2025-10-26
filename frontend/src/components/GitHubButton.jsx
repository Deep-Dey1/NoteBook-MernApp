import { Github } from "lucide-react";

const GitHubButton = () => {
  return (
    <a
      href="https://github.com/Deep-Dey1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:right-6 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 z-50 btn btn-circle btn-primary shadow-lg hover:scale-110 transition-transform duration-300"
      title="Visit my GitHub Profile"
    >
      <Github className="size-5" />
    </a>
  );
};

export default GitHubButton;
