# RabbitMQ
## Install RabbitMQ on Ubuntu 16.04
[RabbitMQ](https://www.rabbitmq.com/download.html) or [tecadmin.net](https://tecadmin.net/install-rabbitmq-server-on-ubuntu/)

## Add user
First add user as administrator:
> sudo rabbitmqctl add_user admin password 
></br> sudo rabbitmqctl set_user_tags admin administrator
></br> sudo rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"

then enable the Web Management Console:
> sudo rabbitmq-plugins enable rabbitmq_management

Now, we can operate the service with browser, the web access port is `15672`.


## Run demo
Change `user:password` in `connect`. Run sender:
> node ./send.js

then recevier:
> node ./receive.js


# ZeroMQ



# License
MIT

