# Tips for Using Git Bash

If you don't have much experience using command-line, here are a couple of tips to help get you started.

## Navigating file directories

* To move between directories, you use the `cd` command (the initialism stands for change directory).

* When you first open Git Bash, it opens in your home directory, which looks something like this:

    ```bash
    C:\Users\%LocalUser%
    ```

* You can move up to a parent folder by entering `..`. For example,

    ```bash
    cd ../../
    ```

    `cd` tells the shell to change the directory and the `../../` says to move up two levels (parent of LocalUser, then parent of Users). Now you are in the `c` directory.

    ```bash
    c/
    ```

### It's easy to get lost in command-line.

* Use `pwd` to print your working directory (where you are).

* List the contents of your current directory (the one you are in) by using `ls`.

    This command lists everything inside the folder.

* Important commands for command-line navigation:

    | command        | function    |
    | ------------- |:-------------|
    | `cd`      | change directory |
    | `ls`      | list items in current directory |
    | `pwd` | show the path of my current location |

## Change the Git Bash default path

 If you find it annoying to always have to `cd ../../git/<project>`, you can change the starting location of Git Bash so that you open Git Bash at `git/`.

1. Type Git Bash into your Windows search.
1. Right-click on Git Bash, and select **Open File Location**.
    ```path
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git
    ```
1. Right-click on Git Bash, and select **Properties**.
1. Change the value under **Start**:
    ```path
    C:\git
    ```
1. Remove the `--cd-to-home` part of the **Target** value.
1. Click **Apply**.

When you open Git Bash, it should start in your Git directory.

??? Tip
    After you change the starting path of Git Bash, pin it to your task bar.

## Git with Git Bash

When you are in a git repository, you can run git commands.

For example, if you are in the omni-project repo (which is currently checked out on the master branch),

```bash
BDM@usott-bdm MINGW64 /c/git/omni-project (master)
```

you can run git commands by specifying `git X`, where X = the git operation.

```bash
git status
git branch
git --version
etc...
```
If you try to run git commands from a not-git directory, you'll get the following error:

```bash
BDM@usott-bdm MINGW64 /c/git
$ git status
fatal: Not a git repository (or any of the parent directories): .git
```