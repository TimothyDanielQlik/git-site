# Reverting an Old Merge Commit

This will probably only need to be done by the release engineer or build engineer.

## Find the merge commit

1. Checkout the branch that has the merge commit that you want to revert.
1. Located the SHA1 of the merge commit that you want to revert.
1. In a shell:

    ```bash
    git revert -m 1 <SHA1>
    ```
    
    The interactive shell opens.
    
1. Enter a revert merge commit message.

    `i` for insert.
    
    Type the message.
    
    `esc` then `:x` to exit shell.
    
1. Finish by pushing changes. 
1. Verify that the commit has been reversed.
