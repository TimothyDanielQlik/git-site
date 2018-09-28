# Pulling a remote branch

When you clone the `help-documentationn` repo, whether it be with git bash or Git Extension, you'll only see a `master` branch. Our daily work will be merged to the `daily` branch, so you need to make sure that you pull this branch from the remote to your local machine.

## Git Extension

1. Select **View** > **Show remote branches**.

    You'll see the `origin/daily` somewhere in the graph.

1. Click the branch drop-down and select **Checkout branch**.

    A dialog opens.

1. Select **Remote branch**.

    Choose `origin/daily` or whichever remote branch you want to pull.

1. Select **Checkout**.

    You will now have a local copy of the `daily` branch.

!!!Info
    Remember that you should always pull the latest from `daily` before you create local feature branches. Always pull latest from `daily` before merging your feature branch to `daily`.

## Git bash

Run the following commands from the `help-documentation` repo:

1. List the branches. You will see your local and remote branches.

    ```bash
    /c/git/help-documentation (master)
    $ git branch --all
    * master
    remotes/origin/HEAD -> origin/master
    remotes/origin/daily
    remotes/origin/master
    ```

1. Checkout `daily`. By checking it out, git creates a local branch and sets upstream tracking.

    ```bash
    /c/git/help-documentation (master)
    $ git checkout daily
    Switched to a new branch 'daily'
    Branch 'daily' set up to track remote branch 'daily' from 'origin'.

    /c/git/help-documentation (daily)
    $ git status
    On branch daily
    Your branch is up to date with 'origin/daily'.

    nothing to commit, working tree clean
    ```

1. Check the log. This will show you where `daily` is relative to the commit history. The -3 argument tells git to show the last 3 commits. Set this number to anything.

    ```bash
    /c/git/help-documentation (daily)
    $ git log --branches --oneline -3
    0d6da15f (HEAD -> daily, origin/master, origin/daily, origin/HEAD, master) Merge branch 'master' of https://github.com/qlik-trial/help-documentation
    e4475d8c Condition cleanup
    f0cb3326 Merge branch 'master' of https://github.com/qlik-trial/help-documentation
    ```

1. Verify.

    ```bash
    /c/git/help-documentation (daily)
    $ git branch
    * daily
    master
    ```

!!!Info
    Remember that you should always pull the latest from `daily` before you create local feature branches. Always pull latest from `daily` before merging your feature branch to `daily`.