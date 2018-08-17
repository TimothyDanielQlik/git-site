# Set up Artifactory and git lfs

!!! Note
    This setup is done from the command line.

1. Open git bash (or another terminal).

    `cd` into the `help-documentation` on your local machine.

1. In the root directory `c/git/help-documentation`, run `git lfs install`.

1. Now, log into Okta > Artifactory.

1. Click your trigram in the top right-hand corner.

1. Under *Authentication Settings*, generate API key.

    Copy this key to the clip board.

## Test credentials

!!! Tip
    Run the following commands from the help-documentation repository

1. From the command line, run `git pull`.

1. Make sure you are on the `daily` branch. See [Get the remote branches](remote.md) if you haven't yet grabbed the `daily` branch.

1. Save any small `png` file to your desktop (Google images).

1. Now, drag this image file into the root `help-documentation` folder on your machine
    (do not add it to content or project folders).

1. Run `git status` to see that git has add the file to your working area. it will appear in red.

1. Run `git add .` to add the image to the index.

1. Run `git commit -m "Adding a test image"` to add the image on your branch.

1. Run `git push`.

    Since this is your first time pushing with lfs, you should receive an SSH prompt.
    Here, enter your trigram and API key (not your password).

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

Artifactory credentials are stored in the Windows Credential Manager,
and git uses this to send the API call to Artifactory when you run `git push`.

1. Go to Control Panel > User Accounts > Credential Manager

1. Under generic credentials, you might see a URL that contains `jfrog`.

    Delete this credential.

1. Add a new generic credential.

    url: https://qliktech.jfrog.io/qliktech/api/lfs/git-lfs

    username: trigram

    pw: api key (not your Qlik password)

    Save and close.

1. Try running `git push` again.

    This time, if a prompt should come up asking for your credentials, enter trigram and API key again.

    This time, your push should work and your credentials should be updated for future pushes.

!!! Tip
    If everything goes well, please delete you image by doing the same thing as above, but instead of step 3 and 4, just delete the image from the folder. Then continue with steps for that sections.

