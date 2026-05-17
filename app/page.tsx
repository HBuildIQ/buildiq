"use client";

import { useEffect, useState } from "react";

import { supabase } from "./supabase";

export default function Dashboard() {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [boq, setBoq] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    checkUser();

  }, []);

  // CHECK USER
  const checkUser = async () => {

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {

      window.location.href =
        "/login";

      return;
    }

    fetchData();
  };

  // FETCH DATA
  const fetchData = async () => {

    // PROJECTS
    const { data: projectsData } =
      await supabase
        .from("projects")
        .select("*");

    setProjects(projectsData || []);

    // BOQ
    const { data: boqData } =
      await supabase
        .from("boq")
        .select("*");

    setBoq(boqData || []);

    setLoading(false);
  };

  // LOGOUT
  const logout = async () => {

    await supabase.auth.signOut();

    window.location.href =
      "/login";
  };

  // TOTAL PROJECTS
  const totalProjects =
    projects.length;

  // TOTAL BOQ ITEMS
  const totalBOQ =
    boq.length;

  // TOTAL VALUE
  const totalValue = boq.reduce(
    (sum, row) =>
      sum + row.quantity * row.unit_price,
    0
  );

  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-screen text-3xl">

        Loading...

      </div>

    );
  }

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            BuildIQ Dashboard
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Construction ERP & Tender Platform
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-400 px-6 py-3 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* PROJECTS */}
        <div className="bg-[#1e293b] p-8 rounded-2xl">

          <h2 className="text-gray-400 mb-3">
            Total Projects
          </h2>

          <p className="text-4xl font-bold text-cyan-400">

            {totalProjects}

          </p>

        </div>

        {/* BOQ */}
        <div className="bg-[#1e293b] p-8 rounded-2xl">

          <h2 className="text-gray-400 mb-3">
            BOQ Items
          </h2>

          <p className="text-4xl font-bold text-cyan-400">

            {totalBOQ}

          </p>

        </div>

        {/* VALUE */}
        <div className="bg-[#1e293b] p-8 rounded-2xl">

          <h2 className="text-gray-400 mb-3">
            Total Tender Value
          </h2>

          <p className="text-4xl font-bold text-green-400">

            $
            {totalValue.toLocaleString()}

          </p>

        </div>

      </div>

      {/* RECENT PROJECTS */}
      <div className="bg-[#1e293b] p-8 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Recent Projects
        </h2>

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

                <td>
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