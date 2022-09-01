# cml-narrative

![logo](/assets/spot/SPOT-logo.svg)
This repository contains the narrative web app portion of the CML project.

## About

This project is being developed by the IDEA Lab at Clemson University.

## Project Structure

This project will be split into different branches. This is a feature of `git` that will allow us to work on different features of this application without messing each other up.

The repository will consist of a `main` branch and a `development` branch. The `main` branch is reserved for final commits. Think of this branch being "production ready," (what the user will interact with). Everything here should be tested and working.

The `development` branch should be the branch you are developing in. However, if you decide to work on a new feature, it would be better to create a new branch from the `development` branch and then submit a pull request to merge your changes to the `development` branch which can then be merged to the `main` branch.

An example project stucture could look like:

```
.
`-- main/
    `-- development/
        |-- feature a/
        |   `-- quick fix to feature a
        `-- feature b
```

Pull requests can be made by visiting this projects repository on GitHub.

## Recommended Development Environment

I would recommend using [VSCode](https://code.visualstudio.com) to develop. This is a free application that is highly extensible.

Additional setup will be documented in another README
