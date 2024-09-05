## Modular Projects
Each project has three components: app, api, and public. For Next.js to be able to use them, they need to be split up. To still be able to work with projects as git submodules, the cpx2 package is used to copy files during development. In the future, symlinks should be used instead.

Unfortunately, there is a bug in Next.js that doesn't allow symlink support on dev builds, so the approach is to copy the project folders

To import a new project, simply place the project folder in the projects folder. To use submodules, use the following command:

```bash
git submodule add {git path} projects/{project name}
```

Then, create an entry for the project in src/app/Projects.js.