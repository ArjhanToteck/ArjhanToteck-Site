## Modular Projects
Each project has three components: app, api, and public. For Next.js to be able to use them, they need to be split up. To still be able to work with projects as git submodules, use symlinks to split them up this way.

Unfortunately, there is a bug in Next.js that doesn't allow symlink support on dev builds, so production builds must be used to test the app. It will still work when deployed on Vercel for this reason.

Here are the steps to import a new project:

1. Import submodule:

```
git submodule add {submodule git path}
```

2. Link app folder:

```
ln -s ../projects/{project name}/app ./app/{project name}
```

3. Link api folder:

```
ln -s ../../projects/{project name}/api ./pages/api/{project name}
```

4. Link public folder:

```
ln -s ../projects/{project name}/public ./public/{project name}
```