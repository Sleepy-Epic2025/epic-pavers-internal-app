import { v4 as uuid } from "uuid";

let projects = [];

export const storage = {
  async getProjects() {
    return projects;
  },

  async createProject(data) {
    const project = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...data
    };
    projects.push(project);
    return project;
  },

  async updateProject(id, data) {
    projects = projects.map(p =>
      p.id === id ? { ...p, ...data } : p
    );
    return projects.find(p => p.id === id);
  },

  async deleteProject(id) {
    projects = projects.filter(p => p.id !== id);
  }
};
