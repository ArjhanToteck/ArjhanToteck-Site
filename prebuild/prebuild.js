import nextEnv from "@next/env";
import configureProjects from "./configureProjects.js";

const { loadEnvConfig } = nextEnv;

const projectDir = process.cwd()
loadEnvConfig(projectDir)

configureProjects();