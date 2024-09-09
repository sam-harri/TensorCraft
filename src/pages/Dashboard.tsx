import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type Project = {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  lastEdited: string;
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Dummy project data
  const projects: Project[] = [
    {
      id: "1",
      name: "Image Classifier",
      description: "A neural network model for classifying images into categories.",
      imageUrl: "https://via.placeholder.com/300",
      lastEdited: "August 15, 2024",
    },
    {
      id: "2",
      name: "Text Sentiment Analysis",
      description: "Analyzes the sentiment of text data using natural language processing.",
      imageUrl: "https://via.placeholder.com/300",
      lastEdited: "August 12, 2024",
    },
    {
      id: "3",
      name: "GAN for Image Generation",
      description: "Generative Adversarial Network for creating realistic images.",
      imageUrl: "https://via.placeholder.com/300",
      lastEdited: "August 10, 2024",
    },
    {
      id: "4",
      name: "Speech Recognition",
      imageUrl: "https://via.placeholder.com/300",
      lastEdited: "August 8, 2024",
    },
  ];

  const handleOpenProject = (id: string) => {
    navigate(`/project/${id}`);
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleRename = (id: string) => {
    console.log("Rename project:", id);
    // Add rename logic here
    setDropdownOpen(null);
  };

  const handleChangeDescription = (id: string) => {
    console.log("Change description for project:", id);
    // Add change description logic here
    setDropdownOpen(null);
  };

  const handleDelete = (id: string) => {
    console.log("Delete project:", id);
    // Add delete logic here
    setDropdownOpen(null);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold mb-8">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <CardHeader>
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="flex justify-between items-start mt-4">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {project.name}
                  </CardTitle>
                  {project.description && (
                    <CardDescription className="text-gray-600 mt-2">
                      {project.description}
                    </CardDescription>
                  )}
                </div>
                <div className="relative">
                  <button
                    className="text-gray-700"
                    onClick={() => toggleDropdown(project.id)}
                  >
                    <EllipsisHorizontalIcon className="w-6 h-6" />
                  </button>
                  {dropdownOpen === project.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul>
                        <li>
                          <button
                            onClick={() => handleRename(project.id)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Rename Project
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleChangeDescription(project.id)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Change Description
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          >
                            Delete Project
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <button
                onClick={() => handleOpenProject(project.id)}
                className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                Open Project
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Last edited: {project.lastEdited}
              </p>
            </CardFooter>
          </Card>
        ))}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-400 opacity-75 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-300 opacity-75 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Dashboard;
