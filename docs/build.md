# How to run a build job

!!! Warning
    These steps are temporary

## To start a build:

1. Go [here](https://ua.rdlund.qliktech.com/view/Help%20Documentation/)

1. Click `--- DOC - Start Build - LD`

1. Select **Build with Parameters**.

1. Select the product, the section, and the branch.

    !!!Note
        The daily branch is what you normally want to build to check daily work.

1. TEMP REQ:

    Deselect `ABORT_BUILD_ON_LOG_PARSE_FAILURE`.

    !!!Note
        The problem here - for you - is that this Start job kicks off another job where the log file is kind of messy. I'm (Ingemar) working on a tool to make it much easier to see the build result.

## To check build log

1. Run the build and remember the _build number_ of your job.

1. To see the console output for you build job, click the red/green ball to the left of the build number.

1. In the console output, locate the link that says `DOC-Build_help-site #XX completed` where XX is your build number.

1. Click the link.

1. In the left hand menu, click `Parsed Console Output`. (If there are two entries, just choose one).

1. In the **Parsed Console Output**, click **Error (X)**. 

    Inside square brackets, you'll see the name of the build step where the problem occurs.

## Output

- NPrinting: http://rd-docloc.rdlund.qliktech.com/LD/en-US/nprinting/

- Sense: http://rd-docloc.rdlund.qliktech.com/LD/en-US/sense/

- QlikView: http://rd-docloc.rdlund.qliktech.com/LD/en-US/qlikview/

- Connectors: http://rd-docloc.rdlund.qliktech.com/LD/en-US/connectors/