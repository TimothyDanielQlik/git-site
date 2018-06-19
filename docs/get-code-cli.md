# Clone the Project with Git Bash

GitHub is a web-based platform that hosts git repositories. To start using GitHub, you need to clone our documentation project to your local machine.

A clone is local copy of the entire repository, including the repository history. The benefit of having the entire history of the repository on your machine is that you can work locally and offline.

??? Tip
    Need some help getting started with Git Bash?</br>
    [Tips for using Git Bash](gitbash-tips.md)

## Clone the repo using Git Bash

Before we clone, we create a git folder on our machine (if you don't already have one).

1. Create a new directory called `git` on your machine.
    ```bash
    C:\git
    ```
2. Open Git Bash.
3. Go to the `git` directory you just created.

    ```bash
    cd ../../c/git
    ```

    ??? Info
        When you first open Git Bash you are in the Home directory, so you probably need to move up two directories.

4. Clone the omni project

    ```bash
    cd c/git/
    git clone https://github.com/qlik-trial/omni-project.git .
    ```

    First, you `cd` to the directory where you want to set up your local copy. This should be `c/git`. The (.) at the end tells git to use the current folder as the checkout folder.

The omni-project is now cloned to your local machine.

5. Run the following command from Git Bash:

    ```
    cd omni-project
    ```
    Your current directory is the omni-project git repository. You should see (master) at the end of your directory path in Git Bash. Like this:

    ```bash
    BDM@usott-bdm MINGW64 /c/git/omni-project (master)
    ```
5. Check the status of the repo (just for fun, and it's always good to know the status of a branch).

    ```bash
    git status
    ```

You now have a local copy of the repository that is being tracked by the remote `GitHub` repository.