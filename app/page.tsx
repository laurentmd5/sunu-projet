"use client";

import { useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import { FolderKanban } from "lucide-react";
import {
  createProject,
  deleteProjectById,
  getOwnerDashboardOverview,
  getProjectsCreatedByUSer,
} from "./actions";
import { toast } from "react-toastify";
import { OwnerDashboardOverview, Project } from "@/type";
import ProjectComponent from "./components/ProjectComponent";
import EmptyState from "./components/EmptyState";
import OwnerDashboardSummary from "./components/OwnerDashboardSummary";
import OwnerDashboardProjectCard from "./components/OwnerDashboardProjectCard";
import OwnerPriorityProjects from "./components/OwnerPriorityProjects";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [dashboard, setDashboard] = useState<OwnerDashboardOverview | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [projectStatusFilter, setProjectStatusFilter] = useState<
    "ALL" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED"
  >("ALL");

  const fetchProjects = async () => {
    try {
      const myProjects = await getProjectsCreatedByUSer();
      setProjects(myProjects);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    }
  };

  const fetchDashboard = async () => {
    try {
      setLoadingDashboard(true);
      const data = await getOwnerDashboardOverview();
      setDashboard(data);
    } catch (error) {
      console.error("Erreur lors du chargement du dashboard owner:", error);
    } finally {
      setLoadingDashboard(false);
    }
  };

  const refreshHomeData = async () => {
    await Promise.all([fetchProjects(), fetchDashboard()]);
  };

  useEffect(() => {
    refreshHomeData();
  }, []);

  const deleteProject = async (projectId: string) => {
    try {
      await deleteProjectById(projectId);
      await refreshHomeData();
      toast.success("Projet supprimé !");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la suppression"
      );
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      await createProject(name, description);

      if (modal) {
        modal.close();
      }

      setName("");
      setDescription("");
      await refreshHomeData();
      toast.success("Projet créé");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Erreur lors de la création du projet");
    }
  };

  const filteredDashboardProjects =
    dashboard?.projects.filter((project) => {
      if (projectStatusFilter === "ALL") return true;
      return project.projectStatus === projectStatusFilter;
    }) ?? [];

  return (
    <Wrapper>
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Dashboard projets</h1>
              <p className="mt-1 text-sm opacity-70">
                Vue centralisée des projets que vous pilotez ou suivez avec les permissions adéquates.
              </p>
            </div>

            <button
              className="btn btn-soft btn-primary border border-base-300"
              onClick={() =>
                (document.getElementById("my_modal_3") as HTMLDialogElement).showModal()
              }
            >
              Nouveau Projet <FolderKanban />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Filtrer par statut :</span>

            <select
              className="select select-bordered select-sm"
              value={projectStatusFilter}
              onChange={(e) =>
                setProjectStatusFilter(
                  e.target.value as "ALL" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED"
                )
              }
            >
              <option value="ALL">Tous</option>
              <option value="ACTIVE">Actifs</option>
              <option value="ON_HOLD">En pause</option>
              <option value="COMPLETED">Terminés</option>
              <option value="ARCHIVED">Archivés</option>
            </select>
          </div>

          {loadingDashboard ? (
            <div className="rounded-xl border border-base-300 p-5 text-sm opacity-70">
              Chargement du dashboard...
            </div>
          ) : dashboard ? (
            <div className="space-y-6">
              <OwnerDashboardSummary summary={dashboard.summary} />
              <OwnerPriorityProjects projects={dashboard.projects} />

              {filteredDashboardProjects.length > 0 ? (
                <div className="grid gap-6 xl:grid-cols-2">
                  {[...filteredDashboardProjects]
                    .sort((a, b) => {
                      const colorWeight = { RED: 0, ORANGE: 1, GREEN: 2 };
                      const colorDiff = colorWeight[a.healthColor] - colorWeight[b.healthColor];
                      if (colorDiff !== 0) return colorDiff;
                      return a.healthScore - b.healthScore;
                    })
                    .map((card) => (
                      <OwnerDashboardProjectCard key={card.projectId} card={card} />
                    ))}
                </div>
              ) : (
                <EmptyState
                  imageSrc="/empty-project.png"
                  imageAlt="Aucun projet owner"
                  message={
                    projectStatusFilter === "ALL"
                      ? "Aucun projet owner à afficher dans le dashboard."
                      : "Aucun projet ne correspond à ce statut."
                  }
                />
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-base-300 p-5 text-sm text-error">
              Impossible de charger le dashboard owner.
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Mes projets</h2>
            <p className="mt-1 text-sm opacity-70">
              Vue existante conservée pour une transition progressive.
            </p>
          </div>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg">Nouveau Projet</h3>
              <p className="py-4">
                Décrivez votre projet simplement grâce à la description
              </p>

              <div>
                <input
                  placeholder="Nom du projet"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-base-300 input input-bordered w-full mb-4 placeholder:text-sm"
                  required
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-2 textarea textarea-bordered border border-base-300 w-full textarea-md placeholder:text-sm"
                  required
                />

                <button className="btn btn-primary" onClick={handleSubmit}>
                  Nouveau Projet <FolderKanban />
                </button>
              </div>
            </div>
          </dialog>

          <div className="w-full">
            {projects.length > 0 ? (
              <ul className="grid w-full gap-6 md:grid-cols-3">
                {projects.map((project) => (
                  <li key={project.id}>
                    <ProjectComponent
                      project={project}
                      admin={1}
                      style={true}
                      onDelete={deleteProject}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                imageSrc="/empty-project.png"
                imageAlt="Picture of an empty project"
                message="Aucun projet créé"
              />
            )}
          </div>
        </section>
      </div>
    </Wrapper>
  );
}