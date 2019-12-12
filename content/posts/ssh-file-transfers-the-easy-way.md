+++ 
date = 2019-11-30
title = "SSH File Transfers: The Easy Way"
description = ""
slug = "ssh-file-transfers-the-easy-way" 
tags = ["ssh", "linux"]
categories = []
externalLink = ""
+++

There are many ways to transfer files around with SSH. You might use something like `SCP` or `SFTP` to get the job done. These are fine methods, but you can also use plain SSH as well! I learned about this technique from my computer security professor. 

The following command will take all the files in your current local directory, compress them and stream the compressed bytes over SSH to the remote host. At that point, the remote host will unarchive the incoming stream to the specified directory. Fast, easy, and secure. 

```bash
tar czf - * | ssh -i ~/.ssh/id_rsa user@host "cd /some/destination/dir; tar xzf -"
```

You can even use this to easily sync files from one remote host to another via your computer. 

```bash
ssh user@host1 "cd /some/where; tar czf - *" | ssh user@host2 "cd /some/where/else; tar xzf -"
```

Enjoy!