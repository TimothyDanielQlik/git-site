# GitFlow for documentation

* We use the basic GitFlow for managing our writer and major release workflow.
* We add an extra branch `versions` that contains single commits with tags.
    * No non-tagged commits.
    * No rebasing.
    * Merge via `git merge -Xtheirs <refresh-branch>`



## Writers do feature work in this area

![visio](assets/images/visio-features.png)

1. pull latest `develop`
1. create feature branch from `develop`
1. do work on feature branch
1. check work locally on Flare
1. merge feature branch back to `develop`

* Feature branches do not need to be pushed to te remote.
* To collaborate, push feature branch to remote and ask for reviewer to do pull request.

## Writers do release work in tis area

![visio](assets/images/visio-release.png)

1. Release engineer creates a release branch.
1. Writers do last minute fixes directly on branch.
1. Writers could alternatively make local branches to do work and merge to release.
1. Milestone checks and quality checks would be done on these release branches.

* Release branches are temporary.
* After merge, they are deleted.

![visio](assets/images/visio-released.png)

1. release engineer stops all commits on release branch.
1. release engineer merges release branch to `develop` and to `master` and to `version`.
1. This commit is tagged with the release tag. (v1.0, June2016, etc.)

## Writers do hotfix on hotfix branch

![visio](assets/images/visio-hotfix.png)

We released the docs but the devs noticed some bugs that need to be fixed on latest release.

1. Release engineer creates hotfix branch.
1. Writers do fix directly on branch.
1. Release engineer stops all commits on hotfix branch.
1. Release engineer merges back to `develop`, `master`, `version`.
1. Release engineer adds hot fix tag.

## Update previous versions

There are some bug fixes that need to show up on v.1.0.

1. Branch off of the tagged commit to an `update-*` branch.

![visio](assets/images/visio-update.png)

1. Release engineer creates new `release-update` branch.
1. Writers work on `release-update` branch.
1. They could optionally create local branches and merge to `release-update`.
1. Commit early and often because we need to cherry pick these changes later.
1. Merge to `version` branch. Since this is an old version, there will be conflicts. On this branch, only care about creating a tagged commit.
1. Resolve conflicts with `git merge Xtheirs update-*`
1. Cherry pick your commits to the `develop` branch.
1. Check your work!
1. After update, release engineer merges `develop` to `master`.

![visio](assets/images/visio-versionupdate.png)

### Example with Sourcetree

Starting point:

|   Branch  |   Purpose |   Status  |
|---        |---        |---        |
|`master`       |Maintain history of latest released content|Permanent</br>Closed to writer commits.|
|`develop`      |Contains latest feature work to be released.|Permanent</br>Open to writer commits.|
|`version`      |Maintain a record of released versions that are tagged.         |Permanent</br>Closed to writer commits.|
|`feature`      |Local develop branch for a writer.|Temporary</br>Created by the writer.|
|`release`      |Release preparation branch.       |Temporary</br>Open to writer commits but monitored by release engineer.|
|`hotfix`       |A branch to do emergency fixes on the latest release.|         Temporary</br>Open to writer commits but monitored by release engineer.|
