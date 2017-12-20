# 独立运行

## 构建Docker镜像
进入`server`目录：
> docker build -t zmqserver:latest .

## 启动zmqserver容器
> docker run -d --name zmqs -p 3000:3000 zmqserver


## 独立运行客户端
### Windows
启动`Powershell`,设置环境变量`ZMQ_PUB_ADDRESS`：
> $env:ZMQ_PUB_ADDRESS="tcp://xx.xx.xx.xx:3000"


运行客户端：
> node pull.js

# docker-compose运行
可直接运行：
> docker-compose up
