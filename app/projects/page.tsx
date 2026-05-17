"use client";

import { useEffect, useState } from "react";

import { supabase } from "../supabase";

export default function ProjectsPage() {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [projectName, setProjectName] =
    useState("");

  const [userId, setUserId] =
    useState("");

  useEffect(() => {

    getUser();

  }, []);

  // GET USER
  const getUser = async () => {

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {

      window.location.href =
        "/login";

      return;
    }

    setUserId(user.id);

    fetchProjects(user.id);
  };

  // FETCH PROJECTS
  const fetchProjects = async (
    uid: string
  ) => {

    const { data, error } =
      await supabase
        .from("projects")
        .select("*")
        .eq("user_id", uid);

    if (error) {

      console.log(error);

    } else {

      setProjects(data || []);
    }
  };

  // ADD PROJECT
  const addProject = async () => {

    if (!projectName) return;

    const { error } =
      await supabase
        .from("projects")
        .insert([
          {
            name: projectName,
            client: "New Client",
            budget: "$0",
            status: "New",
            user_id: userId,
          },
        ]);

    if (error) {

      console.log(error);

    } else {

      setProjectName("");

      fetchProjects(userId);
    }
  };

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Projects
          </h1>

          <p className="text-gray-400 mt-2">
            User-Based Projects
          </p>

        </div>

        <div className="flex">

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="bg-[#1e293b] text-white px-4 py-3 rounded-xl mr-4 outline-none"
          />

          <button
            onClick={addProject}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold"
          >
            Add Project
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-[#1e293b] rounded-2xl p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-700 text-gray-400">

              <th className="text-left pb-4">
                Project
              </th>

              <th className="text-left pb-4">
                Client
              </th>

              <th className="text-left pb-4">
                Status
              </th>

              <th className="text-left pb-4">
                Budget
              </th>

            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr
                key={project.id}
                className="border-b border-gray-800"
              >

                <td className="py-4 font-semibold">

                  <a
                    href={`/projects/${project.id}`}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    {project.name}
                  </a>

                </td>

                <td>
                  {project.client}
                </td>

                <td className="text-cyan-400">
                  {project.status}
                </td>

                <td>
                  {project.budget}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}