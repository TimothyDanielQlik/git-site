# Branching Strategies and Workflow Examples

This section has generic examples to cover small work tasks and examples using the omni-project sandbox and Flare files. I recommend that you go through the sandbox examples and use the generic examples for reference or practice.

The branching strategies are good to read over to see how changes in one branch are merged to other branches. The branching strategy that we use will take elements from each of the strategies below.

## Branching strategies

The branching strategies below are related in that the GitFlow workflow encompasses both the Feature Branch workflow and the Centralized workflow. In our daily work, we will be using the GitFlow workflow overall, but our personal work will look more like a Feature Branch or Centralized workflow.

This page is just an overview of the differences between workflows.

1. Centralized workflow
1. Feature Branch workflow
1. Gitflow workflow

### Centralized Workflow

* Private repo on GitHub
* Local repo for writers
* Work on local master branch
* Push changes to remote master branch
* Similar to how we work in TFS

![central](assets/images/central.png)

The workflow would be:

1. Writer work on a document on local master branch.
1. Stage and commit locally.
1. Pull changes from origin.
1. Push changes to master/origin.

??? Recommendation
    Since this workflow has a single branch, rebasing should be used to keep a clean history of liner commits.

#### Problem

* Master is vulnerable.
    * Is it always ready for deployment?
    * Many people working on master with no restraint is a recipe for disaster.
* How do you collaborate?
* How do you focus on a feature?

### Feature Branch Workflow

* Private repo on GitHub.
* Local repo for writers.
* Features/bugs are on a separate branch.
* Feature branches are merged when work is finished.

![feature](assets/images/feature-branch.png)

The workflow would be:

1. Writer work on a document on local feature branch.
1. Stage and commit locally to the feature branch.
1. Pull changes from feature/origin.
1. Push changes to feature/origin.
1. Merge feature branch into master.

#### Adding a bit of control

* Require pull requests to merge feature branches into master.

### Gitflow Workflow

* Private repo on GitHub.
* Local repo for writers.
* Separate development and master branches.
* Features/bugs/hot fixes done on individual branches.

#### Master and Develop

There are two main branches that exist in perpetuity. They are never deleted.

|Master|Develop|
|---    |---|
origin/master HEAD</br> --> Production ready|origin/develop HEAD</br> --> Integration branch|
| --      |Completed dev features are merged into   `develop`|
| --      |This is the "daily branch" or `LD`|
|Build only for production release      |Automatic nightly build|
|Merge a stable `release X` branch into `master` for production|Stable `develop` merged into `release X` branch      |
|Tag this commit with a version|        |
|Never deleted|Never deleted|

In addition to the two main branches, there are three supporting branches.

#### Feature/Topic branches

* Each feature has its own branch.
* Each feature branch is branched from `develop`.
* Often, this branch is only local, but you can track it on origin if you want to back it up or collaborate.
* When feature is complete, merge back into `develop`.
* Naming convention:
    * Not `master`, `develop`, `release-*`, `hotfix-*`.
    * Include JIRA number.
    * example
        * feature-ps-1990
        * improvement-hlp-1345
        * bug-qlik-1217

![gitflow](assets/images/gitflow.png)

#### Release branches

* A branch for preparing a release.
* Quality checks should be done on a release branch.
* Last minute bug changes are done on a release branch.
* Branch from `develop`.
* Merge back into `master` and `develop`.
* When merged into master, tag the commit with release.
* Naming conventions:
    * `release-*`

#### Hotfix branches

* A branch for unplanned last-minute fixes to already-released code.
* Usually bug fixes during a release.
* If branch from `master`,
    * then, merge back into `master` and `develop`.
* If branch from `release-*`,
    * then merge back into `release-*`.

