# Git Large File Storage

Git is not meant to be a source control repository for large binary files, such as `png`, `svg`, and `pptx` files. In our documentation, we of course include a lot of images. We handle this by using a small program called git lfs.

## What is lfs

Git lfs is a tool to help keep track of large binary files.
It manages this by keeping large files in one location, like a dedicated server,
and pointing to them from the git repository through a pointer file. So, git is still tracking those files indirectly,
but github is not storing those files directly. This lets us keep the size of the repository under control.
At Qlik, large files are stored on Artifactory, which means we need to configure out git lfs to use Artifactory authentication.

## Setup

1. Download git lfs from [here](https://git-lfs.github.com/).

1. Double-click the `exe` file to run the installer.

The rest of the lfs set up must be done after you clone the `help-documentation` repository.