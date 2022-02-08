# Set up Artifactory

## Artifactory

1. Log into Okta > Artifactory.

2. Click your trigram in the top right-hand corner, and then click *Edit Profile*.

3. Under *Authentication Settings*, generate API key.

    Copy this key to the clip board.


You will now need to follow the credential manager procedure below.


## Credential manager

Artifactory credentials are stored in the Windows Credential Manager,
and git uses this to send the API call to Artifactory when you run `git push`.

1. Go to Control Panel > User Accounts > Credential Manager

2. Under generic credentials, you might see a URL that contains `jfrog`.

    Delete this credential.

3. Add a new generic credential.

    1. URL: https://qliktech.jfrog.io/qliktech/api/lfs/git-lfs

    2. Username: your trigram

    3. Password: the API key you copied from Artifactory (not your Qlik password).

    4. Save and close.
