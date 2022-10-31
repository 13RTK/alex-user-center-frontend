# 1. 技术栈
- 该项目基于Ant Design Pro
- 前后端交互使用umi中封装的request
- 管理工具使用yarn
- 通过项目中的umi UI即可实现图形化添加页面
- 所有页面文件均基于TypeScript，该项目框架基于React

# 2. 部署
- 进入项目目录后，输入yarn即可自动安装项目所需依赖（需要通过npm安装）
- 部署前需要自行通过package.json文件中的build脚本生成对应的dist目录，然后将其中的内容部署到服务器/容器中
- 部署推荐使用项目中的Dockerfile，因此需要提前安装Docker环境
- nginx配置文件存放在docker目录下，请按需更改
通过Dockerfile生成镜像:
```dockerfile
FROM nginx

WORKDIR /user/share/nginx/html
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```


# 3. 说明
- 该项目来自鱼皮的知识星球直播: [编程导航](https://yupi.icu/)
