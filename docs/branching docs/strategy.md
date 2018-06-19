# A branching strategy for writers

## Test scenario

* PS-1
    Make some updates to an existing topic and dependencies.

    * 4 commits

* PS-2
    Add a new topic, update TOC, and links to new topic.

    * 6 commits

* PS-3
    Reorganize a section. Move topics in TOC, create topic, delete topic, add images.

    * 5 commits

* PS-4 
    Create new project with target, toc, and topics.

    * n commits

### State of branches

1. `master` (tracks deployed content - all commits are release-tagged)

    * Tagged with release tag

1. `release-ready` (tracks release-ready features - branch output to betahelp)

    * Tagged with JIRA number

1. `develop` (daily work - LD/RC)

    * Writers merge often to check build output.

### Basic Workflow

* Writers do work on local feature branches which are branches from `release-ready` (this branch will have the finished feature work at the time you create the branch).

* Writers can make merge-commits to `develop` to test their work on a Jenkins build (equivalent to current LD/RC that is controlled by feature toggles).

* When the feature is finished and ready for help-site integration:

    1. Merge-commit to `develop`.
    1. Squash commits on local branch.
    1. Merge-commit to `release-ready`.
    1. Tag commit with JIRA number. (all work should be tracked in JIRA?)

## Test

1. Create branch `ps1`, `ps2`, `ps3`, `ps4`, based on `release-ready`.
1. Do a bunch of work on each branch.

![dev-cycle](assets/images/dev-cycle.png)

!!! Note
    Writers want to check their work on a web server to check content in context.

1. Writers merge branches into `develop` whenever they want to build to LD/RC.

    1. Merge `ps2` to `develop`.
        * Always do a git fetch (and merge if required) first!
        * Merge and then do Jenkins build.
        * Writer notices some typos so they do this change on their feature branch.

    1. Merge `ps3` to `develop`.
        * Always do a git fetch (and merge if required) first!
        * I merge I get a conflict.

        ![conflict](assets/images/dev-cycle-conflict.png)

        !!! Note
            TOC changes will often result in conflicts. A good rule of thumb is to accept both changes since the conflict is probably due to topics being added rather than removed. TOC reorg work should involve more succinct communication to avoid conflicts.

        * Fix change in VS Code, save, then click stage all.
        * Writer notices some typos so they do this change on their feature branch.

        ![state](assets/images/after-merge.png)

    1. Merge `ps1` to `develop`.
        * Always do a git fetch (and merge if required) first!
        * I get a merge conflict. I content on the same line in the file and the Madcap:lastheight/depth properties changed. In this case, I wan to accept the incoming changes from `ps1`.
        * Opening the file in VS Code makes this process very easy.
        * Fix change in VS Code, save, then click stage all.
        * Everything looks good on Jenkins build.

    1. Merge `ps2` to `develop`.
        * Always do a git fetch (and merge if required) first!
        * Writer did final changes on feature branch and merge back to `develop`.
        * Everything looks good on Jenkins build.

    1. Merge `ps3` to `develop`.
        * Always do a git fetch (and merge if required) first!
        * Writer did final changes on feature branch and merge back to `develop`.
        * Everything looks good on Jenkins build.

    1. Merge `ps4` to `develop`.
        * Always do a git fetch (and merge if required) first!
        * Everything looks good on Jenkins build.

![4merge](assets/images/4merge.png)

All the feature work has been merged to `develop` and checked on the LD/RC build.

When features are ready for release, merge feature branch to `release-ready` and tag the commit on the `release-ready` branch with the JIRA.

This way, the release branch tracks tagged commits that comprises latest finished features. If we need to move features to refreshes then we can cherry pick.