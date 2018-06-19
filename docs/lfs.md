# Git Large File Storage

Git is not meant to be a source control repository for large binary files, such as `png`, `svg`, and `pptx` files. In our documentation, we of course include a lot of images. We handle this by using a small program called git lfs. At Qlik, the trunk team has configured git lfs to work with artifactory. Of course, this requires a small set up.

## What is lfs

Git lfs lets git indirectly track large binary files by keeping those files in one location (in our case, artifactory), and pointing to them from the git repository. So, git is stil tracking those files but github is not storing those files. This lets us keep the size of the repository under control.

## Setup

!!! Tip
    You should install LFS before you clone the repository.

This is done from the command line.

1. Download git lfs.

    [git lfs](https://git-lfs.github.com/)

1. Open git bash (or another terminal).

    `cd` into the `help-documentation` on your local machine.

1. In the root directory `c/git/help-documentation`, run `git lfs install`.

1. Now, log into okta > artifactory.

1. Click your trigram nn the top right-hand corner.

1. Under *Authentication Settings*, generate API key.

    Copy this key to the clip board.

## Test credentials

1. From the command line, run `git pull`.

1. Make sure you are on the `daily` branch. See [Get the remote branches](remote.md) if you wanted grabbed the `daily` branch yet.

1. Save any small `png` file to your desktop (Google images).

1. Now, drag this image file into the root `help-documentation` folder on your machine (do not add it to content or project).

1. Run `git status` to see that git has add the file to your working area.

1. Run `git add .` to add the image to the index.

1. Run `git commit -m "Adding a test image"` to add the image on your branch.

1. Run `git push`.

    Since this is your first time pushing with lfs, you should receive an SSH prompt. Here, enter your trigram and API key (not your password).

If the push is successful, you should see something like this:

```bash
Uploading LFS objects: 100% (1/1), 4.9 KB | 0 B/s, done
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 379 bytes | 379.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/qlik-trial/help-documentation.git
   8acfae3..532fbb8  master -> master
```

If you get something like this:

```bash
Uploading LFS objects:   0% (0/1), 0 B | 0 B/s, done
batch response: Authorization error: https://qliktech.jfrog.io/qliktech/api/lfs/git-lfs/objects/batch
Check that you have proper access to the repository
error: failed to push some refs to 'https://github.com/qlik-trial/help-documentation.git'
```

then you'll need to fix your credential manager.

### Credential manager

Artifactory credential are stored in the windows credential manager, and git uses this to send the api call to artifactory when you run `git push`.

1. Go to control panel > user accounts > credential manager

1. Under generic credentials, you might see a url that contains `jfrog`.

    Remove that if it exists.

1. Add a new generic credential.

    url: https://qliktech.jfrog.io/qliktech/api/lfs/git-lfs

    username: trigram

    pw: api key (not your Qlik password)

1. Try running `git push` again.

    This time, a prompt should come up asking for your credentials.

    Now enter trigram and api key again. This time, your push should work and your credentials should be updated for future pushes.

!!! Tip
    If everything goes well, please delete you image by doing the same thing.
    Delete the image from the local folder.
    Run `git add .` - `git commit -m "removing test image"` - `git push`
