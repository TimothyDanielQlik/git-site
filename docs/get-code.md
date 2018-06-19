# Clone the Project with Git Extension

GitHub is a web-based platform that hosts git repositories. To start using GitHub, you need to clone our documentation project to your local machine.

A clone is local copy of the entire repository, including the repository history. The benefit of having the entire history of the repository on your machine is that you can work locally and offline.

## Git clone with Git Extension

Do the following:

!!! Note
    The first time you clone a repository, **clone a github repository** appears in the opening dialog.

1. Go to **Start** > **Clone repository**.
1. Enter the repository URL. You find the URL on the github repository page.

    It will be `https://github.com/<name-of-org>/<name-of-repo>.git`

    The subdirectory will be created automatically based on the name of the repository.

    The destination path should be `c\git`.

    **Example**

    ![clone setting](assets/images/clone-GE.png)

4. Click **Clone** when you are ready!

Click **OK** to open the repository.

You should now see the git repository open in in a Git Extension.

## What happened

When you clone a GitHub repository, you take a copy of the entire repository and save it locally. The local copy is linked to the remote copy (on GitHub).

## Why did we do this

In a nutshell, this setup lets you work anywhere, even offline, since you have a copy of the entire history on your local machine. The GitHub repository is no different from your local copy, but for our workflow, we will treat the repository on GitHub as the main repository (the one we want to sync with and push our changes to). You work on your content locally, commit your changes locally, and then push your local changes to the remote repository.
